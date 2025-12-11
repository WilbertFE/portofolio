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

export default function GithubComponent() {
  const [year, setYear] = useState<Year | undefined>(2024);
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
            <SelectDemo year={year} setYear={setYear} />
          </div>
        )}
      </div>
    </>
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
