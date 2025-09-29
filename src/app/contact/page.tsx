import { Separator } from "@/components/ui/separator";
import { Header } from "./components";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export default function page() {
  return (
    <div className="p-6 space-y-4 mx-auto h-full container">
      <Header />
      <Separator className="mb-12" />
      <div className="grid grid-cols-2 gap-x-6 gap-y-6">
        <div className="shadow p-0.5 shadow-neutral-600 col-span-2">
          <div className="p-4 col-span-2 flex gap-x-12 bg-neutral-900 ">
            <div className="space-y-4 grow">
              <h1 className="text-xl font-bold tracking-wide">
                Stay in touch!
              </h1>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel,
                fugiat.
              </p>
              <Button>See in Gmail</Button>
            </div>
            <div className="flex rounded-md shadow p-0.5 shadow-neutral-600 border self-end">
              <Mail size={64} />
            </div>
          </div>
        </div>
        <div className="shadow p-0.5 shadow-neutral-600">
          <div className="p-4 col-span-2 flex gap-x-12 bg-neutral-900 ">
            <div className="space-y-4 grow">
              <h1 className="text-xl font-bold tracking-wide">
                Stay in touch!
              </h1>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel,
                fugiat.
              </p>
              <Button>See in Gmail</Button>
            </div>
            <div className="flex rounded-md shadow p-0.5 shadow-neutral-600 border self-end">
              <Mail size={64} />
            </div>
          </div>
        </div>
        <div className="shadow p-0.5 shadow-neutral-600">
          <div className="p-4 col-span-2 flex gap-x-12 bg-neutral-900 ">
            <div className="space-y-4 grow">
              <h1 className="text-xl font-bold tracking-wide">
                Stay in touch!
              </h1>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel,
                fugiat.
              </p>
              <Button>See in Gmail</Button>
            </div>
            <div className="flex rounded-md shadow p-0.5 shadow-neutral-600 border self-end">
              <Mail size={64} />
            </div>
          </div>
        </div>
        <div className="shadow p-0.5 shadow-neutral-600">
          <div className="p-4 col-span-2 flex gap-x-12 bg-neutral-900 ">
            <div className="space-y-4 grow">
              <h1 className="text-xl font-bold tracking-wide">
                Stay in touch!
              </h1>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel,
                fugiat.
              </p>
              <Button>See in Gmail</Button>
            </div>
            <div className="flex rounded-md shadow p-0.5 shadow-neutral-600 border self-end">
              <Mail size={64} />
            </div>
          </div>
        </div>
        <div className="shadow p-0.5 shadow-neutral-600">
          <div className="p-4 col-span-2 flex gap-x-12 bg-neutral-900 ">
            <div className="space-y-4 grow">
              <h1 className="text-xl font-bold tracking-wide">
                Stay in touch!
              </h1>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel,
                fugiat.
              </p>
              <Button>See in Gmail</Button>
            </div>
            <div className="flex rounded-md shadow p-0.5 shadow-neutral-600 border self-end">
              <Mail size={64} />
            </div>
          </div>
        </div>
      </div>
      <Separator />
      <div>
        <p>or send me a message</p>
      </div>
    </div>
  );
}
