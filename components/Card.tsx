import React from "react";

interface CardProps {
  id: number;
  title: string;
  icon: React.ReactNode;
  subtitle: string;
  time: string;
}

const Card = ({ id, title, icon, subtitle, time }: CardProps) => {
  return (
    <div className="border rounded-2xl p-4 flex flex-col gap-y-4">
      <div className="text-blue-400 text-3xl pl-1">{icon}</div>
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">{title}</div>
        <div className="text-sm text-gray-400">{time}</div>
      </div>
      <div className="text-sm">{subtitle}</div>
    </div>
  );
};

export default Card;
