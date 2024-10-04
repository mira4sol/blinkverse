import { Monda } from "next/font/google";
import Image from "next/image";
import React from "react";

import Launch from '@/public/illustrations/launch.svg'
import Editor from '@/public/illustrations/editor.svg'
import Preview from '@/public/illustrations/preview.svg'

const monda = Monda({ weight: ["400", "700"], subsets: ["latin"] });

const content: { icon: string; heading: string; body: React.JSX | string }[] = [
  {
    icon: Launch,
    heading: "Launch the app",
    body: (
      <>
        Go ahead and click on the <span className="text-primary-color">Launch App</span> button and it will
        direct you to the <span className="text-primary-color">Blink Editor</span> dashboard
      </>
    ),
  },
  {
    icon: Editor,
    heading: "Use blink editor",
    body: "Input all the necessary information for your BlinkVerse card and select the category you want",
  },
  {
    icon: Preview,
    heading: "Preview and create",
    body: "Preview your card and create the Blink if you're satisfied with how it looks. Now you can share that Blink!",
  },
];

const HowToUse = () => {
  return (
    <section className="text-white px-36 py-10 w-full flex flex-col gap-10 items-center">
      <div className="w-full">
        <div className="flex items-center gap-1">
          <h2 className={monda.className + " text-2xl"}>
            HOW TO USE BLINKVERSE
          </h2>
          <h3 className="text-primary-color">
            | Let's get you started with BlinkVerse
          </h3>
        </div>
        <p>
          This is a simple onboarding for those who might be struggling with how
          to use Blinkverse
        </p>
        <p>We've got you covered. It's super simple</p>
      </div>
      <div className="flex gap-4 items-center">
        {content.map((item, index) => (
          <HowToUseCard {...item} key={item.heading} purple={index === 1} />
        ))}
      </div>
      <button className="px-6 py-2 bg-gradient-to-tl bg-primary-color w-fit rounded-lg">
        Launch App
      </button>
    </section>
  );
};

export default HowToUse;

const HowToUseCard = ({
  icon,
  heading,
  body,
  purple,
}: {
  icon: string;
  heading: string;
  body: React.JSX | string;
  purple?: boolean;
}) => {
  const style = purple
    ? "bg-gradient-to-tl from-[#b073ff] to-[#5c2c9a]"
    : "border border-primary-color";
  return (
    <div className={style + " rounded-lg p-8 flex flex-col gap-4"}>
      <div className="p-3 rounded-lg border border-primary-color w-fit">
        <Image src={icon} alt="" />
      </div>
      <h4 className="text-xl">{heading}</h4>
      <p className="text-sm">{body}</p>
    </div>
  );
};
