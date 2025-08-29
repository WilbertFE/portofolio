import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { IconType } from "react-icons";

type Projects = {
  title: string;
  description: string;
  href: string;
  year: number;
  icons: IconType[];
};

export default function page() {
  return (
    <div className="flex flex-wrap gap-y-16 px-8 pb-32 pt-16 container mx-auto">
      <div className="w-full space-y-8">
        <div>
          <h1>Personal Projects</h1>
          <p>Proyek personal saya.</p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <Card className="p-1">
            <div className="max-w-full h-64 relative">
              <Image
                src="/img/landing-page-website.jpg"
                alt="landing page"
                fill
                className="object-cover object-center rounded-sm"
              />
            </div>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
              {/* <CardAction>Card Action</CardAction> */}
            </CardHeader>
            {/* <CardContent>
              <p>Card Content</p>
            </CardContent> */}
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>
      </div>
      <div className="w-full space-y-8">
        <div>
          <h1>Learning Projects</h1>
          <p>Proyek yang saya buat untuk belajar.</p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <Card className="p-1">
            <div className="max-w-full h-64 relative">
              <Image
                src="/img/landing-page-website.jpg"
                alt="landing page"
                fill
                className="object-cover object-center rounded-sm"
              />
            </div>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
              {/* <CardAction>Card Action</CardAction> */}
            </CardHeader>
            {/* <CardContent>
              <p>Card Content</p>
            </CardContent> */}
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
