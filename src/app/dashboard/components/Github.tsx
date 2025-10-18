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
import { Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
              <h3>This week</h3>
              <h1 className="text-3xl font-bold text-green-600 tracking-wide">
                999
              </h1>
            </div>
          </div>
          <div className="border w-1/4 bg-transparent p-1 rounded-xl">
            <div className="bg-neutral-900 p-4 rounded-lg shadow-lg">
              <h3>Best</h3>
              <h1 className="text-3xl font-bold text-green-600 tracking-wide">
                999
              </h1>
            </div>
          </div>
          <div className="border w-1/4 bg-transparent p-1 rounded-xl">
            <div className="bg-neutral-900 p-4 rounded-lg shadow-lg">
              <h3>Average</h3>
              <h1 className="text-3xl font-bold text-green-600 tracking-wide">
                999
              </h1>
            </div>
          </div>
        </div>
        {year && (
          <div className="flex gap-x-4">
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
      <Separator className="my-4" />
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex gap-x-2 items-center">
            <Clock size={32} />
            <h1 className="text-xl tracking-wider">Weekly Statistics</h1>
          </div>
          <p className="font-extralight leading-loose text-muted-foreground">
            My Github statistics for last 7 days.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-3">
          <div className="p-1 rounded-xl shadow shadow-neutral-800">
            <div className="bg-neutral-900 p-4 rounded-md">
              <p className="text-muted-foreground">Start Date</p>
              <h1 className="text-xl font-bold tracking-wide">
                March, 02 2008
              </h1>
            </div>
          </div>
          <div className="p-1 rounded-xl shadow shadow-neutral-800">
            <div className="bg-neutral-900 p-4 rounded-md">
              <p className="text-muted-foreground">Start Date</p>
              <h1 className="text-xl font-bold tracking-wide">
                March, 02 2008
              </h1>
            </div>
          </div>
          <div className="p-1 rounded-xl shadow shadow-neutral-800">
            <div className="bg-neutral-900 p-4 rounded-md">
              <p className="text-muted-foreground">Start Date</p>
              <h1 className="text-xl font-bold tracking-wide">
                March, 02 2008
              </h1>
            </div>
          </div>
          <div className="p-1 rounded-xl shadow shadow-neutral-800">
            <div className="bg-neutral-900 p-4 rounded-md">
              <p className="text-muted-foreground">Start Date</p>
              <h1 className="text-xl font-bold tracking-wide">
                March, 02 2008
              </h1>
            </div>
          </div>
          <div className="p-1 col-span-2 rounded-xl shadow shadow-neutral-800">
            <div className="bg-neutral-900 p-4 rounded-md">
              <p className="text-muted-foreground">Start Date</p>
              <h1 className="text-xl font-bold tracking-wide">
                March, 02 2008
              </h1>
            </div>
          </div>
        </div>
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
