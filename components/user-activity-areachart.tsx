import { useState } from "react";
import { Outline } from "./outline";
import TitleInfo from "./title-info";
import { TitledBarChart } from "./graphs/new-bar-chart";
import { MessageBox } from "./message-box";
import { Selector } from "./selector";
import AreaChart from "./graphs/area-chart";

interface UserActivityAreaChartProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  data: { name: string; value: number }[];
  subtitle?: string;
  userActivity: number | null;
  filter1: string;
  onFilter1Change: (value: string) => void;
}

export function UserActivityAreaChart({
  title,
  data,
  subtitle,
  userActivity,
  filter1,
  onFilter1Change,
}: UserActivityAreaChartProps) {
  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-between items-center mb-3">
        <p className="my-2 text-black bg-white font-bold">{title}</p>
        <p className="text-gray-500">{subtitle ?? ""}</p>
        <Selector
          placeholder={filter1}
          items={["Last Day", "Last Week", "Last Month"]}
          onValueChange={(value: string) => {
            onFilter1Change(value);
          }}
          className="py-2 px-4 shadow-sm rounded-lg border"
        />
      </div>

      <div>
        {userActivity == null ? (
          <MessageBox title="No data yet"></MessageBox>
        ) : (
          <div className="w-full border rounded-lg">
            <AreaChart
              data={data}
              height={225}
              width={600}
              margin={{ top: -1, right: -1, bottom: -1, left: -1 }}
              fill="#e0e7ff"
              stroke="#6366f1"
            />
          </div>
        )}
      </div>
    </div>
  );
}
