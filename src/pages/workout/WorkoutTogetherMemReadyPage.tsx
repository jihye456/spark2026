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
  { id: 1, name: '강아지', initial: '강', isMe: false, isHost: true,  connected: true,  color: '#B4F04A' },
  { id: 2, name: '개나리', initial: '개', isMe: true,  isHost: false, connected: false, color: '#9D5CF4' },
  { id: 3, name: '문어',   initial: '문', isMe: false, isHost: false, connected: false, color: '#FF7043' },
  { id: 4, name: '하늘',   initial: '하', isMe: false, isHost: false, connected: false, color: '#29B6F6' },
]

export default function WorkoutTogetherMemReadyPage() {
  const navigate = useNavigate()
  const [members, setMembers] = useState(INITIAL_MEMBERS)
  const [started, setStarted] = useState(false)

  const connectedCount = members.filter((m) => m.connected).length

  const handleStart = () => {
    setMembers((prev) => prev.map((m) => m.isMe ? { ...m, connected: true } : m))
    setStarted(true)
    setTimeout(() => navigate('/workout/session'), 1200)
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
          style={{ backgroundColor: 'rgba(157,92,244,0.12)', color: '#9D5CF4' }}>모임원</span>
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
            {connectedCount + (started ? 1 : 0)}/{members.length} 접속
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {members.map((m) => {
            const isConnected = m.connected || (m.isMe && started)
            return (
              <div
                key={m.id}
                className="rounded-2xl p-4 border flex flex-col items-center"
                style={{
                  backgroundColor: '#2C2C3E',
                  borderColor: isConnected ? `${m.color}35` : 'rgba(255,255,255,0.07)',
                }}
              >
                <div className="relative mb-2">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: `${m.color}18`,
                      border: isConnected ? `2px solid ${m.color}` : '2px solid rgba(255,255,255,0.1)',
                      boxShadow: isConnected ? `0 0 14px ${m.color}50` : 'none',
                    }}
                  >
                    <span className="text-xl font-bold" style={{ color: isConnected ? m.color : 'rgba(255,255,255,0.3)' }}>
                      {m.initial}
                    </span>
                  </div>
                  {isConnected && (
                    <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-fig"
                      style={{ backgroundColor: '#B4F04A' }} />
                  )}
                </div>
                <p className="text-sm font-medium text-white mb-0.5">{m.name}{m.isMe ? ' (나)' : ''}</p>
                {m.isHost && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full mb-1"
                    style={{ backgroundColor: '#B4F04A', color: '#1C1C2E' }}>모임장</span>
                )}
                <p className="text-[11px]" style={{ color: isConnected ? '#B4F04A' : 'rgba(255,255,255,0.25)' }}>
                  {isConnected ? '접속 중' : '미접속'}
                </p>
              </div>
            )
          })}
        </div>

        {started && (
          <div className="mt-4 rounded-xl px-4 py-3 flex items-center gap-2"
            style={{ backgroundColor: 'rgba(180,240,74,0.08)', border: '1px solid rgba(180,240,74,0.2)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 13L9 17L19 7" stroke="#B4F04A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-xs font-medium" style={{ color: '#B4F04A' }}>출석 완료! 운동 화면으로 이동 중...</p>
          </div>
        )}
      </div>

      {/* 하단 버튼 */}
      <div className="px-5 pb-10 pt-5">
        <button
          onClick={handleStart}
          disabled={started}
          className="w-full py-4 rounded-2xl font-bold text-base transition-all"
          style={{
            backgroundColor: started ? 'rgba(180,240,74,0.15)' : '#B4F04A',
            color: started ? '#B4F04A' : '#1C1C2E',
          }}
        >
          {started ? '운동 시작 중...' : '운동 시작'}
        </button>
      </div>
    </div>
  )
}
