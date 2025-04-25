export default async function TrackInfo() {
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
      console.error('Error fetching race data:', err)
    }
  
    if (!nextRace) return <p className="text-sm text-text-secondary">No track info available.</p>
  
    const { Circuit } = nextRace
  
    return (
      <div className="space-y-3 text-sm">
        <InfoRow label="Track" value={Circuit.circuitName} />
        <InfoRow label="Location" value={`${Circuit.Location.locality}, ${Circuit.Location.country}`} />
        <InfoRow label="Lap Count" value="57" /> {/* placeholder value */}
        <InfoRow label="Distance" value="305.27 km" /> {/* placeholder value */}
        <InfoRow label="Race Day" value="Sunday" /> {/* placeholder or calculated */}
      </div>
    )
  }
  
  function InfoRow({ label, value }) {
    return (
      <div className="flex justify-between border-b border-white/10 pb-2">
        <span className="text-text-secondary">{label}</span>
        <span className="text-text-primary">{value}</span>
      </div>
    )
  }
  