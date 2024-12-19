"use client";

import { LineChart } from "@mui/x-charts";
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
      throw new Error("No data for the chart: " + err);
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

  if (!graphDAta) return null;
  const xValues = graphDAta.map(([timestamp]) => Number(timestamp));

  const yValues = graphDAta.map(([, price]) => price);

  return (
    <LineChart
      xAxis={[
        {
          data: xValues,
          disableTicks: false,
          disableLine: false,
        },
      ]}
      series={[
        {
          data: yValues,
          showMark: false,
          disableHighlight: false,
        },
      ]}
      width={1100}
      height={500}
      margin={{ bottom: 100 }}
    />
  );
};
export default ChartComponent;
