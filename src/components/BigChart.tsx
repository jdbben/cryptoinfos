import { cn } from "@/lib/utils";
import { LineChart } from "@mui/x-charts";
import React, { useEffect, useState } from "react";

type Props = {
  chartData: [number, number][];
  green: boolean;
  className?: string;
  x?: boolean;
  y?: boolean;
};

const BigChart = ({ chartData, green, className, x, y }: Props) => {
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

  const formattedData = xValues.map((x, index) => ({
    x: new Date(x),
    y: yValues[index],
  }));

  return (
    <LineChart
      dataset={formattedData}
      xAxis={[
        {
          id: "price",
          dataKey: "x",
          scaleType: "time",
          valueFormatter: (x) => x.toString(),
        },
      ]}
      series={[
        {
          data: yValues,
          showMark: false,
        },
      ]}
      className={cn(`w-full `, className)}
      height={500}
      margin={{ left: 70 }}
      grid={{ vertical: true, horizontal: true }}
    />
  );
};

export default BigChart;
