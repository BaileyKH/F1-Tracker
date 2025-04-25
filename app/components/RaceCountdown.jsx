'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { motion, AnimatePresence } from 'framer-motion'

export default function RaceCountdown({ race }) {
  const [now, setNow] = useState(new Date())
  const [raceStart, setRaceStart] = useState(null)
  const [raceEnd, setRaceEnd] = useState(null)
  const [isRaceDay, setIsRaceDay] = useState(false)

  useEffect(() => {
    const start = new Date(`${race.date}T${race.time}`)
    const end = new Date(start)
    end.setHours(start.getHours() + 3)
    setRaceStart(start)
    setRaceEnd(end)
  }, [race.date, race.time])

  useEffect(() => {
    const interval = setInterval(() => {
      const current = new Date()
      setNow(current)
      if (raceStart && raceEnd) {
        setIsRaceDay(current >= raceStart && current <= raceEnd)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [raceStart, raceEnd])

  if (!raceStart) return null

  const timeDiff = raceStart - now
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((timeDiff / (1000 * 60)) % 60)
  const seconds = Math.floor((timeDiff / 1000) % 60)

  return (
    <div className="text-center">
      <h2 className="text-2xl text-accent mb-1 uppercase tracking-widest">Next Race</h2>
      <h3 className="text-3xl text-text-primary mb-2">
        {race.raceName}
      </h3>
      <p className="text-sm text-text-secondary mb-4">
        Round {race.round} — {race.Circuit.circuitName}, {race.Circuit.Location.locality}, {race.Circuit.Location.country}
      </p>

      <div className="text-base text-text-primary mb-6">
        {format(raceStart, "eeee MMMM d, yyyy 'at' h:mm a")}
      </div>

      {isRaceDay ? (
        <div className="text-accent text-xl uppercase tracking-widest animate-pulse">🏁 It's Race Day!</div>
      ) : (
        <div className="flex justify-center gap-6 text-accent text-xl tracking-widest w-full">
          <div className='flex justify-center items-center w-max bg-black/40 shadow-md px-4 py-2 rounded-lg'>
            <TimeBlock label="Days" value={days} />
            <TimeBlock label="Hours" value={hours} />
            <TimeBlock label="Min" value={minutes} />
            <TimeBlock label="Sec" value={seconds} />
          </div>
        </div>
      )}
    </div>
  )
}

function TimeBlock({ label, value }) {
  return (
    <div className="flex flex-col items-center w-14">
      <AnimatePresence mode="wait">
        <motion.span
          key={value}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl"
        >
          {String(value).padStart(2, '0')}
        </motion.span>
      </AnimatePresence>
      <span className="text-sm text-text-secondary">{label}</span>
    </div>
  )
}
