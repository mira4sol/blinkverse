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
      <div className="grid grid-cols-7 items-center px-12 py-32">
        <div className="col-span-6 flex items-center justify-center w-full">
          <Nav />
        </div>
        <Link href='#home' className="text-primary-color flex items-center gap-1 ml-auto w-fit">
          Back to Top <ChevronUp />
        </Link>
      </div>
      <div className="px-10 py-6 flex items-center justify-between bg-secondary-color">
        <span className="flex items-center gap-1">
          <h2 className="text-2xl text-primary-color">BLINKVERSE</h2>
          <p>
            <span className='text-primary-color text-sm'> | </span>Powered by Solana Blink
          </p>
        </span>
        <div className="flex items-center gap-2">
          {socials.map((item, index) => (
            <>
              <SocialIcon icon={item} key={item} /> 
              {socials.length - 1  !== index && <span className="text-primary-color h-5/6"> | </span>}
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
    <div className="border border-primary-color rounded-lg p-3">
      <Image src={icon} alt="" />
    </div>
  );
};
