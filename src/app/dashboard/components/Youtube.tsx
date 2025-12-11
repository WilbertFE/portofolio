/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { FaEye, FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { BiSolidVideos } from "react-icons/bi";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function Youtube() {
  const [snippet, setSnippet] = useState<null | {
    title: string;
    description: string;
    customUrl: string;
    thumbnails: {
      default: { url: string };
      high: { url: string };
      medium: { url: string };
    };
  }>(null);

  const [videos, setVideos] = useState<any>(null);

  const [statistics, setStatistics] = useState<null | {
    viewCount: string;
    subscriberCount: string;
    videoCount: string;
  }>(null);

  const getData = async () => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?key=${
          process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || ""
        }&id=UCwr_nwGeno64CHwji2ZAGvQ&part=snippet,statistics`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (!res.ok) {
          throw new Error("Failed to get data!");
        }

        return res.json();
      });

      const snippetData = res.items[0].snippet;
      const statisticsData = res.items[0].statistics;
      setStatistics(statisticsData);
      setSnippet(snippetData);
    } catch (error) {
      console.log(error);
    }
  };

  const getVideos = async () => {
    try {
      const data = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=UUwr_nwGeno64CHwji2ZAGvQ&maxResults=40&key=${
          process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || ""
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (!res.ok) {
          throw new Error("Failed to get videos data");
        }
        return res.json();
      });

      const responseData = data.items;

      setVideos(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("videos : ", videos);

  useEffect(() => {
    getData();
    getVideos();
  }, []);

  if (!snippet && !statistics && !videos) return null;

  return (
    <div className="pt-36 pb-32 space-y-12">
      <div className="px-10 gap-y-12 lg:gap-y-0 flex gap-x-8 items-center justify-between flex-col-reverse lg:flex-row">
        <div className="space-y-8">
          <h3 className="lg:text-xl font-bold text-shadow-lg leading-tight tracking-widest">
            Hi There 👋
          </h3>
          <h1 className="lg:text-6xl text-xl text-shadow-lg leading-tight font-bold tracking-wider">
            I&apos;m <span className="text-my-primary ">{snippet?.title}</span>
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
              <Link href="https://www.youtube.com/channel/UCwr_nwGeno64CHwji2ZAGvQ?sub_confirmation=1">
                <BsFillPersonCheckFill />
                {statistics?.subscriberCount} Subscribers
              </Link>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              asChild
              className="shadow-xs shadow-white font-bold tracking-widest text-base"
            >
              <Link href="https://www.youtube.com/channel/UCwr_nwGeno64CHwji2ZAGvQ?sub_confirmation=1">
                <FaEye />
                {statistics?.viewCount} Views
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="shadow-xs shadow-white font-bold tracking-widest text-base"
            >
              <Link href="https://www.youtube.com/channel/UCwr_nwGeno64CHwji2ZAGvQ?sub_confirmation=1">
                <BiSolidVideos />
                {statistics?.videoCount} Videos
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative">
          <Avatar className="w-72 h-72 border-4 border-white">
            <AvatarImage
              className="object-cover object-center"
              src="/img/profile1.png"
            />
            <AvatarFallback>WB</AvatarFallback>
          </Avatar>
          <Image
            src="/img/dashboard/sun.png"
            alt="sun"
            className="absolute -top-12 -right-12"
            width={164}
            height={164}
          />
          <Image
            src="/img/dashboard/blue.png"
            alt="blue"
            className="absolute -bottom-8 -left-8"
            width={164}
            height={164}
          />
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-y-4">
        {videos?.map((video: any, i: number) => (
          <Card className="bg-transparent border-0" key={i}>
            <CardContent>
              <iframe
                key={i}
                className="border-white border-1 rounded-lg lg:w-[560px] lg:h-[315px]"
                src={`https://www.youtube.com/embed/${video.contentDetails.videoId}?si=T1lxT3hOquHD2NYM`}
                title={video.snippet.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-y-4">
              <div className="flex lg:flex-row lg:gap-x-12 gap-y-4  w-full justify-between flex-col">
                <div className="flex gap-x-1 max-w-4/5 lg:max-w-full">
                  <FaQuoteLeft size={16} color="yellow" />
                  <h1 className="tracking-wider font-bold text-xl line-clamp-1">
                    {video.snippet.title}
                  </h1>
                  <FaQuoteRight size={16} color="yellow" />
                </div>
                <CardAction className="lg:justify-self-end">
                  <Button
                    asChild
                    size="sm"
                    variant="destructive"
                    className="border-1 border-white"
                  >
                    <Link
                      href={`https://www.youtube.com/watch?v=${video.contentDetails.videoId}`}
                    >
                      <FaEye />
                      Watch
                    </Link>
                  </Button>
                </CardAction>
              </div>
              <p className="line-clamp-2 text-muted-foreground">
                {video.snippet.description ||
                  "Video ini tidak memiliki deskripsi."}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
