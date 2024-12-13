"use client";
import CoinCart from "@/components/CoinCart";
import { coins } from "@/lib/const";
import {
  getTheCoinHistoryPrice,
  getTheCoinImg,
  getTheCoinPrice,
} from "@/utils/test";
import { useEffect, useState } from "react";
interface CoinData {
  price: string;
  percentageChange: string;
  history: [number, number][];
  image: string;
}
const names = ["BTCUSDT", "ETHUSDT", "BNBUSDT"];
const fetchCoinData = async (name: string) => {
  const [priceData, history, image] = await Promise.all([
    getTheCoinPrice(name),
    getTheCoinHistoryPrice(coins[name], 1),
    getTheCoinImg(coins[name]),
  ]);
  return {
    price: priceData?.RS.price ?? "00",
    percentageChange: priceData?.infos.priceChangePercent ?? "00",
    history,
    image: image ?? "",
  };
};

export default function SliderComponent() {
  return (
    <div className="flex h-screen w-screen justify-center items-center ">
      <div className="h-fit w-screen flex flex-row gap-2">
        {names.map((name, index) => (
          <CoinWrapper name={name} key={index} />
        ))}
      </div>
    </div>
  );
}

const CoinWrapper = ({ name }: { name: string }) => {
  const [data, setData] = useState<CoinData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedData = await fetchCoinData(name);
        setData(fetchedData);
      } catch (err) {
        setError(`Failed to fetch data for ${name}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [name]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!data) {
    return <p>Failed to load data</p>;
  }

  const func = () => {
    return (
      <div>
        <CoinCart
          key={name}
          usd={new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "USD",
          }).format(Number(data.price))}
          name={name}
          percentege={`${data.percentageChange}%`}
          imgurl={data.image}
          chartData={data.history}
        />
      </div>
    );
  };

  return <p>Loading...</p>;
};
