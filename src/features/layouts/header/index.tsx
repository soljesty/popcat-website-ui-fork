import { FaTelegram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const Header = () => {
  return (
    <header className="relative z-10 flex items-center justify-between container mx-auto mt-2 lg:mt-5 p-1 lg:p-2 rounded-full">
      <a href="/">
        <img
          src="/logo.png"
          alt="Popcats logo"
          className="w-[120px] hidden lg:block cursor-pointer hover:opacity-80 ml-5"
        />
      </a>
      <div className="flex items-center gap-4">
        <div>
          <a href="/" className="">
            <img
              src="https://media.crypto-neet.fr/1695730658-minia-1056x600-plateformes-v3_0000_bybit.webp?auto=format&fit=max&w=1200"
              alt=""
              className="w-[100px] rounded-full cursor-pointer hover:opacity-80"
            />
          </a>
        </div>
        <a
          href="https://solscan.io/token/7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr"
          target="_blank"
        >
          <div className="relative group hidden lg:block">
            <div className="glass delay-200 text-black px-4 lg:px-6 py-2 lg:py-3 cursor-pointer hover:opacity-80 rounded-full text-xs lg:text-xl gap-2 items-center flex text-wrap transition-all duration-300 ease-in-out">
              <span className="group-hover:flex hidden items-center gap-2 w-auto left-0 rounded-md z-10">
                <img
                  src="https://avatars.githubusercontent.com/u/92743431?s=280&amp;v=4"
                  alt=""
                  className="w-5 h-5"
                />
                CA: 7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr
              </span>
              <span className="flex group-hover:hidden items-center gap-2">
                <img
                  src="https://avatars.githubusercontent.com/u/92743431?s=280&amp;v=4"
                  alt=""
                  className="w-5 h-5"
                />
                CA: 7G..hr
              </span>
            </div>
          </div>
        </a>
        <div className="py-6">
          <a
            href="/"
            className="glass p-4 py-5 px-6 cursor-pointer hidden lg:block hover:opacity-80 uppercase font-semibold rounded-[20px]"
          >
            about $popcat
          </a>
        </div>
        <div className="mr-4 flex items-center gap-5">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer hover:opacity-80"
          >
            <FaXTwitter size={24} />
          </a>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer hover:opacity-80"
          >
            <FaTelegram size={24} />
          </a>
        </div>
      </div>
    </header>
  );
};
