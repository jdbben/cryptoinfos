import { useEffect, useState } from "react";
import { Props } from "./CoinCart";

const CoinsIntrudoser = ({
  usd,
  name,
  percentege,
  imgurl,
}: Omit<Props, "chartData">) => {
  const [green, setGreen] = useState(true);

  useEffect(() => {
    if (parseFloat(percentege) > 0) setGreen(true);
    if (parseFloat(percentege) < 0) setGreen(false);
  }, [percentege]);
  return (
    <div className="bg-slate-100 flex flex-row justify-center items-center h-[80px] min-w-[400px] max-w-[900px] rounded-full p-8 cursor-pointer">
      <div className="flex-none  ">
        <img src={imgurl} alt="" width={50} />
      </div>
      <div className=" w-full pl-5">
        <p>{name}</p>
        <div className="flex flex-row items-center gap-6">
          <p>{usd}</p>
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
    </div>
  );
};

export default CoinsIntrudoser;
