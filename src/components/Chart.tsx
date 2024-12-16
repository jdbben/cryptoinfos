"use client";

import { cn } from "@/lib/utils";
import { Chart } from "chart.js/auto";
import { useEffect, useRef, useState } from "react";

type Props = {
  chartData: [number, number][];
  green: boolean;
  className?: string;
  x?: boolean;
  y?: boolean;
};

const ChartComponent = ({ chartData, green, className, x, y }: Props) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [graphDAta, setgraphDAta] = useState<[number, number][] | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [greenColor, setgreenColor] = useState("");
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
    if (green) {
      setgreenColor("rgba(75, 192, 192, 1)");
    }
    if (!green) {
      setgreenColor("rgba(255, 0, 0, 0.8)");
    }
  }, [green]);
  useEffect(() => {
    if (!chartRef.current) return;
    if (!graphDAta) return;
    const xValues = graphDAta.map(([timestamp]) =>
      new Date(timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        day: "numeric",
        month: "short",
        year: "numeric",
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
            borderColor: greenColor,
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
              display: x ?? false,
            },
            grid: {
              display: false,
            },
            title: {
              display: x ?? false,
              text: "Time",
            },
          },
          y: {
            ticks: {
              display: y ?? x ?? false,
            },
            grid: {
              display: false,
            },
            title: {
              display: y ?? false,
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
      <canvas
        ref={chartRef}
        className={cn(`w-full h-full mb-8  `, className)}
      />
    </div>
  );
};

export default ChartComponent;
