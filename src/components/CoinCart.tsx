import { useEffect, useState } from "react";
import ChartComponent from "./Chart";

type Props = {
  usd: string;
  name: string;
  percentege: string;
  imgurl?: string | undefined;
  chartData: [number, number][];
};

const CoinCart = ({ usd, name, percentege, imgurl, chartData }: Props) => {
  const [ChartDataState, setChartDataState] = useState<
    [number, number][] | null
  >(null);

  const [green, setGreen] = useState(true);

  useEffect(() => {
    if (parseFloat(percentege) > 0) setGreen(true);
    if (parseFloat(percentege) < 0) setGreen(false);
  }, [percentege]);

  useEffect(() => {
    setChartDataState(chartData);
  }, [chartData]);

  return (
    <div className="h-[160px] w-[180px] rounded-xl border-2 border-grey-100 flex flex-col overflow-hidden relative cursor-pointer">
      <div className="h-[50%] w-full pl-2 pt-2">
        <div className="flex flex-row items-center gap-2">
          {imgurl ? (
            <img src={imgurl} width={25} alt={`${name}logo`} />
          ) : (
            <p>loading...</p>
          )}

          <p>{name}</p>
        </div>
        <div className="flex flex-col justify-center h-fit">
          {usd ? (
            <>
              <p>{usd}</p>
            </>
          ) : (
            <p>loading...</p>
          )}
          {percentege ? (
            green ? (
              <>
                <p className="text-green-600">{percentege}</p>
              </>
            ) : (
              <>
                <p className="text-red-600">{percentege}</p>
              </>
            )
          ) : (
            <>
              <p>Loading...</p>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center h-[50%] w-full mt-4">
        {ChartDataState?.length ? (
          <ChartComponent chartData={ChartDataState} key={name} green={green} />
        ) : (
          <p>loading...</p>
        )}
        <p className="text-slate-300 text-sm absolute bottom-0">1 day</p>
      </div>
    </div>
  );
};

export default CoinCart;
