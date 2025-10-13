import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconType } from "react-icons";
import { BiLogoGmail } from "react-icons/bi";
import { FaGithub, FaInstagram, FaTiktok } from "react-icons/fa6";
import { MdOutlineArrowOutward } from "react-icons/md";
import { RiLinkedinLine } from "react-icons/ri";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Contact = {
  title: string;
  description: string;
  action: string;
  href: string;
  icon: IconType;
};

export default function Info() {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-6">
      {contacts.map((contact, i) => (
        <Card
          key={i}
          className={`${contact.action === "Gmail" ? "col-span-2" : ""}`}
        >
          <CardHeader>
            <CardTitle className="text-xl font-bold tracking-widest">
              {contact.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between">
            <div className="space-y-8">
              <CardDescription>{contact.description}</CardDescription>
              <Button
                asChild
                className="font-bold tracking-wide cursor-pointer"
              >
                <Link href="/">
                  Go to {contact.action}
                  <MdOutlineArrowOutward />
                </Link>
              </Button>
            </div>
            <div className="flex rounded-md shadow-md p-0.5 shadow-neutral-600 border self-end">
              {<contact.icon size={64} />}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

const contacts: Contact[] = [
  {
    title: "Stay in Touch",
    description: "Hubungi saya melalui E-mail.",
    action: "Gmail",
    href: "/",
    icon: BiLogoGmail,
  },
  {
    title: "Follow My Journey",
    description: "Dapatkan informasi secara berkala dari Instagram saya.",
    action: "Instagram",
    href: "/",
    icon: FaInstagram,
  },
  {
    title: "Let's Connect",
    description: "Dapatkan informasi melalui akun Linkdln saya.",
    action: "Linkdln",
    href: "/",
    icon: RiLinkedinLine,
  },
  {
    title: "Join the Fun",
    description: "Temui saya di Tiktok.",
    action: "Tiktok",
    href: "/",
    icon: FaTiktok,
  },
  {
    title: "Explore the Code",
    description: "Lihat proyek-proyek saya.",
    action: "Github",
    href: "/",
    icon: FaGithub,
  },
];
