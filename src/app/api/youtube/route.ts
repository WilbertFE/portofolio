import { NextResponse } from "next/server";
import {
  YOUTUBE_CHANNEL_ID,
  YOUTUBE_UPLOADS_PLAYLIST_ID,
  type YoutubeData,
  type YoutubeVideo,
} from "@/lib/youtube";

// The channel data barely changes, so cache the upstream calls for an hour.
// This keeps the daily YouTube quota usage flat no matter how much traffic
// the dashboard gets.
const REVALIDATE_SECONDS = 60 * 60;
const MAX_VIDEOS = 40;

type Thumbnail = { url: string };

type ChannelResponse = {
  items?: {
    snippet: { title: string; description: string; customUrl: string };
    statistics: {
      viewCount: string;
      subscriberCount: string;
      videoCount: string;
    };
  }[];
};

type PlaylistResponse = {
  items?: {
    contentDetails: { videoId: string };
    snippet: {
      title: string;
      description: string;
      thumbnails: Partial<
        Record<"default" | "medium" | "high" | "standard" | "maxres", Thumbnail>
      >;
    };
  }[];
};

async function fetchFromYoutube<T>(url: string): Promise<T> {
  const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
  if (!res.ok) {
    throw new Error(`YouTube API responded with ${res.status}`);
  }
  return (await res.json()) as T;
}

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    console.error("YOUTUBE_API_KEY is not set");
    return NextResponse.json(
      { error: "YouTube is not configured" },
      { status: 500 }
    );
  }

  try {
    const [channelResponse, playlistResponse] = await Promise.all([
      fetchFromYoutube<ChannelResponse>(
        `https://www.googleapis.com/youtube/v3/channels?key=${apiKey}&id=${YOUTUBE_CHANNEL_ID}&part=snippet,statistics`
      ),
      fetchFromYoutube<PlaylistResponse>(
        `https://www.googleapis.com/youtube/v3/playlistItems?key=${apiKey}&playlistId=${YOUTUBE_UPLOADS_PLAYLIST_ID}&part=snippet,contentDetails&maxResults=${MAX_VIDEOS}`
      ),
    ]);

    const channelItem = channelResponse.items?.[0];
    if (!channelItem) {
      return NextResponse.json({ error: "Channel not found" }, { status: 404 });
    }

    // Deleted or private uploads stay in the playlist but lose their
    // thumbnails, so drop anything we cannot render.
    const videos: YoutubeVideo[] = (playlistResponse.items ?? [])
      .map((item) => {
        const { maxres, standard, high, medium, default: fallback } =
          item.snippet.thumbnails;
        return {
          id: item.contentDetails.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail:
            maxres?.url ??
            standard?.url ??
            high?.url ??
            medium?.url ??
            fallback?.url ??
            "",
        };
      })
      .filter((video) => video.id && video.thumbnail);

    const data: YoutubeData = {
      channel: channelItem.snippet,
      statistics: channelItem.statistics,
      videos,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to load YouTube data", error);
    return NextResponse.json(
      { error: "Failed to load YouTube data" },
      { status: 502 }
    );
  }
}
