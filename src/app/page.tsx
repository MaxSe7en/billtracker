"use client";
import { SetStateAction, useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import Link from "next/link";
import axiosClient from "@/lib/axiosClient";
import { scaleLinear } from "d3-scale";
import usAlbers from "@/utils/states-10m.json";
import { motion, AnimatePresence } from "framer-motion";
import Legend from "@/components/Legend";

const geoUrl = usAlbers;

type StateData = {
  state: string;
  name: string;
  active_bills: number;
};

// Simple state centroids lookup (approximate coordinates)
const stateCentroids: { [key: string]: [number, number] } = {
  "Alabama": [-86.829, 32.799],
  "Alaska": [-152.268, 66.161],
  "Arizona": [-111.931, 34.168],
  "Arkansas": [-92.373, 34.751],
  "California": [-119.682, 36.534],
  "Colorado": [-105.512, 38.997],
  "Connecticut": [-72.683, 41.562],
  "Delaware": [-75.507, 38.989],
  "Florida": [-81.686, 27.874],
  "Georgia": [-83.648, 32.646],
  "Hawaii": [-157.531, 20.292],
  "Idaho": [-114.742, 44.240],
  "Illinois": [-89.399, 40.041],
  "Indiana": [-86.275, 39.894],
  "Iowa": [-93.497, 42.038],
  "Kansas": [-98.385, 38.493],
  "Kentucky": [-85.768, 37.526],
  "Louisiana": [-92.445, 31.068],
  "Maine": [-69.242, 45.369],
  "Maryland": [-76.817, 39.063],
  "Massachusetts": [-71.530, 42.158],
  "Michigan": [-84.560, 43.327],
  "Minnesota": [-94.306, 46.281],
  "Mississippi": [-89.877, 32.736],
  "Missouri": [-92.173, 38.357],
  "Montana": [-109.634, 46.921],
  "Nebraska": [-99.901, 41.537],
  "Nevada": [-116.852, 39.340],
  "New Hampshire": [-71.580, 43.681],
  "New Jersey": [-74.405, 40.058],
  "New Mexico": [-106.069, 34.837],
  "New York": [-74.938, 42.914],
  "North Carolina": [-79.471, 35.556],
  "North Dakota": [-100.466, 47.450],
  "Ohio": [-82.764, 40.367],
  "Oklahoma": [-97.516, 35.588],
  "Oregon": [-120.554, 43.934],
  "Pennsylvania": [-77.799, 40.874],
  "Rhode Island": [-71.477, 41.677],
  "South Carolina": [-80.896, 33.917],
  "South Dakota": [-100.228, 44.444],
  "Tennessee": [-86.343, 35.843],
  "Texas": [-99.359, 31.494],
  "Utah": [-111.547, 39.305],
  "Vermont": [-72.642, 44.068],
  "Virginia": [-78.656, 37.521],
  "Washington": [-120.740, 47.382],
  "West Virginia": [-80.666, 38.641],
  "Wisconsin": [-89.994, 44.635],
  "Wyoming": [-107.554, 43.000],
};

export default function Home() {
  const [statesData, setStatesData] = useState<StateData[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    name: string;
    bills: number;
  }>({ visible: false, x: 0, y: 0, name: "", bills: 0 });

  // Fetch states on mount
  useEffect(() => {
    axiosClient
      .get<StateData[]>("states_overview_count/")
      .then((res: { data: SetStateAction<StateData[]> }) =>
        setStatesData(res.data)
      )
      .catch((err: any) => console.error("API error:", err));
  }, []);

  const getStateData = (stateName: string) => {
    return statesData.find((s) => s.name === stateName) ?? {
      state: stateName,
      name: stateName,
      active_bills: 0,
    };
  };

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mq.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  const maxBills = Math.max(...statesData.map((s) => s.active_bills), 1);

  const lightScale = scaleLinear<string>()
    .domain([0, maxBills])
    .range(["#e0e7ff", "#1e3a8a"]);

  const darkScale = scaleLinear<string>()
    .domain([0, maxBills])
    .range(["#5eead4", "#0ea5e9"]);

  const colorScale = isDarkMode ? darkScale : lightScale;

  return (
    <div className="relative min-h-screen bg-background text-foreground dark:bg-darkBackground">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 border-b border-neutral-200 dark:border-neutral-800">
        <h1 className="text-2xl font-bold text-primary">BillTracker</h1>
        <input
          type="text"
          placeholder="Search bills, posts..."
          className="p-2 rounded border border-neutral-300 dark:border-neutral-700 bg-background dark:bg-darkBackground text-foreground w-full md:w-64"
        />
        <select className="p-2 rounded border border-neutral-300 dark:border-neutral-700 bg-background dark:bg-darkBackground text-foreground w-full md:w-auto">
          <option value="federal">Federal</option>
          {statesData.map((state) => (
            <option key={state.state} value={state.state}>
              {state.name}
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          <button className="p-2 rounded bg-primary text-white">Profile</button>
          <button className="p-2 rounded bg-accent text-white">🌙</button>
        </div>
      </header>

      <section className="p-4">
        <h2 className="text-lg font-semibold mb-4 text-foreground">
          Select a State
        </h2>

        <div className="w-full max-w-5xl mx-auto">
          <ComposableMap projection="geoAlbersUsa" className="w-full h-auto">
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const stateName = geo.properties.name;
                  const stateInfo = getStateData(stateName);
                  const centroid = stateCentroids[stateName];

                  return (
                    <g key={geo.rsmKey}>
                      <Link href={`/state/${stateInfo.state}`} prefetch={false}>
                        <Geography
                          geography={geo}
                          fill={colorScale(stateInfo.active_bills)}
                          stroke="#FFF"
                          strokeWidth={0.5}
                          style={{
                            default: { outline: "none" },
                            hover: { fill: "#f97316", outline: "none" },
                            pressed: { fill: "#ea580c", outline: "none" },
                          }}
                          onMouseEnter={(e) =>
                            setTooltip({
                              visible: true,
                              x: e.clientX,
                              y: e.clientY,
                              name: stateName,
                              bills: stateInfo.active_bills,
                            })
                          }
                          onMouseMove={(e) =>
                            setTooltip((prev) => ({
                              ...prev,
                              x: e.clientX,
                              y: e.clientY,
                            }))
                          }
                          onMouseLeave={() =>
                            setTooltip((prev) => ({ ...prev, visible: false }))
                          }
                        />
                      </Link>

                      {/* Simple marker with centroid */}
                      {centroid && (
                        <Marker coordinates={centroid}>
                          <text
                            textAnchor="middle"
                            alignmentBaseline="central"
                            className="pointer-events-none select-none font-bold text-[10px] fill-foreground dark:fill-white"
                          >
                            {stateInfo.state}
                          </text>
                        </Marker>
                      )}
                    </g>
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>
        <Legend maxBills={maxBills} isDarkMode={isDarkMode} />
      </section>

      <AnimatePresence>
        {tooltip.visible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bg-white dark:bg-gray-800 shadow-lg rounded-lg px-3 py-2 text-sm border"
            style={{ top: tooltip.y + 10, left: tooltip.x + 10 }}
          >
            <p className="font-bold">{tooltip.name}</p>
            <p>{tooltip.bills} active bills</p>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="p-4">
        <h2 className="text-lg font-semibold mb-2">Federal Bills</h2>
        <article className="p-4 rounded-lg shadow bg-card">
          <h3 className="font-semibold">HB123: Tax Reform</h3>
          <p className="text-sm text-gray-600">Simplifies taxes...</p>
        </article>
      </section>

      <footer className="p-4 border-t text-center">
        <p>About | Privacy</p>
      </footer>
    </div>
  );
}