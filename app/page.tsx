"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
// import ModelCard from "@/components/model-card";
import { Selector, SelectorLabeled } from "@/components/selector";
import { UserAttrubuteTable } from "@/components/user-attribute-table";
import { DashboardTableWrapper } from "@/components/dashboard-table";
import { DashboardShell } from "@/components/shell";
import { UserInteractionsTable } from "@/components/user-interactions-table";
// import ConfigurationCard from "@/components/configuration-card";
import { Switch } from "@/components/ui/switch";
import { UserResultsTable } from "@/components/user-results-table";
import { UserSessionsTable } from "@/components/user-sessions-table";
import { UserActivityBarChart } from "@/components/user-activity-barchart";

const Page = () => {
  //   const modelCardData = [
  //     {
  //       id: 1,
  //       title: "Retrieval",
  //       icon: <GoDatabase />,
  //       subtitle: "esci-MiniLM-L6-v2",
  //       time: "36ms",
  //     },
  //     {
  //       id: 2,
  //       title: "Filtering",
  //       icon: <CiFilter />,
  //       subtitle: "SQL",
  //       time: "16ms",
  //     },
  //     {
  //       id: 3,
  //       title: "Scoring",
  //       icon: <BsBox />,
  //       subtitle: "ce-msmarco-MiniLM-L6",
  //       time: "42ms",
  //     },
  //     {
  //       id: 4,
  //       title: "Ordering",
  //       icon: <CiRepeat />,
  //       subtitle: "LambdaMART: BM25, Metadata",
  //       time: "27ms",
  //     },
  //   ];

  const resultsData = [
    {
      Preview:
        "https://cdn.mos.cms.futurecdn.net/dPo92zYeAz7Joxh7HWooJ3-1200-80.jpg",
      title: "Transformers: The Last Knight",
      genre: ["Action", "Adventure", "Sci-Fi"],
      score: 0.9837,
      source: "Personalized",
      shapley: 0.9837,
    },
    {
      Preview:
        "https://cdn.mos.cms.futurecdn.net/dPo92zYeAz7Joxh7HWooJ3-1200-80.jpg",
      title: "The Dark Knight",
      genre: ["Action", "Crime", "Drama"],
      score: 0.9543,
      source: "Recommended",
      shapley: 0.9543,
    },
    {
      Preview:
        "https://cdn.mos.cms.futurecdn.net/dPo92zYeAz7Joxh7HWooJ3-1200-80.jpg",
      title: "Inception",
      genre: ["Action", "Adventure", "Sci-Fi"],
      score: 0.9765,
      source: "Popular",
      shapley: 0.9765,
    },
    {
      Preview:
        "https://cdn.mos.cms.futurecdn.net/dPo92zYeAz7Joxh7HWooJ3-1200-80.jpg",
      title: "Jurassic Park",
      genre: ["Action", "Adventure", "Sci-Fi"],
      score: 0.9268,
      source: "Recommended",
      shapley: 0.9268,
    },
    {
      Preview:
        "https://cdn.mos.cms.futurecdn.net/dPo92zYeAz7Joxh7HWooJ3-1200-80.jpg",
      title: "The Shawshank Redemption",
      genre: ["Drama"],
      score: 0.9892,
      source: "Personalized",
      shapley: 0.9892,
    },
    {
      Preview:
        "https://cdn.mos.cms.futurecdn.net/dPo92zYeAz7Joxh7HWooJ3-1200-80.jpg",
      title: "Pulp Fiction",
      genre: ["Crime", "Drama"],
      score: 0.9487,
      source: "Popular",
      shapley: 0.9487,
    },
    {
      Preview:
        "https://cdn.mos.cms.futurecdn.net/dPo92zYeAz7Joxh7HWooJ3-1200-80.jpg",
      title: "Avatar",
      genre: ["Action", "Adventure", "Fantasy"],
      score: 0.9376,
      source: "Personalized",
      shapley: 0.9376,
    },
    {
      Preview:
        "https://cdn.mos.cms.futurecdn.net/dPo92zYeAz7Joxh7HWooJ3-1200-80.jpg",
      title: "The Matrix",
      genre: ["Action", "Sci-Fi"],
      score: 0.9634,
      source: "Recommended",
      shapley: 0.9634,
    },
    {
      Preview:
        "https://cdn.mos.cms.futurecdn.net/dPo92zYeAz7Joxh7HWooJ3-1200-80.jpg",
      title: "Forrest Gump",
      genre: ["Drama", "Romance"],
      score: 0.9912,
      source: "Popular",
      shapley: 0.9912,
    },
    {
      Preview:
        "https://cdn.mos.cms.futurecdn.net/dPo92zYeAz7Joxh7HWooJ3-1200-80.jpg",
      title: "The Godfather",
      genre: ["Crime", "Drama"],
      score: 0.9789,
      source: "Recommended",
      shapley: 0.9789,
    },
  ];
  const [data, setData] = useState({
    userAttributes: {
      user_id: "459907",
      user_created_at: "2023-10-18 23:09:14",
      user_country_on_create_id: "US",
    },
    userActivityPercentile: {
      lastDay: 95,
      lastWeek: 60,
      lastMonth: 23,
    },
    itemFeatures: ["items_caption", "items_content_type", "items_user_id"],
    eventFeatures: ["event_caption", "event_content_type", "event_user_id"],
    recentSessions: [
      {
        sessionStartTime: "2023-10-01 12:00:00",
        sessionEndTime: "2023-10-02 12:00:00",
        sessionEvents: [
          {
            user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
            item_id: "e5d085ce-880b-4586-828b-4a5d27c0fefe",
            created_at: "2023-09-12 16:35:20",
            label: 0,
            items_caption: "I want to show your all something 😋😋🍄🦈",
            items_content_type: "VIDEO",
            items_user_id: "7989e2a2-65a1-43d9-9ed8-5e167f100657",
          },
          {
            user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
            item_id: "e5d085ce-880b-4586-8242348b-4a5d27c0fefe",
            created_at: "2023-09-12 16:35:20",
            label: 0,
            items_caption: "I want to show  all something 😋😋🍄🦈",
            items_content_type: "VIDEO",
            items_user_id: "7989e2a2-65a1-43d9-9ed8-5e167f100657",
          },
          {
            user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
            item_id: "e5d085ce-880b-4586-82448b-4a5d27c0fefe",
            created_at: "2023-09-12 16:35:20",
            label: 0,
            items_caption: "I want to show your  something 😋😋🍄🦈",
            items_content_type: "AUDIO",
            items_user_id: "7989e2a2-65a1-43d9-9ed8-5e167f100657",
          },
          {
            user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
            item_id: "e5d085ce-880b-4586-8242328b-4a5d27c0fefe",
            created_at: "2023-09-12 16:35:20",
            label: 0,
            items_caption: "I want to show your all  😋😋🍄🦈",
            items_content_type: "VIDEO",
            items_user_id: "7989e2a2-65a1-43d9-9ed8-5e167f100657",
          },
        ],
      },
      {
        sessionStartTime: "2023-10-02 12:00:00",
        sessionEndTime: "2023-10-03 12:00:00",
        sessionEvents: [
          {
            user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
            item_id: "e5d085ce-880b-4586-828b-4a5d27c0fefe",
            created_at: "2023-09-12 16:35:20",
            label: 0,
            items_caption: "I want to",
            items_content_type: "AUDIO",
            items_user_id: "7989e2a2-65a1-43d9-9ed8-5e167f100657",
          },
        ],
      },
      {
        sessionStartTime: "2023-10-03 12:00:00",
        sessionEndTime: "2023-10-04 12:00:00",
        sessionEvents: [
          {
            user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
            item_id: "e5d085ce-880b-4586-828b-4a5d27c0fefe",
            created_at: "2023-09-12 16:35:20",
            label: 0,
            items_caption: "I want to show your all something 😋😋🍄🦈",
            items_content_type: "VIDEO",
            items_user_id: "7989e2a2-65a1-43d9-9ed8-5e167f100657",
          },
        ],
      },
      {
        sessionStartTime: "2023-10-04 12:00:00",
        sessionEndTime: "2023-10-05 12:00:00",
        sessionEvents: [
          {
            user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
            item_id: "e5d085ce-880b-4586-828b-4a5d27c0fefe",
            created_at: "2023-09-12 16:35:20",
            label: 0,
            items_caption: "I want to show your all something 😋😋🍄🦈",
            items_content_type: "VIDEO",
            items_user_id: "7989e2a2-65a1-43d9-9ed8-5e167f100657",
          },
        ],
      },
      {
        sessionStartTime: "2023-10-05 12:00:00",
        sessionEndTime: "2023-10-06 12:00:00",
        sessionEvents: [
          {
            user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
            item_id: "e5d085ce-880b-4586-828b-4a5d27c0fefe",
            created_at: "2023-09-12 16:35:20",
            label: 0,
            items_caption: "I want to show your all something 😋😋🍄🦈",
            items_content_type: "AUDIO",
            items_user_id: "7989e2a2-65a1-43d9-9ed8-5e167f100657",
          },
        ],
      },
      {
        sessionStartTime: "2023-10-06 12:00:00",
        sessionEndTime: "2023-10-07 12:00:00",
        sessionEvents: [
          {
            user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
            item_id: "e5d085ce-880b-4586-828b-4a5d27c0fefe",
            created_at: "2023-09-12 16:35:20",
            label: 0,
            items_caption: "I want to show your all something 😋😋🍄🦈",
            items_content_type: "VIDEO",
            items_user_id: "7989e2a2-65a1-43d9-9ed8-5e167f100657",
          },
        ],
      },
      {
        sessionStartTime: "2023-10-07 12:00:00",
        sessionEndTime: "2023-10-08 12:00:00",
        sessionEvents: [
          {
            user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
            item_id: "e5d085ce-880b-4586-828b-4a5d27c0fefe",
            created_at: "2023-09-12 16:35:20",
            label: 0,
            items_caption: "I want to show your all something 😋😋🍄🦈",
            items_content_type: "VIDEO",
            items_user_id: "7989e2a2-65a1-43d9-9ed8-5e167f100657",
          },
        ],
      },
      {
        sessionStartTime: "2023-10-08 12:00:00",
        sessionEndTime: "2023-10-09 12:00:00",
        sessionEvents: [
          {
            user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
            item_id: "e5d085ce-880b-4586-828b-4a5d27c0fefe",
            created_at: "2023-09-12 16:35:20",
            label: 0,
            items_caption: "I want to show your all something 😋😋🍄🦈",
            items_content_type: "VIDEO",
            items_user_id: "7989e2a2-65a1-43d9-9ed8-5e167f100657",
          },
        ],
      },
      {
        sessionStartTime: "2023-10-09 12:00:00",
        sessionEndTime: "2023-10-10 12:00:00",
        sessionEvents: [
          {
            user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
            item_id: "e5d085ce-880b-4586-828b-4a5d27c0fefe",
            created_at: "2023-09-12 16:35:20",
            label: 0,
            items_caption: "I want to show your all something 😋😋🍄🦈",
            items_content_type: "VIDEO",
            items_user_id: "7989e2a2-65a1-43d9-9ed8-5e167f100657",
          },
        ],
      },
      {
        sessionStartTime: "2023-10-10 12:00:00",
        sessionEndTime: "2023-10-11 12:00:00",
        sessionEvents: [
          {
            user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
            item_id: "e5d085ce-880b-4586-828b-4a5d27c0fefe",
            created_at: "2023-09-12 16:35:20",
            label: 0,
            items_caption: "I want to show your all something 😋😋🍄🦈",
            items_content_type: "VIDEO",
            items_user_id: "7989e2a2-65a1-43d9-9ed8-5e167f100657",
          },
        ],
      },
      {
        sessionStartTime: "2023-10-11 12:00:00",
        sessionEndTime: "2023-10-12 12:00:00",
        sessionEvents: [
          {
            user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
            item_id: "e5d085ce-880b-4586-828b-4a5d27c0fefe",
            created_at: "2023-09-12 16:35:20",
            label: 0,
            items_caption: "I want to show your all something 😋😋🍄🦈",
            items_content_type: "VIDEO",
            items_user_id: "7989e2a2-65a1-43d9-9ed8-5e167f100657",
          },
        ],
      },
      {
        sessionStartTime: "2023-10-12 12:00:00",
        sessionEndTime: "2023-10-13 12:00:00",
        sessionEvents: [
          {
            user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
            item_id: "e5d085ce-880b-4586-828b-4a5d27c0fefe",
            created_at: "2023-09-12 16:35:20",
            label: 0,
            items_caption: "I want to show your all something 😋😋🍄🦈",
            items_content_type: "VIDEO",
            items_user_id: "7989e2a2-65a1-43d9-9ed8-5e167f100657",
          },
        ],
      },
      {
        sessionStartTime: "2023-10-13 12:00:00",
        sessionEndTime: "2023-10-14 12:00:00",
        sessionEvents: [
          {
            user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
            item_id: "e5d085ce-880b-4586-828b-4a5d27c0fefe",
            created_at: "2023-09-12 16:35:20",
            label: 0,
            items_caption: "I want to show your all something 😋😋🍄🦈",
            items_content_type: "VIDEO",
            items_user_id: "7989e2a2-65a1-43d9-9ed8-5e167f100657",
          },
        ],
      },
      {
        sessionStartTime: "2023-10-14 12:00:00",
        sessionEndTime: "2023-10-15 12:00:00",
        sessionEvents: [
          {
            user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
            item_id: "e5d085ce-880b-4586-828b-4a5d27c0fefe",
            created_at: "2023-09-12 16:35:20",
            label: 0,
            items_caption: "I want to show your all something 😋😋🍄🦈",
            items_content_type: "VIDEO",
            items_user_id: "7989e2a2-65a1-43d9-9ed8-5e167f100657",
          },
        ],
      },
      {
        sessionStartTime: "2023-10-15 12:00:00",
        sessionEndTime: "2023-10-16 12:00:00",
        sessionEvents: [
          {
            user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
            item_id: "e5d085ce-880b-4586-828b-4a5d27c0fefe",
            created_at: "2023-09-12 16:35:20",
            label: 0,
            items_caption: "I want to show your all something 😋😋🍄🦈",
            items_content_type: "VIDEO",
            items_user_id: "7989e2a2-65a1-43d9-9ed8-5e167f100657",
          },
        ],
      },
      {
        sessionStartTime: "2023-10-17 12:00:00",
        sessionEndTime: "2023-10-18 12:00:00",
        sessionEvents: [
          {
            user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
            item_id: "e5d085ce-880b-4586-828b-4a5d27c0fefe",
            created_at: "2023-09-12 16:35:20",
            label: 0,
            items_caption: "I want to show your all something 😋😋🍄🦈",
            items_content_type: "VIDEO",
            items_user_id: "7989e2a2-65a1-43d9-9ed8-5e167f100657",
          },
        ],
      },
      {
        sessionStartTime: "2023-10-18 12:00:00",
        sessionEndTime: "2023-10-19 12:00:00",
        sessionEvents: [
          {
            user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
            item_id: "e5d085ce-880b-4586-828b-4a5d27c0fefe",
            created_at: "2023-09-12 16:35:20",
            label: 0,
            items_caption: "I want to show your all something 😋😋🍄🦈",
            items_content_type: "VIDEO",
            items_user_id: "7989e2a2-65a1-43d9-9ed8-5e167f100657",
          },
        ],
      },
    ],
  });
  const [user, setUser] = useState("Power user");
  const [userId, setUserId] = useState("4cb908bf-0ba5-4a7c-af4b-7954f49c9e72");
  const [algorithm, setAlgorithm] = useState("Personalized");
  const [diversity, setDiversity] = useState(10);
  const [exploration, setExploration] = useState(10);
  const [pagination, setPagination] = useState(true);
  const [randomUser, setRandomUser] = useState("");
  const [dataFilter1, setDataFilter1] = useState("Last Month");
  const [dataFilter2, setDataFilter2] = useState("genre");
  const [selectedSessions, setSelectedSessions] = useState([
    data?.recentSessions[0].sessionStartTime,
  ]);
  const [userActivityFilter, setUserActivityFilter] = useState("Last Week");

  const allInteractions = useMemo(() => {
    if (!data) return []; // Handle the case when data is not available yet

    const filteredInteractions = data.recentSessions.filter((session) =>
      selectedSessions?.includes(session.sessionStartTime)
    );

    // Extract sessionEvents and put them in a new array
    const sessionEventsArray = filteredInteractions
      .map((session) => session.sessionEvents)
      .flat();

    return sessionEventsArray;
  }, [data, selectedSessions]);

  return (
    <div>
      <div className="mt-5 flex px-5">
        <Selector
          placeholder={user}
          items={["Power user", "Cold-start user", "Random user", "Input user"]}
          onValueChange={(value: string) => {
            setUser(value);
          }}
          className="rounded-l-xl border-2 border-r-0 p-2"
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
            className="w-[450px] rounded-r-xl border-2 p-2"
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
            className="w-[450px] rounded-r-xl border-2 p-2"
          />
        ) : user === "Random user" ? (
          <div className="flex w-[450px] items-center justify-between gap-x-4 rounded-r-xl border-2 p-2">
            <div>{randomUser}</div>
            <button
              className="text-sm font-medium text-gray-500"
              onClick={() => {
                setRandomUser("4cb908bf-0ba5-4a7c-af4b-7954f49c9e72");
              }}
            >
              Generate
            </button>
          </div>
        ) : (
          <div className="flex w-[450px] items-center gap-x-4 rounded-r-xl border-2 p-2">
            <input className="outline-0" />
          </div>
        )}
      </div>
      {/* <div className="px-5">
        <UserResultsTable resultsData={resultsData} />
      </div> */}
      <div className="grid grid-cols-2">
        <div className="px-5">
          <UserAttrubuteTable
            userAttributes={{
              age: 34,
              gender: "male",
              occupation: "engineer",
              zip: 94102,
            }}
          />
        </div>
        <div className="px-5">
          <UserActivityBarChart
            title="User activity percentile"
            userActivity={
              userActivityFilter === "Last Day"
                ? data.userActivityPercentile.lastDay
                : userActivityFilter === "Last Week"
                ? data.userActivityPercentile.lastWeek
                : data.userActivityPercentile.lastMonth
            }
            userActivityFilter={userActivityFilter}
            setUserActivityFilter={setUserActivityFilter}
          />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-5">
        <div className="px-5">
          <UserSessionsTable
            recentSessions={data.recentSessions}
            currentSessions={selectedSessions}
            onSessionChange={setSelectedSessions}
          />
        </div>
        <div className="col-span-4 px-5">
          <UserInteractionsTable userInteractions={allInteractions} />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2">
        <div className="px-5">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="my-3 text-left font-bold">Vertical Bar Chart 1</h2>
            <div className="flex items-center gap-x-2">
              <Selector
                placeholder={dataFilter2}
                items={["genre", "activity", "events"]}
                onValueChange={(value: string) => {
                  setDataFilter2(value);
                }}
                className="rounded-lg border px-4 py-2 shadow-md"
              />
              <Selector
                placeholder={dataFilter1}
                items={["Last Week", "Last Month"]}
                onValueChange={(value: string) => {
                  setDataFilter1(value);
                }}
                className="rounded-lg border px-4 py-2 shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-5 gap-5">
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
      </div> */}
      {/* <ConfigurationCard
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
      /> */}
    </div>
  );
};

export default Page;
