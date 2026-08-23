import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TiLocationArrow } from "react-icons/ti";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PROJECT_ICONS } from "@/lib/icon-registry";
import type { Project } from "@/lib/content";

export default function MainProjects({ projects }: { projects: Project[] }) {
  return (
    <div className="w-full pb-12 space-y-12">
      <h1 className="text-2xl text-my-primary font-bold tracking-wide">
        Projects
      </h1>
      {projects.length === 0 ? (
        <p className="text-muted-foreground">No projects published yet.</p>
      ) : (
        <div className="grid lg:grid-cols-2 gap-8">
          {[...projects]
            .sort((a, b) => b.year - a.year)
            .map((project) => (
              <div
                key={project.id}
                className="border bg-transparent p-1 rounded-xl"
              >
                <Card className="px-4 py-6 h-full relative">
                  {/* No explicit height here. AspectRatio already reserves the
                      16:9 box with padding-bottom, so adding one stacked a
                      second height underneath it and left a dead gap. */}
                  <AspectRatio
                    ratio={16 / 9}
                    className="overflow-hidden rounded-lg"
                  >
                    {project.imageUrl ? (
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        // Inline rather than a Tailwind class: the value comes
                        // from the database, and the JIT would not emit a class
                        // it never sees in the source.
                        style={{ objectPosition: project.imagePosition }}
                        className="rounded-lg object-cover"
                      />
                    ) : (
                      <Skeleton className="h-full w-full rounded-lg" />
                    )}
                  </AspectRatio>
                  <CardHeader className="lg:space-x-4 flex flex-col gap-y-4 px-1">
                    <CardTitle className="text-lg tracking-wider w-full flex items-center gap-x-2">
                      <div className="flex flex-1 items-center gap-x-4">
                        <h1 className="line-clamp-1 ">{project.title}</h1>
                        <span className="text-muted-foreground text-base">
                          {"["}
                          {project.year}
                          {"]"}
                        </span>
                      </div>
                      <CardAction className="self-center">
                        <Button
                          asChild
                          variant="link"
                          className="tracking-wider font-bold text-my-primary"
                        >
                          <Link
                            className="relative"
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Visit{" "}
                            <TiLocationArrow className="absolute top-0 -right-1" />
                          </Link>
                        </Button>
                      </CardAction>
                    </CardTitle>
                    <CardDescription className="space-y-4">
                      <div className="space-x-2">
                        {project.badges.map((badge) => (
                          <Badge
                            key={badge}
                            variant="secondary"
                            className="bg-blue-500 text-white dark:bg-blue-600"
                          >
                            {badge}
                          </Badge>
                        ))}
                      </div>
                      <p>{project.description}</p>
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="space-x-4">
                    {project.icons.map((icon) => {
                      // Resolved through the registry because a database row
                      // can only hold the icon's key, not the component.
                      const Icon = PROJECT_ICONS[icon.key];
                      return (
                        <Icon key={icon.key} size={32} color={icon.color} />
                      );
                    })}
                  </CardFooter>
                </Card>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
