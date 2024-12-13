"use client";

import { Chart } from "chart.js/auto";
import { useEffect, useRef, useState } from "react";

const ChartComponent = ({ chartData }: { chartData: [number, number][] }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [graphDAta, setgraphDAta] = useState<[number, number][] | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    try {
      setgraphDAta(chartData);
    } catch (err) {
      throw new Error("no data for the chart " + err);
    } finally {
      setIsLoading(false);
    }
  }, [chartData]);
  useEffect(() => {
    if (!chartRef.current) return;
    if (!graphDAta) return;
    const xValues = graphDAta.map(([timestamp]) =>
      new Date(timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
    const yValues = graphDAta.map(([, price]) => price);

    const chartInstance = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels: xValues,
        datasets: [
          {
            data: yValues,
            fill: false,
            pointRadius: 0.1,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            tension: 0.000000001,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            ticks: {
              display: false,
            },
            grid: {
              display: false,
            },
            title: {
              display: false,
              text: "Time",
            },
          },
          y: {
            ticks: {
              display: false,
            },
            grid: {
              display: false,
            },
            title: {
              display: false,
              text: "Price",
            },
          },
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [graphDAta]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <canvas ref={chartRef} className="w-full h-full mb-8  " />
    </div>
  );
};

export default ChartComponent;
