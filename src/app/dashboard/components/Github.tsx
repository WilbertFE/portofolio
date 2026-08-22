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

const FIRST_CONTRIBUTION_YEAR = 2023;

function getSelectableYears() {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let y = currentYear; y >= FIRST_CONTRIBUTION_YEAR; y--) {
    years.push(y);
  }
  return years;
}

export default function GithubComponent() {
  const years = getSelectableYears();
  const [year, setYear] = useState<Year | undefined>(years[0]);
  return (
    <>
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

        {year && (
          <div className="flex lg:gap-x-4 flex-col-reverse lg:flex-row gap-y-6">
            <GitHubCalendar
              colorScheme="dark"
              blockSize={16}
              year={year}
              username="wilbertfe"
            />
            <SelectDemo year={year} setYear={setYear} years={years} />
          </div>
        )}
      </div>
    </>
  );
}

function SelectDemo({
  year,
  setYear,
  years,
}: {
  year: Year | undefined;
  setYear: Dispatch<SetStateAction<Year | undefined>>;
  years: number[];
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
          {years.map((y) => (
            <SelectItem key={y} value={y.toString()}>
              {y}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
