"use client";

import { Separator } from "@/components/ui/separator";
import { Header } from "./components";
import { FaGithub } from "react-icons/fa6";
import GitHubCalendar, { Year } from "react-github-calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction, useState } from "react";

export default function Dashboard() {
  const [year, setYear] = useState<Year | undefined>(2024);
  return (
    <div className="p-6 space-y-4 mx-auto h-full container">
      <Header />
      <Separator />
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex gap-x-2 items-center">
            <FaGithub size={32} />
            <h1 className="text-xl tracking-wider">Contributions</h1>
          </div>
          <p className="font-extralight leading-loose text-muted-foreground">
            My contributions on Github.
          </p>
        </div>
        <div className="flex justify-between gap-x-4">
          <div className="border w-1/4 bg-transparent p-1 rounded-xl">
            <div className="bg-neutral-900 p-4 rounded-lg shadow-lg">
              <h3>Total</h3>
              <h1 className="text-3xl font-bold text-green-600 tracking-wide">
                999
              </h1>
            </div>
          </div>
          <div className="border w-1/4 bg-transparent p-1 rounded-xl">
            <div className="bg-neutral-900 p-4 rounded-lg shadow-lg">
              <h3>Total</h3>
              <h1 className="text-3xl font-bold text-green-600 tracking-wide">
                999
              </h1>
            </div>
          </div>
          <div className="border w-1/4 bg-transparent p-1 rounded-xl">
            <div className="bg-neutral-900 p-4 rounded-lg shadow-lg">
              <h3>Total</h3>
              <h1 className="text-3xl font-bold text-green-600 tracking-wide">
                999
              </h1>
            </div>
          </div>
          <div className="border w-1/4 bg-transparent p-1 rounded-xl">
            <div className="bg-neutral-900 p-4 rounded-lg shadow-lg">
              <h3>Total</h3>
              <h1 className="text-3xl font-bold text-green-600 tracking-wide">
                999
              </h1>
            </div>
          </div>
        </div>
        {year && (
          <div className="flex gap-x-4">
            <GitHubCalendar blockSize={16} year={year} username="wilbertfe" />
            <SelectDemo year={year} setYear={setYear} />
          </div>
        )}
      </div>
    </div>
  );
}

function SelectDemo({
  year,
  setYear,
}: {
  year: Year | undefined;
  setYear: Dispatch<SetStateAction<Year | undefined>>;
}) {
  return (
    <Select
      value={year?.toString()}
      onValueChange={(val) => setYear(Number(val))}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a year" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Year</SelectLabel>
          <SelectItem value="2023">2023</SelectItem>
          <SelectItem value="2024">2024</SelectItem>
          <SelectItem value="2025">2025</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
