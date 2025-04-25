import RaceCountdown from './RaceCountdown'

export default async function NextRaceCard() {
  const year = new Date().getFullYear()
  let nextRace = null

  try {
    const res = await fetch(`https://api.jolpi.ca/ergast/f1/${year}.json`, {
      cache: 'no-store',
    })
    const data = await res.json()
    const races = data.MRData.RaceTable.Races
    const now = new Date()

    nextRace = races.find(race => new Date(`${race.date}T${race.time}`) > now)
  } catch (err) {
    console.error('Error fetching next race:', err)
  }

  if (!nextRace) return null

  return (
    <div className=" bg-black/50 border border-white/20 rounded-xl p-6 backdrop-blur-lg md:min-w-2xl max-w-4xl">
      <RaceCountdown race={nextRace} />
    </div>
  )
}
