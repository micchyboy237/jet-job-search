import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { JobEntity } from "./types";
import { fetchJobEntitiesAtom, jobEntitiesAtom } from "./state";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

// Register the necessary chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const JobEntities: React.FC = () => {
  const [jobEntities, setJobEntities] = useAtom(jobEntitiesAtom);
  const [, fetchJobEntities] = useAtom(fetchJobEntitiesAtom);

  useEffect(() => {
    fetchJobEntities();
  }, [fetchJobEntities]);

  // Group the entities by label
  const labelCounts = jobEntities.reduce((acc, job) => {
    job.entities.forEach((entity) => {
      if (!acc[entity.label]) {
        acc[entity.label] = 0;
      }
      acc[entity.label] += 1;
    });
    return acc;
  }, {} as Record<string, number>);

  // Prepare the data for the chart
  const chartData = {
    labels: Object.keys(labelCounts),
    datasets: [
      {
        label: "Entity Label Counts",
        data: Object.values(labelCounts),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Entity Label Counts Across Jobs",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label;
            const count = context.raw;
            return `${label}: ${count} occurrences`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Entity Label",
        },
      },
      y: {
        title: {
          display: true,
          text: "Count",
        },
        min: 0,
      },
    },
  };

  return (
    <div>
      <h1>Job Entities</h1>

      {/* Chart showing entity label counts */}
      <div style={{ marginBottom: "30px" }}>
        <Bar data={chartData} options={options} />
      </div>

      {/* Displaying the job entities and their grouped labels */}
      <ul>
        {jobEntities.map((job) => (
          <li key={job.id}>
            <h2>{job.id}</h2>
            <p>{job.text}</p>
            <h3>Entities:</h3>
            <ul>
              {job.entities.map((entity, index) => (
                <li key={index}>
                  {entity.label}: {entity.text} (score: {entity.score})
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      {/* Display grouped label counts */}
      <h3>Grouped Entity Labels</h3>
      <ul>
        {Object.entries(labelCounts).map(([label, count]) => (
          <li key={label}>
            {label}: {count} occurrences
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobEntities;
