"use client";

import { Header } from "@features/layouts";
import { getCountryFromCoordinates } from "@utils/reverseGeocode";
import clsx from "clsx";
import { Fragment, useEffect, useState } from "react";

const apiKey = "12677d6bf5224b5c9771e26df4b34bf5";

interface ITokenList {
  code: string;
  country: string;
  count: number;
}

export interface ICountryInfo {
  country: string;
  country_code: string;
}

export default function Home() {
  const [counter, setCounter] = useState<number>(0);
  const [click, setClick] = useState<boolean>(false);
  const [openList, setOpenList] = useState<boolean>(false);
  const [tokenInfoList, setTokenInfoList] = useState<ITokenList[]>([]);
  const [countryInfo, setCountryInfo] = useState<ICountryInfo>();
  const [totalToken, setTotalToken] = useState<number>(0);

  useEffect(() => {
    fetchUsers();
    getLocation();
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const country = await getCountryFromCoordinates(
            latitude,
            longitude,
            apiKey
          );
          setCountryInfo({
            country_code: country.country_code.toUpperCase(),
            country: country.country,
          });
        } catch (error) {}
      });
    } else {
    }
  };

  const fetchUsers = async () => {
    const response = await fetch("/api/tokeninfo");
    const data = await response.json();
    const total = data.reduce(
      (sum: number, item: ITokenList) => sum + item.count,
      0
    );
    setTotalToken(total);
    setTokenInfoList(data);
  };

  const addTokenInfoList = async (tokenInfo: ITokenList) => {
    await fetch("/api/tokeninfo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tokenInfo),
    });
    fetchUsers();
  };

  useEffect(() => {
    if (countryInfo) {
      addTokenInfoList({
        code: countryInfo.country_code,
        country: countryInfo.country,
        count: counter,
      });
    }
  }, [counter]);

  const incrementHandle = () => {
    setCounter((prev) => prev + 1);
  };

  return (
    <>
      <main className="flex bg-[url('/bg.png')] flex-col bg-no-repeat w-full h-[100vh] overflow-hidden items-stretch bg-cover bg-[70%] lg:bg-center relative px-5 lg:px-0">
        <Header />
        <div
          className="h-full flex-1 relative z-10 cursor-pointer"
          onMouseDown={() => setClick(true)}
          onMouseUp={() => setClick(false)}
          onClick={incrementHandle}
        >
          <div className="text-white text-[4em] lg:text-[8em] text-center font-extrabold mt-0">
            <img
              src="/popcat.webp"
              alt=""
              className="w-[400px] mb-20 mx-auto"
            />
          </div>
          <div className="text-white text-[5em] text-center font-extrabold -mt-20">
            <div
              className={clsx(
                "head [text-shadow:rgba(0,0,0,0.7)_1px_8px_0]",
                click && "counterAnimation"
              )}
            >
              {counter}
            </div>
          </div>
        </div>
        <div
          className={clsx(
            "absolute left-0 right-0 bottom-0 bg-cover w-auto h-auto md:w-[650px] md:h-[650px] mx-auto lg:bg-center",
            !click ? "img-show" : "img-hidden"
          )}
        >
          <img src="/mouth-closed.png" alt="" />
        </div>
        <div
          className={clsx(
            "absolute left-0 right-0 bottom-0 bg-cover w-auto h-auto md:w-[650px]  md:h-[650px] mx-auto lg:bg-center",
            click ? "img-show" : "img-hidden"
          )}
        >
          <img src="/mouth-open.png" alt="" />
        </div>
        <div className="px-5 lg:px-0 relative z-20">
          <div className="glass text-[#262221] fixed uppercase w-[90%] lg:w-[800px] bottom-10 lg:bottom-5 left-0 right-0 rounded-lg border-4 border-white mx-auto">
            <div>
              <div>
                <div
                  className="cursor-pointer transition-all delay-75 flex items-center justify-between text-2xl font-bold"
                  onClick={() => setOpenList(!openList)}
                >
                  {openList ? (
                    <div className="relative w-full">
                      <div className="text-center relative text-2xl p-4 justify-center flex items-center w-full border-b-[3px] border-white/20">
                        Leaderboard
                        <img
                          src="/arrowdown.png"
                          className="-mt-1 w-8 absolute right-0 rotate-100"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full p-5 flex items-center justify-between">
                      <div className="">Total Pops</div>
                      <div className="flex items-center justify-center gap-2 ">
                        <div className="">{totalToken}</div>
                        <img
                          src="/arrowdown.png"
                          alt=""
                          className="-mt-1 w-8"
                        />
                      </div>
                    </div>
                  )}
                </div>
                {openList && (
                  <div className="transition-all delay-75 [transition:height_0.6s_ease_0]">
                    <div className="w-full">
                      <div className="p-5 text-xl font-bold border-b w-full justify-between flex items-center border-black border-opacity-10">
                        <div className="">Total Pops</div>
                        <div>{totalToken}</div>
                      </div>
                      <div className="overflow-scroll h-[290px]">
                        {tokenInfoList.map((country, index) => (
                          <div
                            className="p-3 border-b text-xl w-full justify-between flex items-center border-black border-opacity-10"
                            key={index}
                          >
                            <div className="flex items-center gap-4">
                              <div className="flex text-2xl w-[40px] items-center justify-center">
                                {index < 3 ? (
                                  <img
                                    src={
                                      index === 0
                                        ? "/first.svg"
                                        : index === 1
                                        ? "/second.svg"
                                        : "/third.svg"
                                    }
                                    alt=""
                                    className="w-7"
                                  />
                                ) : (
                                  <div>{index + 1}</div>
                                )}
                              </div>
                              <img
                                src={`https://flagsapi.com/${country.code}/flat/64.png`}
                                alt=""
                                className="w-10 rounded-xl"
                              />
                              {country.country}
                            </div>
                            <div className="flex items-center gap-2">
                              {country.count}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
