"use client";

import Logo from "@/public/images/logo.svg";
import Image from "next/image";

import { Sun } from "lucide-react";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="sm:px-10 px-5 sm:pb-10 pb-5 flex items-center justify-between text-white">
      <div className="relative sm:w-32 sm:h-32 w-14 h-14">
      <Image src={Logo} alt="BlinkVerse Logo" fill />
      </div>
      <span className="sm:block hidden"><Nav /></span>
      <section className="flex items-center gap-6">
        <button className="bg-secondary-color p-2 rounded-full">
          <Sun color="#B073FF" />
        </button>
        <div className="rounded-lg bg-gradient-to-b p-px from-primary-color to-[#2c1d3e]">
          <button className="rounded-md px-4 py-2 text-primary-color bg-secondary-color sm:text-base text-xs">
            Launch App
          </button>
        </div>
      </section>
    </header>
  );
};

export default Header;
