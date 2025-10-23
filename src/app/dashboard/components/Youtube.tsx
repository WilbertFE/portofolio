import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { BiSolidVideos } from "react-icons/bi";

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

  useEffect(() => {
    getData();
  }, []);

  if (!snippet && !statistics) return null;

  return (
    <div className="flex px-10 pt-36 pb-32 gap-x-8 items-center justify-between">
      <div className="space-y-8">
        <h3 className="text-xl font-bold text-shadow-lg leading-tight tracking-widest">
          Hi There 👋
        </h3>
        <h1 className="text-6xl text-shadow-lg leading-tight font-bold tracking-wider">
          I&apos;m <span className="text-my-primary ">{snippet?.title}</span>
        </h1>
        <div className="text-muted-foreground justify-between flex items-center gap-x-2">
          <Separator className="max-w-6/10" />
          <p>Content Creator | Developer</p>
        </div>

        <div className="flex gap-x-4">
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
            src="/img/dashboard/1.png"
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
  );
}
