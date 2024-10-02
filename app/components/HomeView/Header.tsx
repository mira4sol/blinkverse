"use client";

import Logo from "@/public/images/logo.svg";
import Image from "next/image";

import { Sun } from "lucide-react";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="px-10 pb-10 flex items-center justify-between text-white">
      <Image src={Logo} alt="BlinkVerse Logo" height={100} width={100} />
      <Nav />
      <section className="flex items-center gap-6">
        <button className="bg-secondary-color p-2 rounded-full">
          <Sun color="#B073FF" />
        </button>
        <div className="rounded-lg bg-gradient-to-b p-px from-primary-color to-[#2c1d3e]">
          <button className="rounded-md px-4 py-2 text-primary-color bg-secondary-color">
            Launch App
          </button>
        </div>
      </section>
    </header>
  );
};

export default Header;
