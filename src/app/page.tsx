"use client";
import CandelChart from "@/components/CandelChart";
import SliderComponent from "@/components/SliderComponent";
import { coins } from "@/lib/const";
import { useScreenSize } from "@/utils/WindowSize";
import { useEffect, useState } from "react";

const names = ["BTCUSDT", "ETHUSDT", "BNBUSDT"];

const Home = () => {
  const [BigChartName, setBigChartName] = useState<string>("BTCUSDT");
  const [chartDAta, setChartData] = useState<[number, number][]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { screenSize, width, height } = useScreenSize();
  const [screenSizeState, setScreenSizeState] = useState(screenSize);
  const [small, setSmall] = useState(screenSize !== "2xl");

  useEffect(() => {
    setSmall(screenSize !== "2xl");
  }, [screenSize]);
  const handleSelectedName = (name: string) => {
    setBigChartName(name);
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const coinName = coins[BigChartName];
        if (!coinName) {
          console.error(`No data found for coin: ${BigChartName}`);
          return;
        }

        const res = await fetch(
          `/api/history?name=${encodeURIComponent(coinName)}`
        );
        if (!res.ok) {
          throw new Error(
            `Failed to fetch data: ${res.status} ${res.statusText}`
          );
        }

        const da = await res.json();
        setChartData(da.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [BigChartName]);

  return (
    <div className="flex h-screen w-screen justify-center items-center flex-col gap-4 pt-11">
      <div className="h-fit w-screen flex flex-row gap-2 lg:pt-[15vh] pl-[10vh]">
        {names.map((name, index) => (
          <div key={index} onClick={() => handleSelectedName(name)}>
            <SliderComponent name={name} key={index} small={small} />
          </div>
        ))}
      </div>

      <div className="h-fit w-screen lg:pr-[10vh] lg:pl-[10vh] pt-[10vh]">
        {isLoading ? (
          <>Loading...</>
        ) : chartDAta ? (
          <>
            <h1 className="flex justify-center items-center">
              {coins[BigChartName].toUpperCase()}
            </h1>
            <CandelChart name={BigChartName} />
          </>
        ) : (
          <>loading</>
        )}
      </div>
    </div>
  );
};

export default Home;
