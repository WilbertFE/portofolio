import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconType } from "react-icons";
import { BiLogoGmail } from "react-icons/bi";
import { FaGithub, FaInstagram, FaTiktok } from "react-icons/fa6";
import { MdOutlineArrowOutward } from "react-icons/md";
import { RiLinkedinLine } from "react-icons/ri";

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
        <div
          key={i}
          className={`shadow-sm shadow-neutral-600 ${
            contact.action === "Gmail" ? "col-span-2" : ""
          }`}
        >
          <div className="p-4 col-span-2 flex gap-x-12 bg-neutral-900 h-full">
            <div className="space-y-4 grow">
              <h1 className="text-xl font-bold tracking-widest">
                {contact.title}
              </h1>
              <p className="text-muted-foreground">{contact.description}</p>
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
          </div>
        </div>
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
