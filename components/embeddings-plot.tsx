import ScatterChart from "@/app/scatter/(components)/ScatterChart";
import React from "react";

interface EmbeddingProps {
  embeddings: { name: string | number; data: [number, number][] }[];
  dataType: string;
  colors: string[];
}

const EmbeddingsPlot = ({ embeddings, dataType, colors }: EmbeddingProps) => {
  return (
    <div className="flex justify-center items-center">
      <div>
        <ScatterChart data={embeddings} dataType={dataType} colors={colors} />
      </div>
    </div>
  );
};

export default EmbeddingsPlot;
