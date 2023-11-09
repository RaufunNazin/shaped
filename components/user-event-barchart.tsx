import { useState } from "react";
import { Outline } from "./outline";
import TitleInfo from "./title-info";
import { TitledBarChart } from "./graphs/new-bar-chart";
import { MessageBox } from "./message-box";
import { Selector } from "./selector";

interface UserEventBarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  data: any;
  filter1: string;
  filter2?: string;
  filter2Value?: string[][];
  onFilter1Change: (value: string) => void;
  onFilter2Change?: (value: string) => void;
}

export function UserEventBarchart({
  title,
  subtitle,
  data,
  filter1,
  filter2,
  filter2Value,
  onFilter1Change,
  onFilter2Change,
}: UserEventBarChartProps) {
  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-between items-center mb-3">
        <p className="my-2 text-black bg-white font-bold">{title}</p>
        <p className="text-gray-500">{subtitle ?? ""}</p>
        <div className="flex items-center gap-x-3">
          {filter2 && onFilter2Change && filter2Value ? (
            <Selector
              placeholder={filter2}
              items={([] as string[]).concat(...filter2Value)}
              onValueChange={(value: string) => {
                onFilter2Change(value);
              }}
              className="py-2 px-4 shadow-sm rounded-lg border"
            />
          ) : null}
          <Selector
            placeholder={filter1}
            items={["Last Day", "Last Week", "Last Month"]}
            onValueChange={(value: string) => {
              onFilter1Change(value);
            }}
            className="py-2 px-4 shadow-sm rounded-lg border"
          />
        </div>
      </div>

      <div>
        {data == null ? (
          <MessageBox title="No data yet"></MessageBox>
        ) : (
          <div className="w-full border rounded-lg">
            <TitledBarChart
              chartTitle={""}
              data={data}
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
