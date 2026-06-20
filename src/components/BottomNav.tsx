import { useLocation, useNavigate } from 'react-router-dom'

const navItems = [
  {
    path: '/home',
    label: '홈',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V9.5Z"
          fill={active ? '#B4F04A' : 'none'} stroke={active ? '#B4F04A' : '#6B7280'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    path: '/meetup',
    label: '번개',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L4.09 12.11C3.69 12.59 4.03 13.33 4.66 13.33H11L10 22L19.94 11.89C20.34 11.41 20 10.67 19.37 10.67H13L13 2Z"
          fill={active ? '#B4F04A' : 'none'} stroke={active ? '#B4F04A' : '#6B7280'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    path: '/workout',
    label: '운동',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" fill={active ? '#B4F04A' : 'none'} stroke={active ? '#B4F04A' : '#6B7280'} strokeWidth="1.8" />
        <path d="M8 12H16M12 8V16" stroke={active ? '#1C1C2E' : '#6B7280'} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    path: '/challenge',
    label: '챌린지',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M8 21H6a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2v7"
          stroke={active ? '#B4F04A' : '#6B7280'} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M16 19L18 21L22 17" stroke={active ? '#B4F04A' : '#6B7280'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 7H16M8 11H12" stroke={active ? '#B4F04A' : '#6B7280'} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    path: '/my',
    label: '마이',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" fill={active ? '#B4F04A' : 'none'} stroke={active ? '#B4F04A' : '#6B7280'} strokeWidth="1.8" />
        <path d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20"
          stroke={active ? '#B4F04A' : '#6B7280'} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
]

interface Props {
  hiddenPaths?: string[]
}

export default function BottomNav({ hiddenPaths = [] }: Props) {
  const location = useLocation()
  const navigate = useNavigate()

  if (hiddenPaths.includes(location.pathname)) return null

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-card border-t border-white/5 flex items-center justify-around px-2 py-2 z-50">
      {navItems.map((item) => {
        const active = location.pathname === item.path
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center gap-1 py-1 px-3"
          >
            {item.icon(active)}
            <span className={`text-[10px] font-medium ${active ? 'text-lime' : 'text-gray-500'}`}>
              {item.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
