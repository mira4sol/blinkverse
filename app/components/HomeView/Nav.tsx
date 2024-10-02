"use client";

import Link from "next/link";
import { useState } from "react";

const navList: ("home" | "about")[] = ["home", "about"];
const Nav = () => {
  const [activeNav, setActiveNav] = useState<"home" | "about">("home");
  return (
    <nav>
      <ul className="flex items-center gap-4 text-white">
        {navList.map((item) => (
          <Link
            href={`#${item}`}
            className={`${
              activeNav === item ? "text-primary-color" : "text-white"
            }`}
            onClick={() => setActiveNav(item)}
            key={item}
          >
            {capitalizeFirst(item)}
          </Link>
        ))}
        <li>Create</li>
      </ul>
    </nav>
  );
};

export default Nav;

function capitalizeFirst(string: string) {
  if (string.length === 0) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}
