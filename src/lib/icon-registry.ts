import type { IconType } from "react-icons";
import { BiLogoPostgresql, BiLogoTypescript } from "react-icons/bi";
import { BsFiletypeScss } from "react-icons/bs";
import { DiCss3, DiHtml5, DiMongodb, DiRedis } from "react-icons/di";
import {
  FaBootstrap,
  FaC,
  FaFlutter,
  FaGitAlt,
  FaGithub,
  FaNodeJs,
  FaPython,
  FaReact,
} from "react-icons/fa6";
import { IoLogoFirebase, IoLogoVercel } from "react-icons/io5";
import {
  RiGeminiLine,
  RiJavascriptFill,
  RiNextjsFill,
  RiSupabaseFill,
  RiTailwindCssFill,
} from "react-icons/ri";
import {
  SiExpress,
  SiJest,
  SiShadcnui,
  SiSupabase,
  SiVite,
} from "react-icons/si";

/**
 * A database row cannot hold a React component, so projects store an icon
 * *key* plus a colour and this map resolves it back. Adding a technology means
 * importing it here; the admin form's picker reads its options straight off
 * these keys, so nothing else has to change.
 */
export const PROJECT_ICONS = {
  BiLogoPostgresql,
  BiLogoTypescript,
  BsFiletypeScss,
  DiCss3,
  DiHtml5,
  DiMongodb,
  DiRedis,
  FaBootstrap,
  FaC,
  FaFlutter,
  FaGitAlt,
  FaGithub,
  FaNodeJs,
  FaPython,
  FaReact,
  IoLogoFirebase,
  IoLogoVercel,
  RiGeminiLine,
  RiJavascriptFill,
  RiNextjsFill,
  RiSupabaseFill,
  RiTailwindCssFill,
  SiExpress,
  SiJest,
  SiShadcnui,
  SiSupabase,
  SiVite,
} satisfies Record<string, IconType>;

export type ProjectIconKey = keyof typeof PROJECT_ICONS;

export const PROJECT_ICON_KEYS = Object.keys(PROJECT_ICONS) as ProjectIconKey[];

export function isProjectIconKey(value: string): value is ProjectIconKey {
  return value in PROJECT_ICONS;
}

/** Suggested colour per icon, so the admin form starts from the brand colour. */
export const PROJECT_ICON_DEFAULT_COLOR: Record<ProjectIconKey, string> = {
  BiLogoPostgresql: "#008bb9",
  BiLogoTypescript: "blue",
  BsFiletypeScss: "pink",
  DiCss3: "lightblue",
  DiHtml5: "red",
  DiMongodb: "green",
  DiRedis: "red",
  FaBootstrap: "purple",
  FaC: "blue",
  FaFlutter: "#02539A",
  FaGitAlt: "#F54D27",
  FaGithub: "white",
  FaNodeJs: "green",
  FaPython: "yellow",
  FaReact: "cyan",
  IoLogoFirebase: "yellow",
  IoLogoVercel: "white",
  RiGeminiLine: "purple",
  RiJavascriptFill: "yellow",
  RiNextjsFill: "white",
  RiSupabaseFill: "lightgreen",
  RiTailwindCssFill: "cyan",
  SiExpress: "white",
  SiJest: "#C63D14",
  SiShadcnui: "white",
  SiSupabase: "#34B27B",
  SiVite: "#646CFF",
};
