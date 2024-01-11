"use client";
import React, { useState } from "react";
import ScatterChart from "./(components)/ScatterChart";

const Page = () => {
  const data = [
    {
      name: "Category A",
      points: Array.from({ length: 1000 }, () => ({
        x: Math.random() * 800,
        y: Math.random() * 600,
      })),
      color: "red",
    },
    {
      name: "Category B",
      points: Array.from({ length: 1000 }, () => ({
        x: Math.random() * 800,
        y: Math.random() * 600,
      })),
      color: "green",
    },
    {
      name: "Category C",
      points: Array.from({ length: 1000 }, () => ({
        x: Math.random() * 800,
        y: Math.random() * 600,
      })),
      color: "blue",
    },
    {
      name: "Category D",
      points: Array.from({ length: 1000 }, () => ({
        x: Math.random() * 800,
        y: Math.random() * 600,
      })),
      color: "orange",
    },
    {
      name: "Category E",
      points: Array.from({ length: 1000 }, () => ({
        x: Math.random() * 800,
        y: Math.random() * 600,
      })),
      color: "purple",
    },
    {
      name: "Category F",
      points: Array.from({ length: 1000 }, () => ({
        x: Math.random() * 800,
        y: Math.random() * 600,
      })),
      color: "pink",
    },
    {
      name: "Category G",
      points: Array.from({ length: 1000 }, () => ({
        x: Math.random() * 800,
        y: Math.random() * 600,
      })),
      color: "cyan",
    },
    {
      name: "Category H",
      points: Array.from({ length: 1000 }, () => ({
        x: Math.random() * 800,
        y: Math.random() * 600,
      })),
      color: "brown",
    },
    {
      name: "Category I",
      points: Array.from({ length: 1000 }, () => ({
        x: Math.random() * 800,
        y: Math.random() * 600,
      })),
      color: "yellow",
    },
    {
      name: "Category J",
      points: Array.from({ length: 1000 }, () => ({
        x: Math.random() * 800,
        y: Math.random() * 600,
      })),
      color: "gray",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("");

  const allPoints = data.reduce(
    (points, category) => [...points, ...category.points],
    [] as { x: number; y: number }[]
  );
  const maxX = Math.max(...allPoints.map((point) => point.x));
  const maxY = Math.max(...allPoints.map((point) => point.y));

  return (
    <div
      className="flex justify-center items-center"
    >
      <div>
        <ScatterChart
          data={data}
          width={maxX}
          height={maxY}
          selectedCategory={selectedCategory}
        />
      </div>
      <div
        className="my-2 ml-12 text-center"
      >
        <button onClick={() => setSelectedCategory("")}>
          <div className="flex items-center">
            <div
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: "lightgray" }}
            ></div>
            <div>All Categories</div>
          </div>
        </button>
        <div className="flex flex-col gap-y-2">
          {data.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
            >
              <div className="flex items-center">
                <div
                  className="w-4 h-4 rounded-full mr-2"
                  style={{ backgroundColor: category.color }}
                ></div>
                <div>{category.name}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
