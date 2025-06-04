"use client";
import dynamic from "next/dynamic";

const TravelsMap = dynamic(() => import("./TravelsMap"), { ssr: false });

export default TravelsMap;
