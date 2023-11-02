import { useState } from "react";
import { Outline } from "./outline";
import TitleInfo from "./title-info";
import { TitledBarChart } from "./graphs/bar-chart";
import { MessageBox } from "./message-box";
import { Selector } from "./selector";

interface TrainTabBarChartSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  data: number | null;
  userActivityFilter: string;
  setUserActivityFilter: (value: string) => void;
}

export function UserActivityBarChart({
  title,
  data,
  userActivityFilter,
  setUserActivityFilter,
}: TrainTabBarChartSectionProps) {
  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-between items-center">
        <p className="my-2 text-black bg-white font-bold">{title}</p>
        <p className="text-gray-500">Count of events relative to population</p>
        <Selector
          placeholder={userActivityFilter}
          items={["Last Day", "Last Week", "Last Month"]}
          onValueChange={(value: string) => {
            setUserActivityFilter(value);
          }}
          className="py-2 px-4 shadow-md rounded-lg border"
        />
      </div>

      <div>
        {data == null ? (
          <MessageBox title="No metrics yet"></MessageBox>
        ) : (
          <div className="w-full border rounded-lg">
            <TitledBarChart
              chartTitle={""}
              data={[
                {
                  name: "hi",
                  value: 10,
                  alias: "<10th",
                  color: data > 0 && data < 11 ? "#6366f1" : "#cbd5e1",
                },
                {
                  name: "hi2",
                  value: 20,
                  alias: "20th",
                  color: data > 10 && data < 21 ? "#6366f1" : "#cbd5e1",
                },
                {
                  name: "hi3",
                  value: 40,
                  alias: "40th",
                  color: data > 20 && data < 41 ? "#6366f1" : "#cbd5e1",
                },
                {
                  name: "hi4",
                  value: 60,
                  alias: "60th",
                  color: data > 40 && data < 61 ? "#6366f1" : "#cbd5e1",
                },
                {
                  name: "hi5",
                  value: 80,
                  alias: "80th",
                  color: data > 60 && data < 81 ? "#6366f1" : "#cbd5e1",
                },
                {
                  name: "hi6",
                  value: 90,
                  alias: ">90th",
                  color: data > 80 && data < 101 ? "#6366f1" : "#cbd5e1",
                },
              ]}
            />
          </div>
        )}
      </div>
    </div>
  );
}
