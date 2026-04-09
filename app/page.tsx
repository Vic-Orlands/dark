"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useSpring,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "motion/react";
import { Infinity } from "lucide-react";

type NodeType = "person" | "marriage";

type Node = {
  id: string;
  type: NodeType;
  x: number;
  y: number;
  name?: string;
  image?: string;
  details?: string;
};

type Edge = {
  id: string;
  source: string;
  target: string;
  type: "solid" | "dashed";
};

const NODE_W = 100;
const NODE_H = 140;

const nodes: Node[] = [
  // Generation 1 (Top)
  {
    id: "egon",
    type: "person",
    x: -600,
    y: -600,
    name: "Egon Tiedemann",
    image: "https://picsum.photos/seed/egon/200/300",
    details: "Police officer in Winden.",
  },
  {
    id: "doris",
    type: "person",
    x: -300,
    y: -600,
    name: "Doris Tiedemann",
    image: "https://picsum.photos/seed/doris/200/300",
    details: "Egon's wife.",
  },
  { id: "m_egon_doris", type: "marriage", x: -450, y: -600 },

  {
    id: "bernd",
    type: "person",
    x: 300,
    y: -600,
    name: "Bernd Doppler",
    image: "https://picsum.photos/seed/bernd/200/300",
    details: "Founder of the nuclear power plant.",
  },
  {
    id: "greta",
    type: "person",
    x: 600,
    y: -600,
    name: "Greta Doppler",
    image: "https://picsum.photos/seed/greta/200/300",
    details: "Helge's mother.",
  },
  { id: "m_bernd_greta", type: "marriage", x: 450, y: -600 },

  // Generation 2
  {
    id: "claudia",
    type: "person",
    x: -450,
    y: -300,
    name: "Claudia Tiedemann",
    image: "https://picsum.photos/seed/claudia/200/300",
    details: "Director of the power plant. The White Devil.",
  },
  {
    id: "helge",
    type: "person",
    x: 450,
    y: -300,
    name: "Helge Doppler",
    image: "https://picsum.photos/seed/helge/200/300",
    details: "Noah's helper.",
  },

  {
    id: "tronte",
    type: "person",
    x: -1000,
    y: -300,
    name: "Tronte Nielsen",
    image: "https://picsum.photos/seed/tronte/200/300",
    details: "Journalist.",
  },
  {
    id: "jana",
    type: "person",
    x: -750,
    y: -300,
    name: "Jana Nielsen",
    image: "https://picsum.photos/seed/jana/200/300",
    details: "Ulrich's mother.",
  },
  { id: "m_tronte_jana", type: "marriage", x: -875, y: -300 },

  // Generation 3
  {
    id: "ulrich",
    type: "person",
    x: -1000,
    y: 0,
    name: "Ulrich Nielsen",
    image: "https://picsum.photos/seed/ulrich/200/300",
    details: "Police officer. Travels to 1953.",
  },
  {
    id: "katharina",
    type: "person",
    x: -750,
    y: 0,
    name: "Katharina Nielsen",
    image: "https://picsum.photos/seed/katharina/200/300",
    details: "School principal.",
  },
  { id: "m_ulrich_katharina", type: "marriage", x: -875, y: 0 },

  {
    id: "regina",
    type: "person",
    x: -450,
    y: 0,
    name: "Regina Tiedemann",
    image: "https://picsum.photos/seed/regina/200/300",
    details: "Hotel manager.",
  },
  {
    id: "aleksander",
    type: "person",
    x: -150,
    y: 0,
    name: "Aleksander Tiedemann",
    image: "https://picsum.photos/seed/aleksander/200/300",
    details: "Director of the power plant (2019).",
  },
  { id: "m_regina_aleksander", type: "marriage", x: -300, y: 0 },

  {
    id: "peter",
    type: "person",
    x: 150,
    y: 0,
    name: "Peter Doppler",
    image: "https://picsum.photos/seed/peter/200/300",
    details: "Therapist.",
  },
  {
    id: "charlotte",
    type: "person",
    x: 450,
    y: 0,
    name: "Charlotte Doppler",
    image: "https://picsum.photos/seed/charlotte/200/300",
    details: "Police chief.",
  },
  { id: "m_peter_charlotte", type: "marriage", x: 300, y: 0 },

  {
    id: "hannah",
    type: "person",
    x: -1400,
    y: 0,
    name: "Hannah Kahnwald",
    image: "https://picsum.photos/seed/hannah/200/300",
    details: "Massage therapist.",
  },
  {
    id: "michael",
    type: "person",
    x: -1150,
    y: 0,
    name: "Michael Kahnwald",
    image: "https://picsum.photos/seed/michael/200/300",
    details: "Artist. Formerly Mikkel Nielsen.",
  },
  { id: "m_hannah_michael", type: "marriage", x: -1275, y: 0 },

  // Generation 4
  {
    id: "jonas",
    type: "person",
    x: -1275,
    y: 300,
    name: "Jonas Kahnwald",
    image: "https://picsum.photos/seed/jonas/200/300",
    details: "The protagonist. Time traveler.",
  },

  {
    id: "martha",
    type: "person",
    x: -875,
    y: 300,
    name: "Martha Nielsen",
    image: "https://picsum.photos/seed/martha/200/300",
    details: "Jonas's love interest.",
  },
  {
    id: "magnus",
    type: "person",
    x: -1050,
    y: 300,
    name: "Magnus Nielsen",
    image: "https://picsum.photos/seed/magnus/200/300",
    details: "Martha's brother.",
  },
  {
    id: "mikkel",
    type: "person",
    x: -700,
    y: 300,
    name: "Mikkel Nielsen",
    image: "https://picsum.photos/seed/mikkel/200/300",
    details: "Travels back to 1986 and becomes Michael.",
  },

  {
    id: "bartosz",
    type: "person",
    x: -300,
    y: 300,
    name: "Bartosz Tiedemann",
    image: "https://picsum.photos/seed/bartosz/200/300",
    details: "Regina and Aleksander's son.",
  },

  {
    id: "franziska",
    type: "person",
    x: 150,
    y: 300,
    name: "Franziska Doppler",
    image: "https://picsum.photos/seed/franziska/200/300",
    details: "Magnus's girlfriend.",
  },
  {
    id: "elisabeth",
    type: "person",
    x: 450,
    y: 300,
    name: "Elisabeth Doppler",
    image: "https://picsum.photos/seed/elisabeth/200/300",
    details: "Charlotte's daughter. Noah's wife.",
  },

  // The Infinity Loop / Time Travel links
  {
    id: "noah",
    type: "person",
    x: 750,
    y: 300,
    name: "Noah",
    image: "https://picsum.photos/seed/noah/200/300",
    details: "Sic Mundus priest.",
  },
  { id: "m_noah_elisabeth", type: "marriage", x: 600, y: 300 },

  { id: "infinity", type: "marriage", x: -1075, y: 300 }, // between Jonas and Martha
];

