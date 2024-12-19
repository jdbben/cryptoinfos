"use client";
import ApexCharts from "apexcharts";
import { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TIMEINTERVAL } from "@/lib/const";
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";

type ChartCandleData = {
  OpenTime: number;
  OpenPrice: string;
  HighPrice: string;
  LowPrice: string;
  ClosePrice: string;
};
type TimeInterval = (typeof TIMEINTERVAL)[number];

const CandelChart = ({ name }: { name: string }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [chartData, setChartData] = useState<ChartCandleData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [timeInrval, setTimeInterval] = useState<TimeInterval>("1h");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `/api/historyCandle?name=${encodeURIComponent(
            name
          )}&interval=${encodeURIComponent(timeInrval)}`
        );

        if (!res.ok) {
          throw new Error(
            `Failed to fetch data: ${res.status} ${res.statusText}`
          );
        }

        const da = await res.json();
        const data = da.data;

        const formattedData: ChartCandleData[] = data.map((item: any) => ({
          OpenTime: item[0],
          OpenPrice: item[1],
          HighPrice: item[2],
          LowPrice: item[3],
          ClosePrice: item[4],
        }));

        setChartData(formattedData);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (name) fetchData();
  }, [name, timeInrval]);

  useEffect(() => {
    if (!chartRef.current || chartData.length === 0) return;

    const candleSeries = chartData.map((item) => ({
      x: new Date(item.OpenTime),
      y: [
        parseFloat(item.OpenPrice),
        parseFloat(item.HighPrice),
        parseFloat(item.LowPrice),
        parseFloat(item.ClosePrice),
      ],
    }));

    const options = {
      series: [
        {
          name: "Candle",
          type: "candlestick",
          data: candleSeries,
        },
      ],
      chart: {
        height: 350,
        type: "candlestick",
      },
      title: {
        text: { name },
        align: "left",
      },
      xaxis: {
        type: "datetime",
      },
      tooltip: {
        shared: true,
        custom: [
          function ({ seriesIndex, dataPointIndex, w }: any) {
            const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
            const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
            const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
            const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
            return (
              '<div class="apexcharts-tooltip-candlestick">' +
              '<div>Open: <span class="value">' +
              o +
              "</span></div>" +
              '<div>High: <span class="value">' +
              h +
              "</span></div>" +
              '<div>Low: <span class="value">' +
              l +
              "</span></div>" +
              '<div>Close: <span class="value">' +
              c +
              "</span></div>" +
              "</div>"
            );
          },
        ],
      },
    };

    const chartInstance = new ApexCharts(chartRef.current, options);
    chartInstance.render();

    return () => {
      chartInstance.destroy();
    };
  }, [chartData]);

  return (
    <div className="h-[50%] w-screen flex justify-center items-center flex-col">
      <div className=" h-fit w-fit flex flex-row gap-5 items-center">
        <p>Time Interval :</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{timeInrval}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup
              value={timeInrval}
              onValueChange={(value) => setTimeInterval(value as TimeInterval)}
            >
              {TIMEINTERVAL.map((Interval) => (
                <DropdownMenuRadioItem value={Interval}>
                  {Interval}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isLoading ? (
        <>Loading...</>
      ) : chartData.length > 0 ? (
        <div className="flex flex-col">
          <div ref={chartRef} className="h-full w-screen"></div>
        </div>
      ) : (
        <>No data found</>
      )}
    </div>
  );
};

export default CandelChart;
