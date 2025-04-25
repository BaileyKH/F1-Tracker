'use client'

import { useEffect, useState } from 'react'

export default function Standings() {
  const [view, setView] = useState('drivers') // 'drivers' or 'constructors'
  const [driverStandings, setDriverStandings] = useState([])
  const [constructorStandings, setConstructorStandings] = useState([])

  useEffect(() => {
    const year = new Date().getFullYear()

    const fetchStandings = async () => {
      try {
        const [driverRes, constructorRes] = await Promise.all([
          fetch(`https://api.jolpi.ca/ergast/f1/${year}/driverstandings.json`, { cache: 'no-store' }),
          fetch(`https://api.jolpi.ca/ergast/f1/${year}/constructorstandings.json`, { cache: 'no-store' }),
        ])

        const driverData = await driverRes.json()
        const constructorData = await constructorRes.json()

        const driverList = driverData.MRData.StandingsTable.StandingsLists
        const constructorList = constructorData.MRData.StandingsTable.StandingsLists

        if (driverList.length > 0) {
          setDriverStandings(driverList[0].DriverStandings.slice(0, 10))
        }

        if (constructorList.length > 0) {
          setConstructorStandings(constructorList[0].ConstructorStandings.slice(0, 10))
        }
      } catch (err) {
        console.error('Error fetching standings:', err)
      }
    }

    fetchStandings()
  }, [])

  return (
    <div className="space-y-4">
      {/* Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setView('drivers')}
          className={`px-3 py-1 rounded-full text-sm tracking-wide transition-all ${
            view === 'drivers' ? 'bg-black/80 text-white shadow-lg border border-accent/40' : 'bg-white/10 text-white border border-transparent hover:bg-white/20'
          }`}
        >
          Drivers
        </button>
        <button
          onClick={() => setView('constructors')}
          className={`px-3 py-1 rounded-full text-sm tracking-wide transition-all ${
            view === 'constructors' ? 'bg-black/80 text-white shadow-lg border border-accent/40' : 'bg-white/10 text-white border border-transparent hover:bg-white/20'
          }`}
        >
          Constructors
        </button>
      </div>

      {/* Standings List */}
      <div className="space-y-3">
        {view === 'drivers' &&
          driverStandings.map((driver, index) => (
            <div
              key={driver.Driver.driverId}
              className="flex justify-between items-center p-2 rounded-md bg-black/40 hover:bg-black/80 transition-all border border-transparent hover:border-accent/20 shadow-md"
            >
              <div className="flex items-center gap-3">
                <span className="text-accent w-5 text-right">{index + 1}</span>
                <span className="text-text-primary font-medium">
                  {driver.Driver.givenName} {driver.Driver.familyName}
                  <span className="text-text-secondary text-xs ml-1">
                    ({driver.Constructors[0].name})
                  </span>
                </span>
              </div>
              <div className="text-sm text-text-secondary">
                {driver.points} pts
              </div>
            </div>
          ))}

        {view === 'constructors' &&
          constructorStandings.map((team, index) => (
            <div
              key={team.Constructor.constructorId}
              className="flex justify-between items-center p-2 rounded-md bg-black/40 hover:bg-black/80 transition-all border border-transparent hover:border-accent/20 shadow-md"
            >
              <div className="flex items-center gap-3">
                <span className="text-accent w-5 text-right">{index + 1}</span>
                <span className="text-text-primary font-medium">{team.Constructor.name}</span>
              </div>
              <div className="text-sm text-text-secondary">
                {team.points} pts
              </div>
            </div>
          ))}

        {view === 'drivers' && driverStandings.length === 0 && (
          <p className="text-sm text-text-secondary">Driver standings not available yet.</p>
        )}
        {view === 'constructors' && constructorStandings.length === 0 && (
          <p className="text-sm text-text-secondary">Constructor standings not available yet.</p>
        )}
      </div>
    </div>
  )
}
