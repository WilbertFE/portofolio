"use client";

import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { IMAGE_POSITIONS, type ImagePosition } from "@/lib/schemas";

/**
 * Project cards crop mockups to 16:9, so anything outside the frame is lost.
 * This picks which part survives.
 *
 * The preview is the real card geometry - same ratio, same object-cover - so
 * what you see here is what /projects renders.
 */
export default function ImagePositionPicker({
  imageUrl,
  value,
  onChange,
}: {
  imageUrl?: string;
  value: ImagePosition;
  onChange: (value: ImagePosition) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>Image focus</Label>

      <div className="flex flex-wrap items-start gap-4">
        <div className="w-56">
          <AspectRatio
            ratio={16 / 9}
            className="overflow-hidden rounded-lg border"
          >
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt=""
                fill
                sizes="224px"
                // Always on screen once the dialog opens, so lazy loading
                // buys nothing and only delays the preview.
                loading="eager"
                style={{ objectPosition: value }}
                className="object-cover"
              />
            ) : (
              <div className="bg-muted text-muted-foreground flex h-full w-full items-center justify-center text-xs">
                Upload an image first
              </div>
            )}
          </AspectRatio>
        </div>

        <div>
          <div className="grid w-fit grid-cols-3 gap-1">
            {IMAGE_POSITIONS.map((position) => {
              const isActive = position === value;
              return (
                <button
                  key={position}
                  type="button"
                  disabled={!imageUrl}
                  onClick={() => onChange(position)}
                  aria-label={`Focus ${position}`}
                  aria-pressed={isActive}
                  title={position}
                  className={cn(
                    "size-8 cursor-pointer rounded border transition-colors",
                    "disabled:cursor-not-allowed disabled:opacity-40",
                    isActive
                      ? "border-my-primary bg-my-primary/30"
                      : "hover:bg-muted"
                  )}
                >
                  <span
                    className={cn(
                      "mx-auto block size-2 rounded-full",
                      isActive ? "bg-my-primary" : "bg-muted-foreground/40"
                    )}
                  />
                </button>
              );
            })}
          </div>
          <p className="text-muted-foreground mt-2 text-xs capitalize">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
