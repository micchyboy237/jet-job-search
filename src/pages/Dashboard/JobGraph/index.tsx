// src/pages/Dashboard/JobGraph/index.tsx

import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { Scatter } from "react-chartjs-2";
import { vectorNodesAtom, fetchVectorNodesAtom } from "./state";
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
  const [, fetchVectorNodes] = useAtom(fetchVectorNodesAtom);

  useEffect(() => {
    fetchVectorNodes("sample query");
  }, [fetchVectorNodes]);

  const data = {
    datasets: [
      {
        label: "Scores",
        data: vectorNodes.map((node) => ({
          x: node.id,
          y: node.score,
          text: node.text,
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

  return <Scatter data={data} options={options} />;
};

export default JobGraph;
