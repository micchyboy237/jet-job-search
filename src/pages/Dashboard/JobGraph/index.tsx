import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { Scatter } from "react-chartjs-2";
import { vectorNodesAtom } from "./state";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import Card from "../../../components/Card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const JobGraph: React.FC = () => {
  const [vectorNodes] = useAtom(vectorNodesAtom);

  const data = {
    datasets: [
      {
        label: "Scores",
        data: vectorNodes.map((node) => ({
          x: node.id,
          y: node.score,
          text: node.description,
        })),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        pointRadius: 5,
      },
    ],
  };

  const options: ChartOptions<"scatter"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "VectorNode Scores",
      },
      tooltip: {
        mode: "nearest",
        intersect: true,
        callbacks: {
          label: (context) => {
            const point = context.raw;
            return `Score: ${point.y}\nText: ${point.text}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Node ID",
        },
      },
      y: {
        type: "linear",
        title: {
          display: true,
          text: "Score",
        },
      },
    },
  };

  return (
    <Card title={`Vector Graph (${vectorNodes.length})`}>
      <Scatter data={data} options={options} />
    </Card>
  );
};
export default JobGraph;
