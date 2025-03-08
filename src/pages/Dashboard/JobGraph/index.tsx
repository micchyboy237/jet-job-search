import React, { useState } from "react";
import { useAtom } from "jotai";
import { Scatter } from "react-chartjs-2";
import { vectorNodesAtom } from "../JobSearch/state";
import Button from "../../../components/Button";
import ToggleButton from "../../../components/ToggleButton";
import styled from "styled-components";
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

const GraphWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FilterControls = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const JobGraph: React.FC = () => {
  const [vectorNodes] = useAtom(vectorNodesAtom);
  const [graphMode, setGraphMode] = useState<"scores" | "dates">("scores");

  const data = {
    datasets: [
      {
        label: graphMode === "scores" ? "Scores" : "Posted Dates",
        data: vectorNodes.map((node) => ({
          x: graphMode === "scores" ? node.id : node.posted_date,
          y:
            graphMode === "scores"
              ? node.score
              : new Date(node.posted_date).getTime(),
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
        text: graphMode === "scores" ? "VectorNode Scores" : "Posted Dates",
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
        type: graphMode === "scores" ? "category" : "time",
        title: {
          display: true,
          text: graphMode === "scores" ? "Node ID" : "Posted Date",
        },
      },
      y: {
        type: "linear",
        title: {
          display: true,
          text: graphMode === "scores" ? "Score" : "Date",
        },
      },
    },
  };

  return (
    <Card title={`Vector Graph (${vectorNodes.length})`}>
      <GraphWrapper>
        <FilterControls>
          <ToggleButton
            options={["scores", "dates"]}
            onChange={(value) => setGraphMode(value as "scores" | "dates")}
          />
          <Button variant="outline">Refresh</Button>
        </FilterControls>
        <Scatter data={data} options={options} />
      </GraphWrapper>
    </Card>
  );
};

export default JobGraph;
