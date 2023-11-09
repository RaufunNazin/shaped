import { useState } from "react";
import { Outline } from "./outline";
import TitleInfo from "./title-info";
import { TitledBarChart } from "./graphs/new-bar-chart";
import { MessageBox } from "./message-box";
import { Selector } from "./selector";

interface UserActivityBarChartProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  userActivity: number | null;
  filter1: string;
  onFilter1Change: (value: string) => void;
}

export function UserActivityBarChart({
  title,
  subtitle,
  userActivity,
  filter1,
  onFilter1Change,
}: UserActivityBarChartProps) {
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
            <TitledBarChart
              chartTitle={""}
              data={[
                {
                  name: "<10th",
                  value: 10,
                  alias: "<10th",
                  color:
                    userActivity > 0 && userActivity < 11
                      ? "#6366f1"
                      : "#cbd5e1",
                },
                {
                  name: "20th",
                  value: 20,
                  alias: "20th",
                  color:
                    userActivity > 10 && userActivity < 21
                      ? "#6366f1"
                      : "#cbd5e1",
                },
                {
                  name: "40th",
                  value: 40,
                  alias: "40th",
                  color:
                    userActivity > 20 && userActivity < 41
                      ? "#6366f1"
                      : "#cbd5e1",
                },
                {
                  name: "60th",
                  value: 60,
                  alias: "60th",
                  color:
                    userActivity > 40 && userActivity < 61
                      ? "#6366f1"
                      : "#cbd5e1",
                },
                {
                  name: "80th",
                  value: 80,
                  alias: "80th",
                  color:
                    userActivity > 60 && userActivity < 81
                      ? "#6366f1"
                      : "#cbd5e1",
                },
                {
                  name: ">90th",
                  value: 90,
                  alias: ">90th",
                  color:
                    userActivity > 80 && userActivity < 101
                      ? "#6366f1"
                      : "#cbd5e1",
                },
              ]}
              width={600}
              height={225}
              margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
