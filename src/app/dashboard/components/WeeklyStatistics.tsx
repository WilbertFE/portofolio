import { Clock } from "lucide-react";

export default function WeeklyStatistics() {
  return (
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
            <h1 className="text-xl font-bold tracking-wide">March, 02 2008</h1>
          </div>
        </div>
        <div className="p-1 rounded-xl shadow shadow-neutral-800">
          <div className="bg-neutral-900 p-4 rounded-md">
            <p className="text-muted-foreground">Start Date</p>
            <h1 className="text-xl font-bold tracking-wide">March, 02 2008</h1>
          </div>
        </div>
        <div className="p-1 rounded-xl shadow shadow-neutral-800">
          <div className="bg-neutral-900 p-4 rounded-md">
            <p className="text-muted-foreground">Start Date</p>
            <h1 className="text-xl font-bold tracking-wide">March, 02 2008</h1>
          </div>
        </div>
        <div className="p-1 rounded-xl shadow shadow-neutral-800">
          <div className="bg-neutral-900 p-4 rounded-md">
            <p className="text-muted-foreground">Start Date</p>
            <h1 className="text-xl font-bold tracking-wide">March, 02 2008</h1>
          </div>
        </div>
        <div className="p-1 col-span-2 rounded-xl shadow shadow-neutral-800">
          <div className="bg-neutral-900 p-4 rounded-md">
            <p className="text-muted-foreground">Start Date</p>
            <h1 className="text-xl font-bold tracking-wide">March, 02 2008</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
