"use client";
import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import BarChart from "@/components/BarChart";
import Card from "@/components/Card";
import { GoDatabase } from "react-icons/go";
import { BsBox } from "react-icons/bs";
import { CiRepeat, CiFilter } from "react-icons/ci";
import { Selector, SelectorLabeled } from "@/components/selector";
import { UserAttrubuteTable } from "@/components/user-attribute-table";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Page = () => {
  const horizontalBarData = {
    labels: ["genre", "age", "release_date", "director", "length"],
    datasets: [
      {
        data: [
          Math.random() * 40,
          Math.random() * 40,
          Math.random() * 40,
          Math.random() * 40,
          Math.random() * 40,
        ],
        backgroundColor: "#cbd5e1", // Bar color
      },
    ],
  };

  const verticalBarData1 = {
    labels: [
      "Action",
      "Drama",
      "Comedy",
      "Romance",
      "Stand-up",
      "Thriller",
      "Horror",
    ],
    datasets: [
      {
        data: [
          Math.random() * 25,
          Math.random() * 25,
          Math.random() * 25,
          Math.random() * 25,
          Math.random() * 25,
          Math.random() * 25,
          Math.random() * 25,
        ],
        backgroundColor: "#cbd5e1", // Bar color
      },
    ],
  };

  const verticalBarData2 = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
        ],
        backgroundColor: "#cbd5e1", // Bar color
      },
    ],
  };

  const cardData = [
    {
      id: 1,
      title: "Retrieval",
      icon: <GoDatabase />,
      subtitle: "esci-MiniLM-L6-v2",
      time: "36ms",
    },
    {
      id: 2,
      title: "Filtering",
      icon: <CiFilter />,
      subtitle: "SQL",
      time: "16ms",
    },
    {
      id: 3,
      title: "Scoring",
      icon: <BsBox />,
      subtitle: "ce-msmarco-MiniLM-L6",
      time: "42ms",
    },
    {
      id: 4,
      title: "Ordering",
      icon: <CiRepeat />,
      subtitle: "LambdaMART: BM25, Metadata",
      time: "27ms",
    },
  ];

  const [label, setlabel] = useState("select");

  return (
    <div>
      <div className="flex gap-x-4 mt-5 px-5">
        <Selector
          placeholder={label}
          items={["1", "2", "3"]}
          onValueChange={(value: string) => {
            setlabel(value);
          }}
        />
        <SelectorLabeled
          label="Number"
          placeholder={label}
          items={["1", "2", "3"]}
          onValueChange={(value: string) => {
            setlabel(value);
          }}
        />
      </div>
      <div className="px-5">
        <UserAttrubuteTable
          userAttributes={{
            user_id: "4cb908bf-0ba5-4a7c-af4b-7954f49c9e72",
            user_created_at: "2023-06-30 00:25:09",
            age: 34,
            gender: "male",
            occupation: "engineer",
            zip: 94102
          }}
        />
      </div>
      <div className="px-5">
        <h2 className="text-left my-3 font-bold">Horizontal Bar Chart</h2>
        <div className="mx-auto border p-5 rounded-xl">
          <BarChart
            data={horizontalBarData}
            indexAxis="y"
            height={"400px"}
            width={"100%"}
            borderRadius={4}
            responsive={true}
            maintainAspectRatio={false}
            legend={false}
            gridX={false}
            gridY={false}
            borderX={false}
            borderY={false}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="px-5">
          <h2 className="text-left my-3 font-bold">Vertical Bar Chart 1</h2>
          <div className="mx-auto border p-5 rounded-xl">
            <BarChart
              data={verticalBarData1}
              indexAxis="x"
              height={"400px"}
              width={"100%"}
              borderRadius={4}
              responsive={true}
              maintainAspectRatio={false}
              legend={false}
              gridX={false}
              gridY={false}
              borderX={false}
              borderY={false}
            />
          </div>
        </div>
        <div className="px-5">
          <h2 className="text-left my-3 font-bold">Vertical Bar Chart 2</h2>
          <div className="mx-auto border p-5 rounded-xl">
            <BarChart
              data={verticalBarData2}
              indexAxis="x"
              height={"400px"}
              width={"100%"}
              borderRadius={4}
              responsive={true}
              maintainAspectRatio={false}
              legend={false}
              gridX={false}
              gridY={false}
              borderX={false}
              borderY={false}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 p-5 gap-5">
        {cardData.map((card) => {
          return (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              icon={card.icon}
              subtitle={card.subtitle}
              time={card.time}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Page;
