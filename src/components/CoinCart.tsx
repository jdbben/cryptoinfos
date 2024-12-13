"use client";
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
  return (
    <div className="h-[160px] w-[180px] rounded-xl border-2 border-grey-100 flex flex-col overflow-hidden relative ">
      <div className="h-[50%] w-full pl-2 pt-2 ">
        <div className="flex flex-row items-center gap-2">
          {imgurl ? (
            <img src={imgurl} width={25} alt={`${name}logo`} />
          ) : (
            <>
              <p>loading...</p>
            </>
          )}

          <p>{name}</p>
        </div>
        <div className="flex flex-col justify-center h-fit">
          {usd && percentege ? (
            <>
              {" "}
              <p>{usd}</p>
              <p>{percentege}</p>
            </>
          ) : (
            <>
              <p>loading...</p>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center h-[50%] w-full  mt-4 ">
        {chartData ? (
          <ChartComponent chartData={chartData} key={name} />
        ) : (
          <>
            <p>loading...</p>
          </>
        )}

        <p className="text-slate-300 text-sm absolute bottom-0">1 day</p>
      </div>
    </div>
  );
};

export default CoinCart;
