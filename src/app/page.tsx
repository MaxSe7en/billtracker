"use client";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import Link from "next/link";
import usAlbers from "@/utils/states-10m.json";

// Mock state data (replace with API fetch)
const states = [
  { id: "CA", name: "California", bills: 45 },
  { id: "TX", name: "Texas", bills: 30 },
  // Add all states...
];

const geoUrl = usAlbers;


export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-darkBackground">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 border-b border-neutral-200 dark:border-neutral-800">
        <h1 className="text-2xl font-bold text-primary">BillTracker</h1>

        <input
          type="text"
          placeholder="Search bills, posts..."
          className="p-2 rounded border border-neutral-300 dark:border-neutral-700 bg-background dark:bg-darkBackground text-foreground w-full md:w-64"
        />

        <select className="p-2 rounded border border-neutral-300 dark:border-neutral-700 bg-background dark:bg-darkBackground text-foreground w-full md:w-auto">
          <option value="federal">Federal</option>
          {states.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <button className="p-2 rounded bg-primary text-white">Profile</button>
          <button className="p-2 rounded bg-accent text-white">🌙</button>
        </div>
      </header>

      {/* Hero: Interactive Map */}
      <section className="p-4">
        <h2 className="text-lg font-semibold mb-4 text-foreground">
          Select a State
        </h2>
        <div className="w-full max-w-4xl mx-auto">
          <ComposableMap
            projection="geoAlbersUsa"
            className="w-full h-auto"
          >
            <Geographies geography={geoUrl}   className="
    fill-map hover:fill-map-hover
    cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent
  "
  tabIndex={0}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Link
                    key={geo.rsmKey}
                    href={`/state/${geo.properties.postal}`}
                  >
                    <Geography
                      geography={geo}
                      className="fill-primary hover:fill-accent focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
                      tabIndex={0}
                    />
                  </Link>
                ))
              }
            </Geographies>
          </ComposableMap>
        </div>
      </section>

      {/* Featured Content */}
      <section className="p-4 grid gap-4">
        <div>
          <h2 className="text-lg font-semibold mb-2 text-foreground">
            Federal Bills
          </h2>
          <article className="p-4 rounded-lg shadow bg-card dark:bg-darkCard text-foreground">
            <h3 className="font-semibold">HB123: Tax Reform</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Simplifies taxes...
            </p>
            <button
              className="mt-2 p-2 rounded bg-accent text-white"
              onClick={() =>
                navigator.share({
                  title: "HB123",
                  text: "Simplifies taxes...",
                  url: "/federal/bills/HB123",
                })
              }
            >
              Share
            </button>
          </article>
        </div>
      </section>

      <footer className="p-4 border-t border-neutral-200 dark:border-neutral-800 text-foreground text-center">
        <p>About | Privacy</p>
      </footer>
    </div>
  );
}