const edges: Edge[] = [
  // Marriages
  { id: "e1", source: "egon", target: "m_egon_doris", type: "solid" },
  { id: "e2", source: "doris", target: "m_egon_doris", type: "solid" },
  { id: "e3", source: "bernd", target: "m_bernd_greta", type: "solid" },
  { id: "e4", source: "greta", target: "m_bernd_greta", type: "solid" },
  { id: "e5", source: "tronte", target: "m_tronte_jana", type: "solid" },
  { id: "e6", source: "jana", target: "m_tronte_jana", type: "solid" },
  { id: "e7", source: "ulrich", target: "m_ulrich_katharina", type: "solid" },
  {
    id: "e8",
    source: "katharina",
    target: "m_ulrich_katharina",
    type: "solid",
  },
  { id: "e9", source: "regina", target: "m_regina_aleksander", type: "solid" },
  {
    id: "e10",
    source: "aleksander",
    target: "m_regina_aleksander",
    type: "solid",
  },
  { id: "e11", source: "peter", target: "m_peter_charlotte", type: "solid" },
  {
    id: "e12",
    source: "charlotte",
    target: "m_peter_charlotte",
    type: "solid",
  },
  { id: "e13", source: "hannah", target: "m_hannah_michael", type: "solid" },
  { id: "e14", source: "michael", target: "m_hannah_michael", type: "solid" },
  { id: "e15", source: "noah", target: "m_noah_elisabeth", type: "solid" },
  { id: "e16", source: "elisabeth", target: "m_noah_elisabeth", type: "solid" },

  // Children
  { id: "c1", source: "m_egon_doris", target: "claudia", type: "solid" },
  { id: "c2", source: "m_bernd_greta", target: "helge", type: "solid" },
  { id: "c3", source: "m_tronte_jana", target: "ulrich", type: "solid" },
  { id: "c4", source: "m_ulrich_katharina", target: "martha", type: "solid" },
  { id: "c5", source: "m_ulrich_katharina", target: "magnus", type: "solid" },
  { id: "c6", source: "m_ulrich_katharina", target: "mikkel", type: "solid" },
  { id: "c7", source: "m_regina_aleksander", target: "bartosz", type: "solid" },
  { id: "c8", source: "m_peter_charlotte", target: "franziska", type: "solid" },
  { id: "c9", source: "m_peter_charlotte", target: "elisabeth", type: "solid" },
  { id: "c10", source: "m_hannah_michael", target: "jonas", type: "solid" },
  { id: "c11", source: "m_noah_elisabeth", target: "charlotte", type: "solid" }, // The paradox!

  // Time travel / identity links
  { id: "t2", source: "claudia", target: "regina", type: "solid" }, // Claudia is Regina's mother
  { id: "t3", source: "helge", target: "peter", type: "solid" }, // Helge is Peter's father

  // Infinity loop
  { id: "i1", source: "jonas", target: "infinity", type: "solid" },
  { id: "i2", source: "martha", target: "infinity", type: "solid" },
];

