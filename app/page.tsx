"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
// import ModelCard from "@/components/model-card";
import { Selector, SelectorLabeled } from "@/components/selector";
import { UserAttrubuteTable } from "@/components/user-attribute-table";
import { DashboardTableWrapper } from "@/components/dashboard-table";
import { DashboardShell } from "@/components/shell";
import { UserInteractionsTable } from "@/components/user-interactions-table";
import ConfigurationCard from "@/components/configuration-card";
import { Switch } from "@/components/ui/switch";
import { UserResultsTable } from "@/components/user-results-table";
import { UserSessionsTable } from "@/components/user-sessions-table";
import { UserActivityAreaChart } from "@/components/user-activity-areachart";
import { OutlineTitleInfo } from "@/components/outline";
import TitleInfo from "@/components/title-info";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import axios from "@/utils/axios-interceptor";
import { useParams } from "next/navigation";
import { CustomTabsTrigger, Tabs, TabsList } from "@/components/ui/tabs";
import { RecommendationTabEnumNew } from "@/types/enums";
import { toast } from "@/hooks/use-toast";
import { UserEventBarchart } from "@/components/user-event-barchart";
import AreaChart from "@/components/graphs/area-chart";
import InteractionAreachart from "@/components/interaction-areachart";
import moment from "moment";

