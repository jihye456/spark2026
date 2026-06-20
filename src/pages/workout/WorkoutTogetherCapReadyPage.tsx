import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import runImg from '../../assets/run.png'

const MEETUP = {
  title: '퇴근 후 산책 하실 분',
  sport: '달리기',
  startTime: '20:00',
  endTime: '21:00',
  location: '안양천',
}

const INITIAL_MEMBERS = [
  { id: 1, name: '강아지', initial: '강', isMe: true,  isHost: true,  connected: true,  color: '#B4F04A' },
  { id: 2, name: '개나리', initial: '개', isMe: false, isHost: false, connected: true,  color: '#9D5CF4' },
  { id: 3, name: '문어',   initial: '문', isMe: false, isHost: false, connected: false, color: '#FF7043' },
  { id: 4, name: '하늘',   initial: '하', isMe: false, isHost: false, connected: false, color: '#29B6F6' },
]

export default function WorkoutTogetherCapReadyPage() {
  const navigate = useNavigate()
  const [members] = useState(INITIAL_MEMBERS)
  const [notified, setNotified] = useState(false)

  const connectedCount = members.filter((m) => m.connected).length
  const absentCount = members.filter((m) => !m.connected).length

  const handleNotify = () => {
    setNotified(true)
    setTimeout(() => setNotified(false), 3000)
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#1C1C2E' }}>
      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <p className="text-white font-bold text-base">같이 운동하기</p>
        <span className="text-xs font-bold px-3 py-1 rounded-full"
          style={{ backgroundColor: 'rgba(180,240,74,0.12)', color: '#B4F04A' }}>모임장</span>
      </div>

      {/* 번개 정보 카드 */}
      <div className="mx-5 rounded-2xl p-4 mb-5 border border-white/8" style={{ backgroundColor: '#2C2C3E' }}>
        <div className="flex items-center gap-2 mb-2">
          <img src={runImg} alt="sport" className="w-5 h-5 object-contain" />
          <p className="text-white font-bold text-sm">{MEETUP.title}</p>
        </div>
        <div className="flex items-center gap-3 text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
          <span>{MEETUP.startTime} ~ {MEETUP.endTime}</span>
          <span>·</span>
          <span>{MEETUP.location}</span>
        </div>
      </div>

      {/* 모임원 현황 */}
      <div className="px-5 flex-1">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-bold text-white">모임원 준비 현황</p>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: 'rgba(180,240,74,0.1)', color: '#B4F04A' }}>
            {connectedCount}/{members.length} 접속
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {members.map((m) => (
            <div
              key={m.id}
              className="rounded-2xl p-4 border flex flex-col items-center"
              style={{
                backgroundColor: '#2C2C3E',
                borderColor: m.connected ? `${m.color}35` : 'rgba(255,255,255,0.07)',
              }}
            >
              {/* 아바타 */}
              <div className="relative mb-2">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: `${m.color}18`,
                    border: m.connected ? `2px solid ${m.color}` : '2px solid rgba(255,255,255,0.1)',
                    boxShadow: m.connected ? `0 0 14px ${m.color}50` : 'none',
                  }}
                >
                  <span className="text-xl font-bold" style={{ color: m.connected ? m.color : 'rgba(255,255,255,0.3)' }}>
                    {m.initial}
                  </span>
                </div>
                {m.connected && (
                  <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-fig"
                    style={{ backgroundColor: '#B4F04A' }} />
                )}
              </div>
              <p className="text-sm font-medium text-white mb-0.5">{m.name}</p>
              {m.isHost && (
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full mb-1"
                  style={{ backgroundColor: '#B4F04A', color: '#1C1C2E' }}>모임장</span>
              )}
              <p className="text-[11px]" style={{ color: m.connected ? '#B4F04A' : 'rgba(255,255,255,0.25)' }}>
                {m.connected ? '접속 중' : '미접속'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="px-5 pb-10 pt-5 space-y-3">
        {absentCount > 0 && (
          <button
            onClick={handleNotify}
            className="w-full py-4 rounded-2xl font-medium text-sm flex items-center justify-center gap-2 border transition-all"
            style={{
              borderColor: notified ? 'rgba(180,240,74,0.3)' : 'rgba(255,255,255,0.12)',
              color: notified ? '#B4F04A' : 'rgba(255,255,255,0.6)',
              backgroundColor: notified ? 'rgba(180,240,74,0.06)' : 'transparent',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {notified ? `${absentCount}명에게 알림을 보냈어요! 📨` : `미접속 ${absentCount}명에게 알림 보내기`}
          </button>
        )}
        <button
          onClick={() => navigate('/workout/together/session')}
          className="w-full py-4 rounded-2xl font-bold text-base"
          style={{ backgroundColor: '#B4F04A', color: '#1C1C2E' }}
        >
          기록 시작
        </button>
      </div>
    </div>
  )
}
