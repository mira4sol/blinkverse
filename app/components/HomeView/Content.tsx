"use client";

import { ArrowRight } from "lucide-react";
import heroBackground from "@/public/images/hero-background.png";
import heroImage from "@/public/images/hero-image.png";
import heroImage2 from "@/public/images/hero-image2.png";
import heroImage3 from "@/public/images/hero-image3.png";
import Image from "next/image";
import { Monda } from "next/font/google";
import { ReactElement } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const monda = Monda({ weight: ["400", "700"], subsets: ["latin"] });

type ContentType = {
  heading: ReactElement;
  image: string;
  style: {objectFit: "cover" | "contain", objectPosition: string}
};

const contents: ContentType[] = [
  {
    heading: (
      <>
        Revolutionising The Social Future <br /> With BlinkVerse
      </>
    ),
    image: heroImage.src,
    style: {
        objectFit: 'cover',
        objectPosition: "75% 5%"
    }
  },
  {
    heading: (
      <>
        What Exactly is <span className="text-primary-color">BlinkVerse</span>{" "}
        About?
      </>
    ),
    image: heroImage2.src,
    style: {
        objectFit: 'cover',
        objectPosition: "75% 5%"
    }
  },
  {
    heading: (
      <>
        Get <span className="text-primary-color">Onboarded</span> With Our
        Simple Step By Step Guide
      </>
    ),
    image: heroImage3.src,
    style: {
        objectFit: 'contain',
        objectPosition: "center"
    }
  },
];

const Content = () => {
  return (
    <section
      className={
        monda.className +
        " px-5 w-full h-full text-white bg-[#110F1FA3] relative flex flex-col justify-between overflow-hidden gap-5"
      }
    >
      <div className="w-full h-full relative">
        <h1 className="tracking-[.7em] mt-10 text-xl bg-gradient-to-r from-[#c498fe] to-[#4e3272] text-transparent bg-clip-text text-center">
          BLINKVERSE
        </h1>
        <Swiper
          loop
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          modules={[Autoplay]}
          className="w-full h-full"
        >
          {contents.map((item, index) => (
            <SwiperSlide key={index}>
              <ContentItem {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="absolute opacity-5 top-0 w-full h-full">
        <Image src={heroBackground.src} alt="" fill />
      </div>
    </section>
  );
};

export default Content;

const ContentItem = ({ heading, image, style }: ContentType) => {
  return (
    <div className="flex flex-col items-center gap-3">
      {" "}
      <h2 className="text-3xl text-center">{heading}</h2>
      <p className="text-center">Create your own tokens with one click!</p>
      <p className="text-center">34, 901 Tokens Created</p>
      <button className="flex items-center">
        <span className="px-4 py-2 bg-primary-color rounded-lg">
          Get Started
        </span>
        <div className="bg-primary-color w-5 h-2" />
        <span className="px-4 py-2 bg-primary-color rounded-lg">
          <ArrowRight />
        </span>
      </button>
      <div className="h-full w-full absolute opacity-55 -z-30">
        <Image
          src={image}
          alt=""
          fill
          style={{ objectFit: style.objectFit, objectPosition: style.objectPosition }}
        />
      </div>
    </div>
  );
};
