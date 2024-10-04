import { ChevronUp } from "lucide-react";
import Nav from "./HomeView/Nav";
import Image from "next/image";

import X from "@/public/illustrations/x.svg";
import Discord from "@/public/illustrations/discord.svg";
import Telegram from "@/public/illustrations/telegram.svg";
import Instagram from "@/public/illustrations/instagram.svg";
import Link from "next/link";

const socials: string[] = [X, Discord, Telegram, Instagram];

const Footer = () => {
  return (
    <section className="flex flex-col gap-28 text-white">
      <div className="sm:grid sm:grid-cols-7 items-center md:px-12 sm:py-32 py-20 sm:px-6 flex sm:flex-col flex-col-reverse gap-4 sm:gap-0">
        <div className="col-span-6 flex items-center justify-center w-full">
          <Nav />
        </div>
        <Link href='#home' className="text-primary-color flex items-center gap-1 sm:ml-auto w-fit sm:text-base text-xs">
          Back to Top <ChevronUp />
        </Link>
      </div>
      <div className="sm:px-10 px-5 py-6 flex sm:flex-row flex-col-reverse items-center sm:justify-between gap-6 sm:gap-0 bg-secondary-color">
        <span className="flex items-center gap-1 sm:text-primary-color text-center text-gray-300">
          <h2 className="sm:text-2xl text-xl">BLINKVERSE</h2>
          <p>
            <span className='sm:text-sm text-xs'> | </span>Powered by Solana Blink
          </p>
        </span>
        <div className="flex items-center gap-2">
          {socials.map((item, index) => (
            <>
              <SocialIcon icon={item} key={item} /> 
              {socials.length - 1  !== index && <span className="sm:text-primary-color text-gray-300 h-5/6"> | </span>}
            </>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Footer;

const SocialIcon = ({ icon }: { icon: string }) => {
  return (
    <div className="border sm:border-primary-color border-gray-300 rounded-lg p-3">
      <Image src={icon} alt="" />
    </div>
  );
};
