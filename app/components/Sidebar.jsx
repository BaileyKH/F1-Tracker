'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Flag, Calendar, Users, Trophy } from 'lucide-react'

const navItems = [
  { name: 'Dashboard', href: '/', icon: <Home size={18} /> },
  { name: 'Schedule', href: '/schedule', icon: <Calendar size={18} /> },
  { name: 'Drivers', href: '/drivers', icon: <Users size={18} /> },
  { name: 'Constructors', href: '/constructors', icon: <Flag size={18} /> },
  { name: 'Standings', href: '/standings', icon: <Trophy size={18} /> },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-[#111] border-r border-white/10 p-4 hidden md:flex flex-col">
      <div className="mb-8">
        <h1 className='text-4xl text-accent font-bold tracking-wide'>F1 DASH</h1>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-gradient-to-r from-accent/10 text-accent border border-accent/20'
                  : 'hover:bg-white/5 text-gray-300'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          )
        })}
      </nav>
      <div className="mt-auto pt-6 text-xs text-white/30">
        <p className="text-xs text-textSecondary">© {new Date().getFullYear()} BaileyKH</p>
      </div>
    </aside>
  )
}
  