function isEdgeConnectedToNode(edge: Edge, nodeId: string) {
  if (edge.source === nodeId || edge.target === nodeId) return true;

  const sourceNode = nodes.find((n) => n.id === edge.source);
  const targetNode = nodes.find((n) => n.id === edge.target);

  if (sourceNode?.type === "marriage") {
    const connectedEdges = edges.filter(
      (e) => e.source === sourceNode.id || e.target === sourceNode.id,
    );
    if (connectedEdges.some((e) => e.source === nodeId || e.target === nodeId))
      return true;
  }
  if (targetNode?.type === "marriage") {
    const connectedEdges = edges.filter(
      (e) => e.source === targetNode.id || e.target === targetNode.id,
    );
    if (connectedEdges.some((e) => e.source === nodeId || e.target === nodeId))
      return true;
  }

  return false;
}

function EdgePath({ edge, isFaded }: { edge: Edge; isFaded: boolean }) {
  const source = nodes.find((n) => n.id === edge.source);
  const target = nodes.find((n) => n.id === edge.target);
  if (!source || !target) return null;

  let d = "";

  if (source.type === "person" && target.type === "marriage") {
    const startX =
      source.x < target.x ? source.x + NODE_W / 2 : source.x - NODE_W / 2;
    const startY = source.y;
    d = `M ${startX} ${startY} L ${target.x} ${target.y}`;
  } else if (source.type === "marriage" && target.type === "person") {
    const startX = source.x;
    const startY = source.y;
    const endX = target.x;
    const endY = target.y - NODE_H / 2 - 10;

    if (Math.abs(startX - endX) < 5) {
      d = `M ${startX} ${startY} L ${endX} ${endY}`;
    } else {
      const midY = startY + (endY - startY) / 2;
      d = `M ${startX} ${startY} L ${startX} ${midY} L ${endX} ${midY} L ${endX} ${endY}`;
    }
  } else if (source.type === "person" && target.type === "person") {
    if (edge.type === "dashed") {
      const startX = source.x;
      const startY = source.y + NODE_H / 2;
      const endX = target.x;
      const endY = target.y - NODE_H / 2;
      d = `M ${startX} ${startY} C ${startX} ${startY + 100}, ${endX} ${endY - 100}, ${endX} ${endY}`;
    } else {
      const startX = source.x;
      const startY = source.y + NODE_H / 2;
      const endX = target.x;
      const endY = target.y - NODE_H / 2 - 10;
      const midY = startY + (endY - startY) / 2;
      d = `M ${startX} ${startY} L ${startX} ${midY} L ${endX} ${midY} L ${endX} ${endY}`;
    }
  }

  return (
    <motion.path
      d={d}
      stroke={isFaded ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.3)"}
      strokeWidth={isFaded ? "1" : "1.5"}
      fill="none"
      strokeDasharray={edge.type === "dashed" ? "5,5" : "none"}
      animate={{
        opacity: isFaded ? 0.1 : 1,
        stroke: isFaded ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.3)",
      }}
      transition={{ duration: 0.5 }}
    />
  );
}

