import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconType } from "react-icons";
import { BiLogoGmail } from "react-icons/bi";
import { FaGithub, FaTiktok } from "react-icons/fa6";
import { MdOutlineArrowOutward } from "react-icons/md";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ImLinkedin2 } from "react-icons/im";
import { GrInstagram } from "react-icons/gr";

type Contact = {
  title: string;
  description: string;
  action: string;
  href: string;
  icon: IconType;
  background: string;
};

export default function Info() {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-6">
      {contacts.map((contact, i) => (
        <Card
          key={i}
          className={`${
            contact.action === "Gmail" ? "col-span-2" : ""
          } bg-gradient-to-r ${
            contact.background
          } shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all duration-300
`}
        >
          <CardHeader>
            <CardTitle className="text-xl font-bold tracking-widest">
              {contact.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between">
            <div className="space-y-8">
              <CardDescription className="text-white">
                {contact.description}
              </CardDescription>
              <Button
                asChild
                className="font-bold tracking-wider cursor-pointer"
              >
                <Link href={contact.href}>
                  Go to {contact.action}
                  <MdOutlineArrowOutward />
                </Link>
              </Button>
            </div>
            <div className="flex rounded-xl p-1 border-12 border-white/5 backdrop-blur-md self-end">
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
    href: "mailto:bernardiwilbert@gmail.com",
    icon: BiLogoGmail,
    background: "from-[#EB3349] to-[#F45C43]",
  },
  {
    title: "Follow My Journey",
    description: "Dapatkan informasi secara berkala dari Instagram saya.",
    action: "Instagram",
    href: "https://www.instagram.com/bernardiwilberts",
    icon: GrInstagram,
    background: "from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
  },
  {
    title: "Let's Connect",
    description: "Dapatkan informasi melalui akun Linkdln saya.",
    action: "Linkdln",
    href: "https://www.linkedin.com/in/wilbert-bernardi-13683a2a7/",
    icon: ImLinkedin2,
    background: "from-[#1E3C72] to-[#2A5298]",
  },
  {
    title: "Join the Fun",
    description: "Temui saya di Tiktok.",
    action: "Tiktok",
    href: "https://www.tiktok.com/@bernardiwilbert",
    icon: FaTiktok,
    background: "from-[#010101] via-[#00F5FF]/50 to-[#FF0050]/50",
  },
  {
    title: "Explore the Code",
    description: "Lihat proyek-proyek saya.",
    action: "Github",
    href: "https://github.com/WilbertFE",
    icon: FaGithub,
    background: "from-[#2B3137] to-[#0D1117]",
  },
];
