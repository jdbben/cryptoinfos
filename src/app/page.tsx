"use client";
import SliderComponent from "@/components/SliderComponent";
import { func } from "../../test";
import { useEffect, useState } from "react";
import ChartComponent from "@/components/Chart";
import { coins } from "@/lib/const";
import { ChartEvent } from "chart.js/dist/core/core.plugins";
import { ActiveElement } from "chart.js/dist/plugins/plugin.tooltip";
import BigChart from "@/components/BigChart";

const names = ["BTCUSDT", "ETHUSDT", "BNBUSDT"];

const Home = () => {
  const [BigChartName, setBigChartName] = useState<string>("BTCUSDT");
  const [chartDAta, setChartData] = useState<[number, number][]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSelectedName = (name: string) => {
    setBigChartName(name);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `/api/history?name=${encodeURIComponent(coins[BigChartName])}`
        );

        if (!res.ok) {
          throw new Error(
            `Failed to fetch data: ${res.status} ${res.statusText}`
          );
        }

        const da = await res.json();
        const data = da.data;
        setChartData(data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (BigChartName && coins[BigChartName]) {
      fetchData();
    }
  }, [BigChartName, coins]);

  return (
    <div className="flex h-screen w-screen justify-center items-center flex-col gap-4 pt-11">
      <div className="h-fit w-screen flex flex-row gap-2 lg:pt-[15vh] pl-[10vh]">
        {names.map((name, index) => (
          <div key={index} onClick={() => handleSelectedName(name)}>
            <SliderComponent name={name} key={index} />
          </div>
        ))}
      </div>
      <div className="h-fit w-screen lg:pr-[10vh] lg:pl-[10vh]">
        {isLoading ? (
          <>Loading...</>
        ) : chartDAta ? (
          <>
            <h1 className="flex justify-center items-center">
              {coins[BigChartName].toUpperCase()}
            </h1>
            <BigChart chartData={chartDAta} green={true} x={true} y={true} />
          </>
        ) : (
          <>loading</>
        )}
      </div>
    </div>
  );
};

export default Home;
