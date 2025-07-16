"use client";

import { useState } from "react";

export default function MovieOverview({ overview }: { overview: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <p
      className="absolute bottom-5 right-5 w-3/10 float-right bg-[rgba(15,15,15,0.5)] p-4 rounded-2xl text-white text-md max-sm:hidden cursor-pointer 
      transition duration-500 hover:bg-[rgba(15,15,15,0.9)]
      "
      onClick={() => setExpanded(!expanded)}
    >
      {expanded ? overview : `${overview.substring(0, 100)}...`}
    </p>
  );
}
