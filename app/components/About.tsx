import Image from "next/image";
import blinks from "@/public/images/about-blink.png";
import funding from "@/public/images/about-funding.png";
import donations from "@/public/images/about-donations.png";
import token from "@/public/images/about-token.png";
import sales from '@/public/images/about-sales.png'
import social from '@/public/images/about-social.png'

import { Monda } from "next/font/google";
const monda = Monda({weight: ['400', '700'], subsets: ['latin']})

const AboutContent: {
  heading: string;
  body: React.JSX;
  image: string;
  objectPosition?: string;
  imageSize: string;
  objectFit?: "contain" | "cover";
  gridSpan?: string;
  position?: 'row' | 'col'
}[] = [
  {
    heading: "Create Blinks",
    body: (
      <>
        Easily create and share Blinks for <br /> various use cases
      </>
    ),
    image: blinks.src,
    objectPosition: "60%",
    imageSize: "h-72",
    gridSpan: "row-span-2 col-span-2",
    position: 'col'
  },
  {
    heading: "Crowd Funding",
    body: (
      <>
        Launch instant crowdfunding <br /> campaigns
      </>
    ),
    image: funding.src,
    objectPosition: "right",
    imageSize: "h-36 aspect-[1/1]",
    objectFit: "contain",
    position: 'col',
    gridSpan: 'col-span-2'
  },
  {
    heading: "Donations",
    body: (
      <>
        Facilitate effortless donations <br /> on-chain
      </>
    ),
    image: donations.src,
    imageSize: "aspect-[1.3/1] h-52 flip-image",
    position: 'col',
    gridSpan: 'col-span-2'
  },
  {
    heading: "Token Swaps",
    body: (
      <>
        Easily create and share Blinks for <br /> various use cases
      </>
    ),
    image: token.src,
    imageSize: "h-full aspect-[1/1]",
    gridSpan: "col-span-4",
    objectFit: 'cover',
    position: 'row'
  },
  {
    heading: 'Nft Sales',
    body: <>Streamline NFT sales and <br/> marketplace interactions</>,
    image: sales.src,
    imageSize: 'w-full max-h-32 aspect-[2/1]',
    position: 'col',
    gridSpan: 'col-span-3',
    objectFit: 'cover',
    objectPosition: '50% 70%'
  },{
    heading: 'Social Integration',
    body: <>Enhance social media with an <br/>on-chain actions</>,
    image: social.src,
    imageSize: 'h-full aspect-[1/1]',
    position: 'row',
    objectFit: 'cover',
    gridSpan: 'col-span-3',
  }
];

const About = () => {
  return (
    <section className="text-white px-5 py-10 w-full flex items-center flex-col gap-6">
      <div className="flex items-center gap-1 justify-center">
        <h2 className={monda.className + " text-2xl"}>ABOUT BLINKVERSE</h2>
        <h3 className="text-primary-color">| What we are all about</h3>
      </div>
      <p className="w-1/2 min-w-[300px] max-w-[500px] text-center text-sm opacity-80">
        BlinkVerse is built on Solana's Blink protocol by Dialect transforming
        complex blockchain operations into user-friendly "Blinks". We're making
        web3 accessbible to everyone in the Solana ecosystem.
      </p>
      <div className="grid gap-3 grid-cols-6 grid-rows-3 w-5/6 min-w-[300px] max-w-[1300px]">
        {AboutContent.map((item) => (
          <AboutCard {...item} key={item.heading} />
        ))}
      </div>
    </section>
  );
};

export default About;

const AboutCard = ({
  gridSpan,
  heading,
  body,
  image,
  imageSize,
  objectPosition,
  objectFit,
  position = "row",
}: {
  heading: string;
  body: string;
  image: string;
  objectPosition?: string;
  imageSize: string;
  objectFit?: "contain" | "cover";
  gridSpan?: string;
  position: "col" | "row";
}) => {
  return position === "col" ? (
    <div
      className={
        "flex flex-col justify-between border border-primary-color bg-black rounded-md py-5 " +
        gridSpan
      }
    >
      <h4 className="pl-3">{heading}</h4>
      <div className={"relative " + imageSize}>
        <Image
          fill
          alt=""
          src={image}
          objectPosition={objectPosition}
          objectFit={objectFit}
        />
      </div>
      <p className="px-3">{body}</p>
    </div>
  ) : (
    <div
      className={
        "flex items-center justify-between border border-primary-color bg-black rounded-md py-5 " +
        gridSpan
      }
    >
      <span className="h-full flex flex-col justify-between">
        <h4 className="pl-3">{heading}</h4>

        <p className="px-3">{body}</p>
      </span>
      <div className={"relative " + imageSize}>
        <Image
          fill
          alt=""
          src={image}
          objectPosition={objectPosition}
          objectFit={objectFit}
        />
      </div>
    </div>
  );
};
