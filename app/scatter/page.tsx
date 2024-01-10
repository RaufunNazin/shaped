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
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <h1>Scatter Chart</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <ScatterChart
            data={data}
            width={maxX}
            height={maxY}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
      <div
        style={{ marginTop: "2px", marginLeft: "50px", textAlign: "center" }}
      >
        <button
          onClick={() => setSelectedCategory("")}
          style={{
            display: "block",
            marginTop: "10px",
            padding: "5px 10px",
            backgroundColor: "lightgray",
            color: "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          All Category
        </button>
        {data.map((category) => (
          <button
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            style={{
              display: "block",
              marginTop: "10px",
              padding: "5px 10px",
              backgroundColor: category.color,
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Page;