function PersonNode({
  node,
  isSelected,
  anySelected,
  onClick,
  onSeeMore,
}: {
  node: Node;
  isSelected: boolean;
  anySelected: boolean;
  onClick: (id: string) => void;
  onSeeMore: (id: string) => void;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (anySelected) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, [anySelected, mouseX, mouseY]);

  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [25, -25]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-25, 25]), {
    stiffness: 150,
    damping: 20,
  });

  const isFaded = anySelected && !isSelected;

  return (
    <motion.div
      style={{
        position: "absolute",
        left: node.x - NODE_W / 2,
        top: node.y - NODE_H / 2,
        width: NODE_W,
        height: NODE_H,
        rotateX: anySelected ? 0 : rotateX,
        rotateY: anySelected ? 0 : rotateY,
        zIndex: isSelected ? 50 : 10,
        perspective: 1000,
      }}
      animate={{
        opacity: isFaded ? 0.1 : 1,
        scale: isSelected ? 1.1 : 1,
      }}
      transition={{ duration: 0.5 }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(node.id);
      }}
      className="cursor-pointer group"
    >
      <div className="w-full h-full relative shadow-2xl">
        <Image
          src={node.image ?? ""}
          alt={node.name ?? ""}
          className={`w-full h-full object-cover transition-all duration-700 ${isSelected ? "grayscale-0" : "grayscale group-hover:grayscale-0"}`}
          style={{ boxShadow: "0 0 20px rgba(0,0,0,0.8)" }}
          width={560}
          height={700}
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500" />
      </div>

      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[200%] text-center">
        <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase opacity-70 group-hover:opacity-100 transition-opacity">
          {node.name}
        </span>
      </div>

      {isSelected && (
        <motion.div
          initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="absolute left-full ml-8 top-0 w-64 bg-black/80 border border-gray-800 p-5 backdrop-blur-md text-left"
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <h3 className="text-white font-mono tracking-wider text-sm mb-3 uppercase border-b border-gray-800 pb-2">
            {node.name}
          </h3>
          <p className="text-gray-400 text-xs leading-relaxed font-sans">
            {node.details}
          </p>
          <div className="mt-4 text-[10px] text-gray-600 uppercase tracking-widest">
            Status: Unknown
            <br />
            Origin: Winden
          </div>
          <button
            onPointerDown={(e) => {
              e.stopPropagation();
              onSeeMore(node.id);
            }}
            className="mt-6 border border-white/30 px-6 py-2 text-xs uppercase tracking-widest text-gray-500 hover:bg-gray-400 hover:text-black transition-colors duration-300 w-full"
          >
            See More
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}

import InteractiveRipple from "@/components/interactive-ripple";
import Image from "next/image";
import Scribble from "@/components/scribble";

function Circled({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block border border-white/50 px-2 py-0.5 mx-1 text-white/90"
      style={{ borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px" }}
    >
      {children}
    </span>
  );
}

const detailsSections = [
  {
    id: "s1",
    title: "THE DRUG STASH",
    episode: "SEASON 1 EPISODE 1",
    text: (
      <>
        After <Circled>Erik Obendorf</Circled> disappears in fall{" "}
        <Scribble>2019</Scribble>, Bartosz wants to find his drug stash in the{" "}
        <Circled>Winden caves</Circled>. He&apos;s joined by his girlfriend{" "}
        <Circled>Martha</Circled>, best friend <Circled>Jonas</Circled>, Magnus,
        and little <Circled>Mikkel</Circled>. Mikkel goes missing near the
        caves, never to be found again.
      </>
    ),
    bgImage: "https://picsum.photos/seed/cave/1920/1080",
    character: "BARTOSZ",
    year: "2019",
    nextHint: "A MYSTERIOUS MAN",
  },
  {
    id: "s2",
    title: "A MYSTERIOUS MAN",
    episode: "SEASON 1 EPISODE 2",
    text: (
      <>
        A <Circled>stranger</Circled> arrives in Winden. He takes a room at the
        hotel owned by Regina Tiedemann. His walls are covered with newspaper
        clippings and a map of the <Circled>caves</Circled>. Who is he?
      </>
    ),
    bgImage: "https://picsum.photos/seed/stranger/1920/1080",
    character: "THE STRANGER",
    year: "2019",
    nextHint: "PAST AND PRESENT",
  },
  {
    id: "s3",
    title: "PAST AND PRESENT",
    episode: "SEASON 1 EPISODE 3",
    text: (
      <>
        The police find a body in the woods. It&apos;s not Erik. The boy is
        dressed in clothes from the <Scribble>80s</Scribble> and has a{" "}
        <Circled>pfennig</Circled> coin from 1986 on a red string around his
        neck.
      </>
    ),
    bgImage: "https://picsum.photos/seed/forest/1920/1080",
    character: "UNKNOWN BOY",
    year: "1986",
    nextHint: "THE DRUG STASH",
  },
];

function DetailsPage({ onClose }: { onClose: () => void }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    if (isAnimating) return;
    if (e.deltaY > 20 && activeIdx < detailsSections.length) {
      setIsAnimating(true);
      setActiveIdx(activeIdx + 1);
    } else if (e.deltaY < -20 && activeIdx > 0) {
      setIsAnimating(true);
      setActiveIdx(activeIdx - 1);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black overflow-hidden"
      onWheel={handleWheel}
      onPointerDown={(e) => e.stopPropagation()}
      initial={{ clipPath: "circle(0% at 50% 0%)" }}
      animate={{ clipPath: "circle(150% at 50% 0%)" }}
      exit={{ clipPath: "circle(0% at 50% 0%)", opacity: 0 }}
      transition={{ duration: 1.5, ease: [0.7, 0, 0.3, 1] }}
    >
      {/* Header - persistent across sections */}
      <div className="absolute top-0 left-0 right-0 h-24 z-50 flex items-center justify-between px-8 pointer-events-none">
        <div
          className="w-8 h-6 flex flex-col justify-center gap-2 pointer-events-auto cursor-pointer group"
          onClick={onClose}
        >
          <div className="w-8 h-px bg-white/50 group-hover:bg-white transition-colors" />
          <div className="w-8 h-px bg-white/50 group-hover:bg-white transition-colors" />
        </div>

        <div className="text-white/50">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M12 3L2 19h20L12 3z" />
            <circle cx="12" cy="14" r="3" />
          </svg>
        </div>
      </div>

      <AnimatePresence initial={false}>
        <motion.div
          key={activeIdx}
          initial={{ clipPath: "circle(0% at 50% 0%)", scale: 1.05 }}
          animate={{ clipPath: "circle(150% at 50% 0%)", scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: [0.7, 0, 0.3, 1] }}
          onAnimationComplete={() => setIsAnimating(false)}
          className="absolute inset-0"
        >
          {activeIdx < detailsSections.length ? (
            <>
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${detailsSections[activeIdx].bgImage})`,
                }}
              />
              <div className="absolute inset-0 bg-black/60 pointer-events-none" />

              {/* Grid lines overlay */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                  backgroundSize: "100px 100px",
                }}
              />

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                {/* Left Column */}
                <div className="w-1/2 pl-32 pr-16 text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                  >
                    <div className="text-xs tracking-[0.2em] text-gray-400 mb-4">
                      {detailsSections[activeIdx].episode}
                    </div>
                    <h1 className="text-4xl font-light tracking-[0.3em] mb-8">
                      {detailsSections[activeIdx].title}
                    </h1>
                    <p className="text-gray-300 leading-loose text-sm max-w-md font-sans">
                      {detailsSections[activeIdx].text}
                    </p>
                  </motion.div>
                </div>

                {/* Right Column */}
                <div className="w-1/2 relative h-full">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="absolute top-1/2 left-1/4 -translate-y-1/2 flex flex-col"
                  >
                    <div className="text-white tracking-widest text-sm mb-2 ml-8">
                      {detailsSections[activeIdx].character}
                    </div>
                    <div className="flex items-center">
                      <div className="text-white/80 text-2xl mr-2 leading-none mt-1">
                        *
                      </div>
                      <div className="w-64 h-px bg-white/80 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white/30 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
                        </div>
                        <div className="absolute right-0 top-0 w-px h-40 border-r-2 border-dotted border-white/50" />
                        <div className="absolute right-[-14px] top-44 text-xs tracking-widest text-white/80">
                          {detailsSections[activeIdx].year}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Bottom Hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-12 left-32 text-white/50 text-xs tracking-[0.2em] flex flex-col items-center"
              >
                <span className="mb-4">
                  {detailsSections[activeIdx].nextHint}
                </span>
                <div className="w-px h-8 bg-white/20 relative overflow-hidden">
                  <motion.div
                    animate={{ y: [-32, 32] }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 1.5,
                      ease: "linear",
                    }}
                    className="w-full h-1/2 bg-white/80"
                  />
                </div>
              </motion.div>
            </>
          ) : (
            <div className="absolute inset-0">
              <InteractiveRipple />
              <div
                className="absolute top-8 left-1/2 -translate-x-1/2 z-50 cursor-pointer"
                onClick={onClose}
              >
                <h2 className="text-white tracking-[0.4em] text-sm font-light hover:text-gray-300 transition-colors">
                  RETURN TO BEGINNING
                </h2>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export default function FamilyTree() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useSpring(0, { stiffness: 60, damping: 20 });
  const y = useSpring(0, { stiffness: 60, damping: 20 });
  const scale = useSpring(0.5, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (selectedNode) {
      const node = nodes.find((n) => n.id === selectedNode);
      if (node) {
        const targetScale = 1.8;
        x.set(window.innerWidth / 2 - node.x * targetScale);
        y.set(window.innerHeight / 2 - node.y * targetScale);
        scale.set(targetScale);
      }
    } else {
      x.set(window.innerWidth / 2);
      y.set(window.innerHeight / 2);
      scale.set(0.6);
    }
  }, [selectedNode, x, y, scale]);

  useEffect(() => {
    x.set(window.innerWidth / 2);
    y.set(window.innerHeight / 2);
  }, [x, y]);

  const isDragging = useRef(false);
  const lastPan = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    if (selectedNode) {
      setSelectedNode(null);
      return;
    }
    isDragging.current = true;
    lastPan.current = { x: e.clientX, y: e.clientY };
    if (containerRef.current) {
      containerRef.current.style.cursor = "grabbing";
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPan.current.x;
    const dy = e.clientY - lastPan.current.y;
    x.set(x.get() + dx);
    y.set(y.get() + dy);
    lastPan.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (selectedNode) return;
    e.preventDefault();
    const zoomFactor = -e.deltaY * 0.002;
    const currentScale = scale.get();
    const newScale = Math.max(
      0.1,
      Math.min(currentScale * (1 + zoomFactor), 3),
    );
    scale.set(newScale);
  };

  return (
    <div
      className="w-screen h-screen bg-[#050505] overflow-hidden relative cursor-grab"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onWheel={handleWheel}
      ref={containerRef}
    >
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, #222 0%, #000 100%)",
        }}
      />

      <motion.div
        style={{
          x,
          y,
          scale,
          transformOrigin: "0 0",
        }}
        className="absolute top-0 left-0"
      >
        <svg
          style={{
            position: "absolute",
            top: -5000,
            left: -5000,
            width: 10000,
            height: 10000,
            overflow: "visible",
            pointerEvents: "none",
          }}
        >
          <g transform="translate(5000, 5000)">
            {edges.map((edge) => (
              <EdgePath
                key={edge.id}
                edge={edge}
                isFaded={
                  selectedNode
                    ? !isEdgeConnectedToNode(edge, selectedNode)
                    : false
                }
              />
            ))}
          </g>
        </svg>

        <div style={{ position: "absolute", top: 0, left: 0 }}>
          {nodes
            .filter((n) => n.type === "person")
            .map((node) => (
              <PersonNode
                key={node.id}
                node={node}
                isSelected={selectedNode === node.id}
                anySelected={!!selectedNode}
                onClick={(id) => {
                  setSelectedNode(id === selectedNode ? null : id);
                }}
                onSeeMore={(id) => setShowDetails(id)}
              />
            ))}

          {/* Infinity Symbol */}
          {nodes
            .filter((n) => n.id === "infinity")
            .map((node) => (
              <div
                key={node.id}
                style={{
                  position: "absolute",
                  left: node.x,
                  top: node.y,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Infinity size={48} strokeWidth={1} className="text-white/40" />
              </div>
            ))}
        </div>
      </motion.div>

      {/* Title */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-white tracking-[0.8em] text-2xl font-semibold pointer-events-none opacity-60">
        DARK
      </div>

      <AnimatePresence>
        {showDetails && <DetailsPage onClose={() => setShowDetails(null)} />}
      </AnimatePresence>
    </div>
  );
}
