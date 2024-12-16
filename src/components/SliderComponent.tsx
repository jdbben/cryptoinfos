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

export default function SliderComponent({ name }: { name: string }) {
  return <CoinWrapper name={name} />;
}

const CoinWrapper = ({ name }: { name: string }) => {
  const [data, setData] = useState<CoinData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
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
    const interval = setInterval(fetchData, 400000);
    return () => clearInterval(interval);
  }, [name]);

  useEffect(() => {
    const updatePriceAndChange = async () => {
      try {
        if (data) {
          const priceData = await getTheCoinPrice(name);
          setData((prevData) => ({
            ...prevData!,
            price: priceData?.RS.price ?? "00",
            percentageChange: priceData?.infos.priceChangePercent ?? "00",
          }));
        }
      } catch (err) {
        console.error(`Error updating price and percentage for ${name}:`, err);
      }
    };

    const priceInterval = setInterval(updatePriceAndChange, 1000);
    return () => clearInterval(priceInterval);
  }, [name, data]);

  useEffect(() => {
    const updateImage = async () => {
      try {
        const image = await getTheCoinImg(coins[name]);
        setData((prevData) => ({
          ...prevData!,
          image: image ?? "",
        }));
      } catch (err) {
        console.error(`Error fetching image for ${name}:`, err);
      }
    };

    if (data && !data.image) {
      updateImage();
    }
  }, [name, data?.image]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!data) {
    return <p>Failed to load data</p>;
  }

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