const Page = () => {
  const LightBulb = Icons["lightBulb"];
  const params = useParams();
  const modelName = params?.modelName as string;
  const interactionRef = useRef<any>(null);
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
  const newResultsData = [
    {
      item_id: "de80e902-5586-486b-995b6-486b6-486bde80e902-5586-486b-995",
      score: 0.9837,
    },
    {
      item_id: "de80e902-5586-486b-995b6-486b6-486bde80e902-5586-486b-995",
      score: 0.9837,
    },
    {
      item_id: "de80e902-5586-486b-995b6-486b6-486bde80e902-5586-486b-995",
      score: 0.9837,
    },
    {
      item_id: "de80e902-5586-486b-995b6-486b6-486bde80e902-5586-486b-995",
      score: 0.9837,
    },
    {
      item_id: "de80e902-5586-486b-995b6-486b6-486bde80e902-5586-486b-995",
      score: 0.9837,
    },
    {
      item_id: "de80e902-5586-486b-995b6-486b6-486bde80e902-5586-486b-995",
      score: 0.9837,
    },
    {
      item_id: "de80e902-5586-486b-995b6-486b6-486bde80e902-5586-486b-995",
      score: 0.9837,
    },
    {
      item_id: "de80e902-5586-486b-995b6-486b6-486bde80e902-5586-486b-995",
      score: 0.9837,
    },
    {
      item_id: "de80e902-5586-486b-995b6-486b6-486bde80e902-5586-486b-995",
      score: 0.9837,
    },
    {
      item_id: "de80e902-5586-486b-995b6-486b6-486bde80e902-5586-486b-995",
      score: 0.9837,
    },
    {
      item_id: "de80e902-5586-486b-995b6-486b6-486bde80e902-5586-486b-995",
      score: 0.9837,
    },
  ];
  const interactionAreachartData = [
    { name: "2012-04-11T07:00:00.000Z", value: 1 },
    { name: "2012-04-12T07:00:00.000Z", value: 3 },
    { name: "2012-04-13T07:00:00.000Z", value: 5 },
    { name: "2012-04-14T07:00:00.000Z", value: 8 },
    { name: "2012-04-15T07:00:00.000Z", value: 10 },
    { name: "2012-04-16T07:00:00.000Z", value: 12 },
    { name: "2012-04-17T07:00:00.000Z", value: 13 },
    { name: "2012-04-18T07:00:00.000Z", value: 14 },
    { name: "2012-04-19T07:00:00.000Z", value: 16 },
    { name: "2012-04-20T07:00:00.000Z", value: 18 },
    { name: "2012-04-21T07:00:00.000Z", value: 22 },
    { name: "2012-04-22T07:00:00.000Z", value: 25 },
    { name: "2012-04-23T07:00:00.000Z", value: 27 },
    { name: "2012-04-24T07:00:00.000Z", value: 31 },
    { name: "2012-04-25T07:00:00.000Z", value: 35 },
    { name: "2012-04-26T07:00:00.000Z", value: 38 },
    { name: "2012-04-27T07:00:00.000Z", value: 43 },
    { name: "2012-04-28T07:00:00.000Z", value: 45 },
    { name: "2012-04-29T07:00:00.000Z", value: 50 },
    { name: "2012-04-30T07:00:00.000Z", value: 80 },
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
    interactions: [
      {
        user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
        item_id: "e5d085ce-880b-4586-828b-4a5d27c0fefe",
        created_at: "2023-09-12T16:35:20.000Z",
        label: 0,
        items_caption: "I want to show your all something 😋😋🍄🦈",
        items_content_type: "VIDEO",
        items_user_id: "7989e2a2-65a1-43d9-9ed8-5e167f100657",
      },
      {
        user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
        item_id: "item_8atgpt5yd",
        created_at: "2023-09-12T16:40:02.000Z",
        label: 1,
        items_caption: "Caption k8xjz",
        items_content_type: "IMAGE",
        items_user_id: "user_1apnvjr5k",
      },
      {
        user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
        item_id: "item_10fse9maz",
        created_at: "2023-09-12T16:43:25.000Z",
        label: 0,
        items_caption: "Caption mpmu2",
        items_content_type: "VIDEO",
        items_user_id: "user_1d25c0spt",
      },
      {
        user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
        item_id: "item_7vft4sj6q",
        created_at: "2023-09-12T16:45:12.000Z",
        label: 1,
        items_caption: "Caption mbk4p",
        items_content_type: "IMAGE",
        items_user_id: "user_1ujym9c7d",
      },
      {
        user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
        item_id: "item_1g67bg4s9",
        created_at: "2023-09-12T16:49:05.000Z",
        label: 0,
        items_caption: "Caption ft2u6",
        items_content_type: "VIDEO",
        items_user_id: "user_8hth92xh5",
      },
      {
        user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
        item_id: "item_8cq7s6pug",
        created_at: "2023-09-12T16:52:32.000Z",
        label: 1,
        items_caption: "Caption r1oj4",
        items_content_type: "IMAGE",
        items_user_id: "user_1gpx5a2kn",
      },
      {
        user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
        item_id: "item_4yhpzmv1w",
        created_at: "2023-09-12T16:57:20.000Z",
        label: 0,
        items_caption: "Caption kmuf7",
        items_content_type: "VIDEO",
        items_user_id: "user_1jthd5pq4",
      },
      {
        user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
        item_id: "item_1qgm7e84d",
        created_at: "2023-09-12T17:00:41.000Z",
        label: 1,
        items_caption: "Caption 4d72h",
        items_content_type: "IMAGE",
        items_user_id: "user_1gc7c5stf",
      },
      {
        user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
        item_id: "item_6d7js9c1g",
        created_at: "2023-09-12T17:05:18.000Z",
        label: 0,
        items_caption: "Caption hznc3",
        items_content_type: "VIDEO",
        items_user_id: "user_1hhp5a7mk",
      },
      {
        user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
        item_id: "item_5u8sgv3ft",
        created_at: "2023-09-12T17:09:47.000Z",
        label: 1,
        items_caption: "Caption 3nhp4",
        items_content_type: "IMAGE",
        items_user_id: "user_1itg5a6bn",
      },
      {
        user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
        item_id: "item_9z8f7gs1q",
        created_at: "2023-09-12T17:13:22.000Z",
        label: 0,
        items_caption: "Caption vmug9",
        items_content_type: "VIDEO",
        items_user_id: "user_1jc7c5sp1",
      },
      {
        user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
        item_id: "item_3q7f4gv1e",
        created_at: "2023-09-12T17:18:10.000Z",
        label: 1,
        items_caption: "Caption 2u71j",
        items_content_type: "IMAGE",
        items_user_id: "user_1kcp9a2tn",
      },
      {
        user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
        item_id: "item_8yc7sgz5q",
        created_at: "2023-09-12T17:21:31.000Z",
        label: 0,
        items_caption: "Caption n2ufj",
        items_content_type: "VIDEO",
        items_user_id: "user_1ldg5a3q4",
      },
      {
        user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
        item_id: "item_4bft8j7hq",
        created_at: "2023-09-12T17:26:08.000Z",
        label: 1,
        items_caption: "Caption j3ua7",
        items_content_type: "IMAGE",
        items_user_id: "user_1mpn5a1qn",
      },
      {
        user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
        item_id: "item_9yfb7gz3d",
        created_at: "2023-09-12T17:30:45.000Z",
        label: 0,
        items_caption: "Caption qzj7h",
        items_content_type: "VIDEO",
        items_user_id: "user_1ncg5a2tp",
      },
      {
        user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
        item_id: "item_2f7b5gv8k",
        created_at: "2023-09-12T17:35:32.000Z",
        label: 1,
        items_caption: "Caption p8qsg",
        items_content_type: "IMAGE",
        items_user_id: "user_1ocg5a4th",
      },
      {
        user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
        item_id: "item_1k7b9g3jm",
        created_at: "2023-09-12T17:39:59.000Z",
        label: 0,
        items_caption: "Caption 7hqu9",
        items_content_type: "VIDEO",
        items_user_id: "user_1pcg5a5tn",
      },
      {
        user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
        item_id: "item_8c7b5gv9m",
        created_at: "2023-09-12T17:44:47.000Z",
        label: 1,
        items_caption: "Caption k9psg",
        items_content_type: "IMAGE",
        items_user_id: "user_1qcg5a6qn",
      },
    ],
  });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("Power user");
  const [userId, setUserId] = useState("4cb908bf-0ba5-4a7c-af4b-7954f49c9e72");
  const [recentSessions, setRecentSessions]: any = useState([]);
  const [userActivityData, setUserActivityData]: any = useState([]);
  const [algorithm, setAlgorithm] = useState("Personalized");
  const [diversity, setDiversity] = useState(10);
  const [exploration, setExploration] = useState(10);
  const [randomUser, setRandomUser] = useState("");
  const [eventSummaryFilter1, setEventSummaryFilter1] = useState("Last Month");
  const [eventSummaryFilter2, setEventSummaryFilter2] = useState(
    data.itemFeatures[0]
  );
  const [eventActivityFilter1, setEventActivityFilter1] =
    useState("Last Month");
  // const [eventActivityFilter2, setEventActivityFilter2] =
  //   useState("Last Month");
  const [loadingRandUserId, setLoadingRandUserId] = useState(false);
  const [selectedSessions, setSelectedSessions]: any = useState([]);
  const [userActivityFilter, setUserActivityFilter] = useState("Last Week");
  const [currentTab, setCurrentTab] = useState<RecommendationTabEnumNew>(
    RecommendationTabEnumNew.Rank
  );
  const [interactionAreachartWidth, setInteractionAreachartWidth] =
    useState(1500);

  const handleRandomUser = async () => {
    try {
      setLoadingRandUserId(true);
      const resp = await axios.get(
        `/api/models/recommendation/random-user-id`,
        {
          params: { modelName },
        }
      );
      setLoadingRandUserId(false);

      setUserId(resp.data.data.userId);
    } catch (error) {
      setLoadingRandUserId(false);
      console.log("error");
      return toast({
        title: "Something went wrong.",
        description: "Error occurred while fetching random user id",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (userId: string) => {
    // try {
    //   setLoading(true)
    //   setUserError("")
    //   setRankError("")
    //   const { apiKey } = await getOrganizationInfo()
    //   if (!apiKey) {
    //     setLoading(false)
    //     setUserError("Something went wrong")
    //     setRankError("Something went wrong")
    //     return
    //   }
    //   const userPromise = axios
    //     .get(`/api/models/recommendation/user-attributes-and-interactions`, {
    //       params: { modelName, userId },
    //     })
    //     .then((userResp) => {
    //       if (!userResp.data.success) setUserError(userResp.data.message)
    //       else {
    //         setUserAttributes(userResp.data.data.attributes ?? {})
    //         userResp.data.data.interactions.sort(
    //           (a, b) =>
    //             moment(b.created_at).unix() - moment(a.created_at).unix()
    //         )
    //         for (const interaction of userResp.data.data.interactions) {
    //           delete interaction.user_id
    //         }
    //         setUserInteractions(userResp.data.data.interactions)
    //       }
    //     })
    //     .catch((error) => {
    //       setUserError(error.response.data.message)
    //       console.log(
    //         "Error occurred while fetching user attributes and interactions:",
    //         error.response.data
    //       )
    //     })
    //   const rankPromise = axios
    //     .get(`/api/models/recommendation/user-rank-results`, {
    //       params: { modelName, userId },
    //       headers: { "x-api-key": apiKey },
    //     })
    //     .then((rankResp) => {
    //       if (!rankResp.data.success) setRankError(rankResp.data.message)
    //       else {
    //         const rankResults = getRankResult(rankResp.data.data)
    //         setResults(rankResults)
    //       }
    //     })
    //     .catch((error) => {
    //       setRankError(
    //         error.response.data.data?.detail ?? error.response.data.message
    //       )
    //       setRankErrorTitle(error.response.data.data?.title ?? "Error")
    //       console.log(
    //         "Error occurred while fetching user attributes and interactions:",
    //         error.response.data
    //       )
    //     })
    //   await userPromise
    //   await rankPromise
    //   setLoading(false)
    // } catch (error) {
    //   setUserError("Something went wrong")
    //   setRankError("Something went wrong")
    //   setLoading(false)
    //   console.log(
    //     "Error occurred while fetching user attributes and interactions:",
    //     error
    //   )
    // }
  };

  const allInteractions = useMemo(() => {
    if (!data) return []; // Handle the case when data is not available yet

    const filteredInteractions = recentSessions.filter((session: any) =>
      selectedSessions?.includes(session.sessionStartTime)
    );

    // Extract sessionEvents and put them in a new array
    const sessionEventsArray = filteredInteractions
      .map((session: any) => session.sessionEvents)
      .flat();

    return sessionEventsArray;
  }, [data, selectedSessions, recentSessions]);

  const calculateRecentSessions = (interactions: any) => {
    const recentSessions = [];
    interactions.sort(
      (a: any, b: any) =>
        moment(a.created_at).unix() - moment(b.created_at).unix()
    );
    let currentSession = [];
    for (let i = 0; i < interactions.length; i++) {
      if (currentSession.length == 0) currentSession.push(interactions[i]);
      else if (
        moment(interactions[i].created_at).unix() -
          moment(interactions[i - 1].created_at).unix() <=
        300
      ) {
        currentSession.push(interactions[i]);
      } else {
        recentSessions.push({
          sessionStartTime: currentSession[0].created_at,
          sessionEndTime: currentSession.at(-1).created_at,
          sessionEvents: currentSession,
        });
        currentSession = [interactions[i]];
      }
    }
    recentSessions.push({
      sessionStartTime: currentSession[0].created_at,
      sessionEndTime: currentSession.at(-1).created_at,
      sessionEvents: currentSession,
    });
    return recentSessions;
  };

  useEffect(() => {
    setLoading(true);
    const responseData = {
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
      interactions: [
        {
          user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
          item_id: "e5d085ce-880b-4586-828b-4a5d27c0fefe",
          created_at: "2023-09-12T16:35:20.000Z",
          label: 0,
          items_caption: "I want to show your all something 😋😋🍄🦈",
          items_content_type: "VIDEO",
          items_user_id: "7989e2a2-65a1-43d9-9ed8-5e167f100657",
        },
        {
          user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
          item_id: "item_8atgpt5yd",
          created_at: "2023-09-12T16:40:02.000Z",
          label: 1,
          items_caption: "Caption k8xjz",
          items_content_type: "IMAGE",
          items_user_id: "user_1apnvjr5k",
        },
        {
          user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
          item_id: "item_10fse9maz",
          created_at: "2023-09-12T16:43:25.000Z",
          label: 0,
          items_caption: "Caption mpmu2",
          items_content_type: "VIDEO",
          items_user_id: "user_1d25c0spt",
        },
        {
          user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
          item_id: "item_7vft4sj6q",
          created_at: "2023-09-12T16:45:12.000Z",
          label: 1,
          items_caption: "Caption mbk4p",
          items_content_type: "IMAGE",
          items_user_id: "user_1ujym9c7d",
        },
        {
          user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
          item_id: "item_1g67bg4s9",
          created_at: "2023-09-12T16:49:05.000Z",
          label: 0,
          items_caption: "Caption ft2u6",
          items_content_type: "VIDEO",
          items_user_id: "user_8hth92xh5",
        },
        {
          user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
          item_id: "item_8cq7s6pug",
          created_at: "2023-09-12T16:52:32.000Z",
          label: 1,
          items_caption: "Caption r1oj4",
          items_content_type: "IMAGE",
          items_user_id: "user_1gpx5a2kn",
        },
        {
          user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
          item_id: "item_4yhpzmv1w",
          created_at: "2023-09-12T16:57:33.000Z",
          label: 0,
          items_caption: "Caption kmuf7",
          items_content_type: "VIDEO",
          items_user_id: "user_1jthd5pq4",
        },
        {
          user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
          item_id: "item_1qgm7e84d",
          created_at: "2023-09-12T17:00:41.000Z",
          label: 1,
          items_caption: "Caption 4d72h",
          items_content_type: "IMAGE",
          items_user_id: "user_1gc7c5stf",
        },
        {
          user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
          item_id: "item_6d7js9c1g",
          created_at: "2023-09-12T17:05:18.000Z",
          label: 0,
          items_caption: "Caption hznc3",
          items_content_type: "VIDEO",
          items_user_id: "user_1hhp5a7mk",
        },
        {
          user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
          item_id: "item_5u8sgv3ft",
          created_at: "2023-09-12T17:09:47.000Z",
          label: 1,
          items_caption: "Caption 3nhp4",
          items_content_type: "IMAGE",
          items_user_id: "user_1itg5a6bn",
        },
        {
          user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
          item_id: "item_9z8f7gs1q",
          created_at: "2023-09-12T17:13:22.000Z",
          label: 0,
          items_caption: "Caption vmug9",
          items_content_type: "VIDEO",
          items_user_id: "user_1jc7c5sp1",
        },
        {
          user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
          item_id: "item_3q7f4gv1e",
          created_at: "2023-09-12T17:18:10.000Z",
          label: 1,
          items_caption: "Caption 2u71j",
          items_content_type: "IMAGE",
          items_user_id: "user_1kcp9a2tn",
        },
        {
          user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
          item_id: "item_8yc7sgz5q",
          created_at: "2023-09-12T17:25:31.000Z",
          label: 0,
          items_caption: "Caption n2ufj",
          items_content_type: "VIDEO",
          items_user_id: "user_1ldg5a3q4",
        },
        {
          user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
          item_id: "item_4bft8j7hq",
          created_at: "2023-09-12T17:26:08.000Z",
          label: 1,
          items_caption: "Caption j3ua7",
          items_content_type: "IMAGE",
          items_user_id: "user_1mpn5a1qn",
        },
        {
          user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
          item_id: "item_9yfb7gz3d",
          created_at: "2023-09-12T17:33:45.000Z",
          label: 0,
          items_caption: "Caption qzj7h",
          items_content_type: "VIDEO",
          items_user_id: "user_1ncg5a2tp",
        },
        {
          user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
          item_id: "item_2f7b5gv8k",
          created_at: "2023-09-12T17:35:32.000Z",
          label: 1,
          items_caption: "Caption p8qsg",
          items_content_type: "IMAGE",
          items_user_id: "user_1ocg5a4th",
        },
        {
          user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
          item_id: "item_1k7b9g3jm",
          created_at: "2023-09-12T17:42:59.000Z",
          label: 0,
          items_caption: "Caption 7hqu9",
          items_content_type: "VIDEO",
          items_user_id: "user_1pcg5a5tn",
        },
        {
          user_id: "e6af1f94-78db-4c70-b03a-50ff484cb8ed",
          item_id: "item_8c7b5gv9m",
          created_at: "2023-09-12T17:44:47.000Z",
          label: 1,
          items_caption: "Caption k9psg",
          items_content_type: "IMAGE",
          items_user_id: "user_1qcg5a6qn",
        },
      ],
    };
    const activityData = [
      { user_id: "2012-04-11T07:00:00.000Z", eventCount: 5 },
      { user_id: "2012-04-12T07:00:00.000Z", eventCount: 15 },
      { user_id: "2012-04-13T07:00:00.000Z", eventCount: 7 },
      { user_id: "2012-04-14T07:00:00.000Z", eventCount: 12 },
      { user_id: "2012-04-15T07:00:00.000Z", eventCount: 9 },
      { user_id: "2012-04-16T07:00:00.000Z", eventCount: 20 },
      { user_id: "2012-04-17T07:00:00.000Z", eventCount: 3 },
      { user_id: "2012-04-18T07:00:00.000Z", eventCount: 18 },
      { user_id: "2012-04-19T07:00:00.000Z", eventCount: 6 },
      { user_id: "2012-04-20T07:00:00.000Z", eventCount: 14 },
      { user_id: "2012-04-21T07:00:00.000Z", eventCount: 8 },
      { user_id: "2012-04-22T07:00:00.000Z", eventCount: 11 },
      { user_id: "2012-04-23T07:00:00.000Z", eventCount: 4 },
      { user_id: "2012-04-24T07:00:00.000Z", eventCount: 17 },
      { user_id: "2012-04-25T07:00:00.000Z", eventCount: 13 },
      { user_id: "2012-04-26T07:00:00.000Z", eventCount: 2 },
      { user_id: "2012-04-27T07:00:00.000Z", eventCount: 10 },
      { user_id: "2012-04-28T07:00:00.000Z", eventCount: 19 },
      { user_id: "2012-04-29T07:00:00.000Z", eventCount: 1 },
      { user_id: "2012-04-30T07:00:00.000Z", eventCount: 16 },
    ];
    const modifiedActivityData = activityData.map(
      ({ user_id, eventCount }) => ({
        name: user_id,
        value: eventCount,
      })
    );
    setUserActivityData(
      modifiedActivityData.sort((a: any, b: any) => a.value - b.value)
    );
    setData(responseData);
    const sessions = calculateRecentSessions(responseData.interactions);
    setRecentSessions(sessions);
    console.log(sessions);
    setSelectedSessions([sessions[0].sessionStartTime]);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (interactionRef.current)
      setInteractionAreachartWidth(interactionRef.current.clientWidth - 60);
  }, []);
  if (loading) return <br />;
  else
    return (
      <div className="p-5 flex flex-col space-y-5">
        <DashboardTableWrapper className="max-w-full overflow-x-auto pb-8">
          <div className="px-12">
            <div className="flex justify-between items-center">
              <TitleInfo title="Inspect" className="py-12" />
              <div className="mt-5 flex px-5">
                <Selector
                  placeholder={user}
                  items={[
                    "Power user",
                    "Cold-start user",
                    "Random user",
                    "Input user",
                  ]}
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
                      onClick={handleRandomUser}
                      className="mx-2 flex items-center rounded-2xl text-white"
                      disabled={loadingRandUserId}
                    >
                      {loadingRandUserId ? (
                        <Icons.spinner className="h-4 w-10 animate-spin text-gray-400" />
                      ) : (
                        <span className="text-sm font-semibold text-gray-400">
                          Generate
                        </span>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="flex w-[450px] items-center gap-x-4 rounded-r-xl border-2 p-2">
                    <input className="outline-0 w-full" />
                  </div>
                )}
                <Button
                  type="submit"
                  onClick={() => handleSubmit(userId)}
                  className="w-[6.5rem] rounded-2xl bg-black text-white ml-5"
                  disabled={loading || userId == null || userId.length == 0}
                >
                  {loading ? (
                    <Icons.spinner className="mr-2 h-4 w-10 animate-spin" />
                  ) : (
                    <div className="flex flex-row justify-between items-center space-x-1">
                      <LightBulb className="h-4 w-4" />
                      <div className="font-semibold">Submit</div>
                    </div>
                  )}
                </Button>
              </div>
            </div>

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
                <UserActivityAreaChart
                  title="User activity percentile"
                  data={userActivityData}
                  subtitle="Count of events relative to population"
                  userActivity={
                    userActivityFilter === "Last Day"
                      ? data.userActivityPercentile.lastDay
                      : userActivityFilter === "Last Week"
                      ? data.userActivityPercentile.lastWeek
                      : data.userActivityPercentile.lastMonth
                  }
                  filter1={userActivityFilter}
                  onFilter1Change={setUserActivityFilter}
                />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-5">
              <div className="px-5">
                <UserSessionsTable
                  recentSessions={recentSessions}
                  currentSessions={selectedSessions}
                  onSessionChange={setSelectedSessions}
                />
              </div>
              <div className="col-span-4 px-5">
                <UserInteractionsTable
                  userInteractions={allInteractions}
                  features={[data.itemFeatures, data.eventFeatures]}
                />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2">
              <div className="px-5">
                <UserEventBarchart
                  title="Events Summary"
                  data={null}
                  filter1={eventSummaryFilter1}
                  filter2={eventSummaryFilter2}
                  filter2Value={[data.itemFeatures, data.eventFeatures]}
                  onFilter1Change={setEventSummaryFilter1}
                  onFilter2Change={setEventSummaryFilter2}
                />
              </div>
              <div className="px-5">
                <UserEventBarchart
                  title="Event Activity"
                  data={null}
                  filter1={eventActivityFilter1}
                  onFilter1Change={setEventActivityFilter1}
                />
              </div>
            </div>
            <div className="px-5" ref={interactionRef}>
              <InteractionAreachart
                title="Interaction frequencies"
                data={interactionAreachartData}
                subtitle={`Count of interactions by ${`item_id`}`}
                percentiles={[8, 22, 44, 64, 78]}
                item="item_id"
                height={500}
                width={interactionAreachartWidth}
              />
            </div>
          </div>
        </DashboardTableWrapper>

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
        <DashboardTableWrapper className="max-w-full overflow-x-auto pb-8">
          <div className="px-12">
            <div className="flex justify-between items-center">
              <TitleInfo title="Rank" className="py-12" />
              <div className="flex w-[30%] justify-center">
                <Tabs
                  defaultValue={RecommendationTabEnumNew.Rank}
                  orientation="vertical"
                  onValueChange={(e: any) =>
                    setCurrentTab(e as RecommendationTabEnumNew)
                  }
                >
                  <TabsList aria-label="tabs example" className="bg-white">
                    <CustomTabsTrigger
                      value={RecommendationTabEnumNew.Rank}
                      activeValue={currentTab}
                    >
                      Rank
                    </CustomTabsTrigger>
                    <CustomTabsTrigger
                      value={RecommendationTabEnumNew.Similar}
                      activeValue={currentTab}
                    >
                      Similar
                    </CustomTabsTrigger>
                    <CustomTabsTrigger
                      value={RecommendationTabEnumNew.Search}
                      activeValue={currentTab}
                    >
                      Search
                    </CustomTabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div></div>
            </div>
            {currentTab === RecommendationTabEnumNew.Rank ? (
              <div>
                <ConfigurationCard
                  algorithm={algorithm}
                  diversity={diversity}
                  exploration={exploration}
                  setDiversity={setDiversity}
                  setExploration={setExploration}
                  onAlgorithmChange={setAlgorithm}
                  onDiversityChange={(value: string) => {
                    const intValue = parseInt(value);
                    if (Number.isNaN(intValue)) setDiversity(0);
                    else if (intValue === null) setDiversity(0);
                    else if (intValue < 100 || intValue === 100)
                      setDiversity(intValue);
                    else if (intValue < 0 || intValue === 0) setDiversity(0);
                    else if (intValue > 100) setDiversity(100);
                  }}
                  onExplorationChange={(value: string) => {
                    const intValue = parseInt(value);
                    if (Number.isNaN(intValue)) setExploration(0);
                    else if (intValue === null) setExploration(0);
                    else if (intValue < 100 || intValue === 100)
                      setExploration(intValue);
                    else if (intValue < 0 || intValue === 0) setExploration(0);
                    else if (intValue > 100) setExploration(100);
                  }}
                />

                <div className="px-5">
                  <UserResultsTable resultsData={newResultsData} />
                </div>
              </div>
            ) : currentTab === RecommendationTabEnumNew.Similar ? (
              <div className="text-center">Similar</div>
            ) : (
              <div className="text-center">Search</div>
            )}
          </div>
        </DashboardTableWrapper>
      </div>
    );
};

export default Page;
