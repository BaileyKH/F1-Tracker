export default async function UpcomingRaces() {
    const year = new Date().getFullYear()
    let upcoming = []
  
    try {
      const res = await fetch(`https://api.jolpi.ca/ergast/f1/${year}.json`, {
        cache: 'no-store',
      })
      const data = await res.json()
      const allRaces = data.MRData.RaceTable.Races
      const now = new Date()
  
      upcoming = allRaces.filter(race => new Date(`${race.date}T${race.time}`) > now)
    } catch (err) {
      console.error('Error fetching races:', err)
    }
  
    if (!upcoming.length) {
      return <p className="text-text-secondary text-sm">No upcoming races found.</p>
    }
  
    return (
      <div className="overflow-x-auto">
        <div className="flex gap-4 min-w-full">
          {upcoming.map((race, index) => {
            const isNext = index === 0
            return (
              <div
                key={race.round}
                className={`min-w-[200px] p-4 rounded-lg transition-all
                  ${isNext
                    ? 'bg-black/40 border border-accent shadow-md'
                    : 'bg-black/40 border border-white/15 hover:border-accent/50 shadow-md'}
                `}
              >
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-accent text-sm uppercase">
                    Round {race.round}
                  </h4>
                  {isNext && (
                    <span className="text-xs text-white bg-accent/30 px-2 py-0.5 rounded font-bold tracking-wide">
                      NEXT
                    </span>
                  )}
                </div>
                <p className="text-text-primary text-base mb-1">
                  {race.raceName}
                </p>
                <p className="text-sm text-text-secondary">
                  {race.Circuit.Location.locality}, {race.Circuit.Location.country}
                </p>
                <p className="text-xs text-text-secondary mt-1">
                  {new Date(`${race.date}T${race.time}`).toLocaleDateString(undefined, {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
  