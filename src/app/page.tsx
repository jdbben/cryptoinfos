import CoinCart from "@/components/CoinCart";
import SliderComponent from "@/components/SliderComponent";
import { coins } from "@/lib/const";
import {
  getTheCoinHistoryPrice,
  getTheCoinImg,
  getTheCoinPrice,
} from "@/utils/test";

interface CoinData {
  price: string;
  percentageChange: string;
  history: [number, number][];
  image: string;
}
const names = ["BTCUSDT", "ETHUSDT", "BNBUSDT"];
const fetchCoinData = async (name: string): Promise<CoinData> => {
  const [priceData, history, image] = await Promise.all([
    getTheCoinPrice(name),
    getTheCoinHistoryPrice(coins[name], 1),
    getTheCoinImg(coins[name]),
  ]);
  console.log(priceData?.infos.priceChangePercent, coins[name]);
  return {
    price: priceData?.RS.price ?? "00",
    percentageChange: priceData?.infos.priceChangePercent ?? "00",
    history,
    image: image ?? "",
  };
};

const Home = () => {
  return (
    <div className="flex h-screen w-screen justify-center items-center ">
      <div className="h-fit w-screen flex flex-row gap-2">
        {names.map(async (name, index) => (
          <SliderComponent name={name} />
          // <CoinCart
          //   usd={new Intl.NumberFormat("de-DE", {
          //     style: "currency",
          //     currency: "USD",
          //   }).format(Number((await fetchCoinData(name)).price))}
          //   chartData={(await fetchCoinData(name)).history}
          //   name={name}
          //   percentege={(await fetchCoinData(name)).percentageChange}
          //   imgurl={(await fetchCoinData(name)).image}
          //   key={index}
          // />
        ))}
      </div>
    </div>
  );
};

export default Home;
