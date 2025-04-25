import Image from "next/image";

import NextRaceCard from "./components/NextRaceCard";

import banner from '../public/background-img.webp'
import Standings from "./components/Standings";
import TrackInfo from "./components/TrackInfo";
import UpcomingRaces from "./components/UpcomingRaces";


export default function Home() {
  return (
    <main className="flex-1 bg-[#0a0a0a]">
      <div className="flex justify-center items-center pt-10">
          <NextRaceCard/>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 md:p-10 overflow-y-auto">
        <div className="bg-white/5 rounded-xl p-4 shadow-lg">
          <h3 className="text-accent text-lg mb-2">Standings</h3>
          <Standings />
        </div>
        <div className="bg-white/5 rounded-xl p-4 shadow-lg">
          <h3 className="text-accent text-lg mb-2">Track Info</h3>
          <TrackInfo />
        </div>
        <div className="col-span-1 lg:col-span-2 bg-white/5 rounded-xl p-4 shadow-lg">
          <h3 className="text-accent text-lg mb-2">Upcoming Races</h3>
          <UpcomingRaces />
        </div>
      </div>
    </main>
  );
}
