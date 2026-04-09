"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";

// Import Scene dynamically to avoid SSR issues with Three.js
const Scene = dynamic(() => import("@/components/scene"), { ssr: false });

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-gray-950 text-white font-sans">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Scene />
      </div>

      {/* Blur/Darken Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5, duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-10 bg-gray-950/70 backdrop-blur-sm pointer-events-none"
      />

      {/* UI Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.5, duration: 1.5, ease: "easeOut" }}
          className="max-w-4xl text-center pointer-events-auto flex flex-col items-center"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-widest uppercase mb-8 drop-shadow-lg">
            Power Delivered
          </h1>

          <p className="text-lg md:text-2xl text-gray-300 mb-12 leading-relaxed font-light max-w-3xl drop-shadow-md">
            From turbine to terminal, every electron travels a precise
            engineered path. 440,000 volts are stepped, steered, balanced, and
            translated into the everyday reliability people feel only when it
            works.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-yellow-500 text-gray-950 font-bold uppercase tracking-widest text-sm md:text-base rounded-full hover:bg-yellow-400 transition-colors shadow-[0_0_40px_rgba(234,179,8,0.4)]"
          >
            Back to Home
          </motion.button>
        </motion.div>
      </div>
    </main>
  );
}
