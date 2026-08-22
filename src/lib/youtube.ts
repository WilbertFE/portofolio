export const YOUTUBE_CHANNEL_ID = "UCwr_nwGeno64CHwji2ZAGvQ";
export const YOUTUBE_UPLOADS_PLAYLIST_ID = "UUwr_nwGeno64CHwji2ZAGvQ";
export const YOUTUBE_CHANNEL_URL = `https://www.youtube.com/channel/${YOUTUBE_CHANNEL_ID}`;
export const YOUTUBE_SUBSCRIBE_URL = `${YOUTUBE_CHANNEL_URL}?sub_confirmation=1`;

export type YoutubeChannel = {
  title: string;
  description: string;
  customUrl: string;
};

export type YoutubeStatistics = {
  viewCount: string;
  subscriberCount: string;
  videoCount: string;
};

export type YoutubeVideo = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
};

export type YoutubeData = {
  channel: YoutubeChannel;
  statistics: YoutubeStatistics;
  videos: YoutubeVideo[];
};

export function watchUrl(videoId: string) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export function embedUrl(videoId: string) {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
}
