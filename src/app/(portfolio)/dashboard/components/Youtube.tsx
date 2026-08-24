import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { BiSolidVideos } from "react-icons/bi";
import { Skeleton } from "@/components/ui/skeleton";
import VideoCard from "./VideoCard";
import { YOUTUBE_SUBSCRIBE_URL, type YoutubeData } from "@/lib/youtube";

// Thumbnails above the fold get eager-loaded; the rest lazy-load on scroll.
const PRIORITY_THUMBNAILS = 2;

type Status = "loading" | "ready" | "error";

export default function Youtube() {
  const [data, setData] = useState<YoutubeData | null>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let cancelled = false;

    const loadChannel = async () => {
      try {
        const res = await fetch("/api/youtube");
        if (!res.ok) {
          throw new Error(`/api/youtube responded with ${res.status}`);
        }
        const channelData: YoutubeData = await res.json();
        if (!cancelled) {
          setData(channelData);
          setStatus("ready");
        }
      } catch (error) {
        console.error(error);
        if (!cancelled) {
          setStatus("error");
        }
      }
    };

    loadChannel();

    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="pt-36 pb-32 space-y-12">
        <div className="px-10 flex gap-x-8 items-center justify-between flex-col-reverse lg:flex-row gap-y-12 lg:gap-y-0">
          <div className="space-y-8 w-full">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-14 w-72" />
            <Skeleton className="h-10 w-full max-w-md" />
          </div>
          <Skeleton className="size-72 rounded-full" />
        </div>
      </div>
    );
  }

  // Keep the section out of the page entirely if the channel cannot be
  // reached, rather than showing an empty shell.
  if (status === "error" || !data) return null;

  const { channel, statistics, videos } = data;

  return (
    <div className="pt-36 pb-32 space-y-12">
      <div className="px-10 gap-y-12 lg:gap-y-0 flex gap-x-8 items-center justify-between flex-col-reverse lg:flex-row">
        <div className="space-y-8">
          <h3 className="lg:text-xl font-bold text-shadow-lg leading-tight tracking-widest">
            Hi There 👋
          </h3>
          <h1 className="lg:text-6xl text-xl text-shadow-lg leading-tight font-bold tracking-wider">
            I&apos;m <span className="text-my-primary ">{channel.title}</span>
          </h1>
          <div className="text-muted-foreground justify-between flex items-center gap-x-2 flex-col lg:flex-row">
            <Separator className="lg:max-w-6/10" />
            <p>Content Creator | Developer</p>
          </div>
          <div className="flex gap-x-4 flex-col lg:flex-row gap-y-4 lg:gap-y-0">
            <Button
              variant="destructive"
              size="lg"
              asChild
              className="shadow-xs shadow-white font-bold tracking-widest text-base"
            >
              <Link href={YOUTUBE_SUBSCRIBE_URL}>
                <BsFillPersonCheckFill />
                {statistics.subscriberCount} Subscribers
              </Link>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              asChild
              className="shadow-xs shadow-white font-bold tracking-widest text-base"
            >
              <Link href={YOUTUBE_SUBSCRIBE_URL}>
                <FaEye />
                {statistics.viewCount} Views
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="shadow-xs shadow-white font-bold tracking-widest text-base"
            >
              <Link href={YOUTUBE_SUBSCRIBE_URL}>
                <BiSolidVideos />
                {statistics.videoCount} Videos
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative">
          <Avatar className="w-72 h-72 border-4 border-white">
            <AvatarImage
              className="object-cover object-center"
              alt={channel.title}
              src="/img/profile1.png"
            />
            <AvatarFallback>WB</AvatarFallback>
          </Avatar>
          <Image
            src="/img/dashboard/sun.png"
            alt=""
            className="absolute -top-12 -right-12"
            width={164}
            height={164}
          />
          <Image
            src="/img/dashboard/blue.png"
            alt=""
            className="absolute -bottom-8 -left-8"
            width={164}
            height={164}
          />
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-y-4 justify-items-center place-items-center justify-center">
        {videos.map((video, i) => (
          <VideoCard
            key={video.id}
            video={video}
            priority={i < PRIORITY_THUMBNAILS}
          />
        ))}
      </div>
    </div>
  );
}
