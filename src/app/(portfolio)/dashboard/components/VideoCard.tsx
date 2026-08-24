import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaPlay, FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { embedUrl, watchUrl, type YoutubeVideo } from "@/lib/youtube";

export default function VideoCard({
  video,
  priority,
}: {
  video: YoutubeVideo;
  priority: boolean;
}) {
  // The player is only mounted once the visitor asks for it. Embedding every
  // upload up front would pull in a full YouTube player per card.
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Card className="bg-transparent border-0 md:w-full md:h-full max-w-4/5 self-center mx-auto">
      <CardContent className="">
        <AspectRatio
          ratio={16 / 9}
          className="overflow-hidden rounded-lg border border-white"
        >
          {isPlaying ? (
            <iframe
              className="h-full w-full"
              src={embedUrl(video.id)}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ) : (
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              aria-label={`Play ${video.title}`}
              className="group relative h-full w-full cursor-pointer"
            >
              <Image
                src={video.thumbnail}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                priority={priority}
                className="object-cover object-center"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors duration-300 group-hover:bg-black/50">
                <span className="flex size-16 items-center justify-center rounded-full bg-red-600 shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <FaPlay size={24} className="ml-1 text-white" />
                </span>
              </span>
            </button>
          )}
        </AspectRatio>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-y-4">
        <div className="flex lg:flex-row lg:gap-x-12 gap-y-4 w-full items-center lg:justify-between flex-col">
          <div className="flex gap-x-1 max-w-4/5 lg:max-w-full">
            <FaQuoteLeft size={16} color="yellow" />
            <h1 className="tracking-wider font-bold text-xl line-clamp-1">
              {video.title}
            </h1>
            <FaQuoteRight size={16} color="yellow" />
          </div>
          <CardAction className="lg:justify-self-end mx-auto md:mx-0">
            <Button
              asChild
              size="sm"
              variant="destructive"
              className="border-1 border-white"
            >
              <Link href={watchUrl(video.id)}>
                <FaEye />
                Watch
              </Link>
            </Button>
          </CardAction>
        </div>
        <p className="md:line-clamp-2 text-muted-foreground mx-auto md:mx-0 line-clamp-1">
          {video.description || "Video ini tidak memiliki deskripsi."}
        </p>
      </CardFooter>
    </Card>
  );
}
