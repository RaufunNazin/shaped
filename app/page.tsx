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
import BarChart from "@/components/barchart";
import ModelCard from "@/components/model-card";
import { GoDatabase } from "react-icons/go";
import { BsBox } from "react-icons/bs";
import { CiRepeat, CiFilter } from "react-icons/ci";
import { Selector, SelectorLabeled } from "@/components/selector";
import { UserAttrubuteTable } from "@/components/user-attribute-table";
import { DashboardTableWrapper } from "@/components/dashboard-table";
import { DashboardShell } from "@/components/shell";
import { UserInteractionsTable } from "@/components/user-interactions-table";
import ConfigurationCard from "@/components/configuration-card";
import { Switch } from "@/components/ui/switch";

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

  const modelCardData = [
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

  const [user, setUser] = useState("Power user");
  const [userId, setUserId] = useState("4cb908bf-0ba5-4a7c-af4b-7954f49c9e72");
  const [algorithm, setAlgorithm] = useState(true);
  const [diversity, setDiversity] = useState(10);
  const [exploration, setExploration] = useState(10);
  const [pagination, setPagination] = useState(true);
  const [randomUser, setRandomUser] = useState("");

  return (
    <div>
      <div className="flex mt-5 px-5">
        <Selector
          placeholder={user}
          items={["Power user", "Cold-start user", "Random user", "Input user"]}
          onValueChange={(value: string) => {
            setUser(value);
          }}
          className="border-2 border-r-0 rounded-l-xl p-2"
        />
        {user === "Power user" ? (
          <Selector
            placeholder={userId}
            items={[
              "4cb908bf-0ba5-4a7c-af4b-7954f49c9e72",
              "4cb908bf-0ba5-4a7c-af4b-7954f4956465h56h",
              "hdfsuw87f-0ba5-4a7c-af4b-7954f49c9e72",
            ]}
            onValueChange={(value: string) => {
              setUserId(value);
            }}
            className="border-2 rounded-r-xl p-2 w-[400px]"
          />
        ) : user === "Cold-start user" ? (
          <Selector
            placeholder={userId}
            items={[
              "4cb908bf-0ba5-4a7c-af4b-7954f49c9e72",
              "4cb908bf-0ba5-4a7c-af4b-7954f4956465h56h",
              "hdfsuw87f-0ba5-4a7c-af4b-7954f49c9e72",
            ]}
            onValueChange={(value: string) => {
              setUserId(value);
            }}
            className="border-2 rounded-r-xl p-2 w-[400px]"
          />
        ) : user === "Random user" ? (
          <div className="flex items-center gap-x-4 border-2 w-[400px] p-2 rounded-r-xl">
            <div>{randomUser}</div>
            <button
              className="text-gray-500 font-medium text-sm"
              onClick={() => {
                setRandomUser("4cb908bf-0ba5-4a7c-af4b-7954f49c9e72");
              }}
            >
              Generate
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-x-4 border-2 p-2 w-[400px] rounded-r-xl">
            <input className="outline-0" />
          </div>
        )}
      </div>
      <div className="grid grid-cols-4 mt-5">
        <div className="px-5 col-span-3">
          <UserInteractionsTable
            userInteractions={[
              {
                user_id: "4cb908bf-0ba5-4a7c-af4b-7954f49c9e72",
                item_id: "317fd37e-61fc-4fd9-8a79-aefd80e2ff6f",
                timestamp: "2023-10-07 17:50:06",
                label: 0,
                title: "OCTOBER IS BREAST CANCER AWARENESS MONTH",
                genre: "VIDEO",
                items_user_id: "a951123f-4aec-440b-a6e9-ad8681c11ddb",
              },
              {
                user_id: "4cb908bf-0ba5-4a7c-af4b-7954f49c9e72",
                item_id: "13c61570-65ba-4077-912e-bd358fbbe1a8",
                timestamp: "2023-09-19 20:46:15",
                label: 0,
                title: "Honkai impact Magical Girl Sirin Build guide",
                genre: "VIDEO",
                items_user_id: "5dfb073c-ad2c-4b62-bf7b-3111b8de37ac",
              },
              {
                user_id: "4cb908bf-0ba5-4a7c-af4b-7954f49c9e72",
                item_id: "8c6341db-688d-4632-94e5-7a126094250c",
                timestamp: "2023-09-18 20:54:11",
                label: 0,
                title:
                  "Ahh he's drowning well I just bought this dress soo…😱😂✨💜🐰🫶🏽",
                genre: "VIDEO",
                items_user_id: "133ac2be-d0b7-418e-bd9c-053a4a38a654",
              },
              {
                user_id: "4cb908bf-0ba5-4a7c-af4b-7954f49c9e72",
                item_id: "82b99381-f61e-4b4b-b3f8-b7c7b31eeb10",
                timestamp: "2023-09-15 21:55:51",
                label: 0,
                title: "Here's the mosquito 🦟 dance 😅💜✨🫶🏽",
                genre: "VIDEO",
                items_user_id: "133ac2be-d0b7-418e-bd9c-053a4a38a654",
              },
              {
                user_id: "4cb908bf-0ba5-4a7c-af4b-7954f49c9e72",
                item_id: "695a49d6-3772-425d-a728-17d7b9737aa2",
                timestamp: "2023-09-15 02:58:10",
                label: 0,
                title: "",
                genre: "VIDEO",
                items_user_id: "50b4b35a-de38-40a6-a0b9-4639659c0217",
              },
              {
                user_id: "4cb908bf-0ba5-4a7c-af4b-7954f49c9e72",
                item_id: "e63627c4-4078-46df-a9a8-2a0007a3ed4c",
                timestamp: "2023-09-15 02:58:09",
                label: 0,
                title: "I really need ideas 💡",
                genre: "VIDEO",
                items_user_id: "d2d3dd61-6430-4d94-aaf4-0b47997e6fb1",
              },
              {
                user_id: "4cb908bf-0ba5-4a7c-af4b-7954f49c9e72",
                item_id: "695a49d6-3772-425d-a728-17d7b9737aa2",
                timestamp: "2023-09-15 02:58:08",
                label: 0,
                title: "",
                genre: "VIDEO",
                items_user_id: "50b4b35a-de38-40a6-a0b9-4639659c0217",
              },
              {
                user_id: "4cb908bf-0ba5-4a7c-af4b-7954f49c9e72",
                item_id: "91391ea0-adb0-459a-a389-06059fabc152",
                timestamp: "2023-09-15 02:58:05",
                label: 0,
                title: "3 super Random GenShin Facts!",
                genre: "VIDEO",
                items_user_id: "5dfb073c-ad2c-4b62-bf7b-3111b8de37ac",
              },
              {
                user_id: "4cb908bf-0ba5-4a7c-af4b-7954f49c9e72",
                item_id: "695a49d6-3772-425d-a728-17d7b9737aa2",
                timestamp: "2023-09-15 02:58:04",
                label: 0,
                title: "",
                genre: "VIDEO",
                items_user_id: "50b4b35a-de38-40a6-a0b9-4639659c0217",
              },
              {
                user_id: "4cb908bf-0ba5-4a7c-af4b-7954f49c9e72",
                item_id: "91391ea0-adb0-459a-a389-06059fabc152",
                timestamp: "2023-09-15 02:58:04",
                label: 0,
                title: "3 super Random GenShin Facts!",
                genre: "VIDEO",
                items_user_id: "5dfb073c-ad2c-4b62-bf7b-3111b8de37ac",
              },
              {
                user_id: "4cb908bf-0ba5-4a7c-af4b-7954f49c9e72",
                item_id: "bbde0ce7-e769-4873-88dc-8926446c9a55",
                timestamp: "2023-09-15 02:58:03",
                label: 0,
                title: "Duet this with me🤍",
                genre: "VIDEO",
                items_user_id: "3499f20d-1347-4395-aedd-b3bed3f36527",
              },
              {
                user_id: "4cb908bf-0ba5-4a7c-af4b-7954f49c9e72",
                item_id: "91391ea0-adb0-459a-a389-06059fabc152",
                timestamp: "2023-09-15 02:58:02",
                label: 0,
                title: "3 super Random GenShin Facts!",
                genre: "VIDEO",
                items_user_id: "5dfb073c-ad2c-4b62-bf7b-3111b8de37ac",
              },
              {
                user_id: "4cb908bf-0ba5-4a7c-af4b-7954f49c9e72",
                item_id: "bbde0ce7-e769-4873-88dc-8926446c9a55",
                timestamp: "2023-09-15 02:58:00",
                label: 0,
                title: "Duet this with me🤍",
                genre: "VIDEO",
                items_user_id: "3499f20d-1347-4395-aedd-b3bed3f36527",
              },
              {
                user_id: "4cb908bf-0ba5-4a7c-af4b-7954f49c9e72",
                item_id: "f31cfca9-eb68-49bc-b53a-dbe915a880a1",
                timestamp: "2023-09-05 23:19:43",
                label: 0,
                title:
                  "Found this fun Shower gel at Lush shaped like an octopus. Had give it a new home. Look at JIGGLE.",
                genre: "VIDEO",
                items_user_id: "51552fd9-e7e5-4e11-b2de-461912bf9b09",
              },
            ]}
          />
        </div>
        <div className="px-5">
          <UserAttrubuteTable
            userAttributes={{
              user_id: "4cb908bf-0ba5-4a7c-af4b-7954f49c9e72",
              user_timestamp: "2023-06-30 00:25:09",
              age: 34,
              gender: "male",
              occupation: "engineer",
              zip: 94102,
            }}
          />
        </div>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-5 gap-5">
        {modelCardData.map((card) => {
          return (
            <ModelCard
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
      <ConfigurationCard
        algorithm={algorithm}
        diversity={diversity}
        exploration={exploration}
        pagination={pagination}
        setDiversity={setDiversity}
        setExploration={setExploration}
        onAlgorithmChange={setAlgorithm}
        onDiversityChange={(value: string) => {
          const intValue = parseInt(value);
          if (Number.isNaN(intValue)) setDiversity(0);
          else if (intValue === null) setDiversity(0);
          else if (intValue < 100 || intValue === 100) setDiversity(intValue);
          else if (intValue < 0 || intValue === 0) setDiversity(0);
          else if (intValue > 100) setDiversity(100);
        }}
        onExplorationChange={(value: string) => {
          const intValue = parseInt(value);
          if (Number.isNaN(intValue)) setExploration(0);
          else if (intValue === null) setExploration(0);
          else if (intValue < 100 || intValue === 100) setExploration(intValue);
          else if (intValue < 0 || intValue === 0) setExploration(0);
          else if (intValue > 100) setExploration(100);
        }}
        onPaginationChange={setPagination}
      />
    </div>
  );
};

export default Page;
