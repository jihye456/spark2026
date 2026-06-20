import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import runImg from '../../assets/run.png'

const GOAL_KM = 3.0

function fmtTime(s: number) {
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

function fmtPace(seconds: number, km: number) {
  if (km < 0.01) return "--'--\""
  const sPerKm = seconds / km
  const m = Math.floor(sPerKm / 60)
  const s = Math.floor(sPerKm % 60)
  return `${m}'${String(s).padStart(2, '0')}"`
}

export default function WorkoutSessionPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const sport = location.state?.sport ?? { name: '달리기', image: runImg }

  const [running, setRunning] = useState(true)
  const [seconds, setSeconds] = useState(0)
  const [km, setKm] = useState(0)
  const [showNearGoal, setShowNearGoal] = useState(false)
  const [showGoalDone, setShowGoalDone] = useState(false)
  const [showStopModal, setShowStopModal] = useState(false)
  const nearRef = useRef(false)
  const doneRef = useRef(false)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      setSeconds((s) => s + 1)
      setKm((d) => {
        const next = d + 0.004
        if (next >= GOAL_KM * 0.8 && !nearRef.current) {
          nearRef.current = true
          setShowNearGoal(true)
        }
        if (next >= GOAL_KM && !doneRef.current) {
          doneRef.current = true
          setShowNearGoal(false)
          setShowGoalDone(true)
          setRunning(false)
        }
        return next
      })
    }, 1000)
    return () => clearInterval(id)
  }, [running])

  const calories = Math.round(km * 65)
  const goalPct = Math.min((km / GOAL_KM) * 100, 100)

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#1C1C2E' }}>
      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 pt-14 pb-2">
        <div className="flex items-center gap-2">
          <img src={sport.image} alt={sport.name} className="w-6 h-6 object-contain" />
          <p className="text-white font-bold text-sm">{sport.name}</p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full font-bold"
          style={{ backgroundColor: running ? 'rgba(180,240,74,0.12)' : 'rgba(255,160,60,0.12)', color: running ? '#B4F04A' : '#FFA03C' }}>
          {running ? '운동 중' : '일시정지'}
        </span>
      </div>

      <div className="flex-1 flex flex-col px-5">
        {/* 타이머 */}
        <div className="text-center pt-8 pb-4">
          <p className="font-mono font-bold text-white" style={{ fontSize: 52, letterSpacing: 2 }}>{fmtTime(seconds)}</p>
          <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>운동 시간</p>
        </div>

        {/* 거리 */}
        <div className="text-center pb-8">
          <div className="flex items-end justify-center gap-2">
            <p className="font-mono font-bold text-white" style={{ fontSize: 48 }}>{km.toFixed(2)}</p>
            <p className="text-white/40 text-xl mb-2">km</p>
          </div>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>달성 거리</p>
        </div>

        {/* 통계 */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="rounded-2xl p-4 text-center border border-white/8" style={{ backgroundColor: '#2C2C3E' }}>
            <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>페이스</p>
            <p className="text-white font-bold text-lg font-mono">{fmtPace(seconds, km)}</p>
          </div>
          <div className="rounded-2xl p-4 text-center border border-white/8" style={{ backgroundColor: '#2C2C3E' }}>
            <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>칼로리</p>
            <p className="text-white font-bold text-lg">{calories} kcal</p>
          </div>
        </div>

        {/* 목표 진행 */}
        <div className="rounded-2xl p-4 mb-6 border border-white/8" style={{ backgroundColor: '#2C2C3E' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>오늘 목표</p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{km.toFixed(2)}km / {GOAL_KM}km</p>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${goalPct}%`, backgroundColor: '#B4F04A' }} />
          </div>
          <p className="text-right text-[10px] mt-1 font-bold" style={{ color: '#B4F04A' }}>{Math.round(goalPct)}%</p>
        </div>

        <div className="flex-1" />

        {/* 컨트롤 */}
        <div className="flex items-center justify-center gap-12 pb-12">
          <button
            onClick={() => setRunning((r) => !r)}
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ border: '2px solid rgba(255,255,255,0.2)' }}
          >
            {running ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="6" y="4" width="4" height="16" rx="1" fill="white" />
                <rect x="14" y="4" width="4" height="16" rx="1" fill="white" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 3L19 12L5 21V3Z" fill="white" />
              </svg>
            )}
          </button>
          <button
            onClick={() => setShowStopModal(true)}
            className="w-18 h-18 rounded-full flex items-center justify-center shadow-lg"
            style={{ width: 72, height: 72, backgroundColor: '#B4F04A', boxShadow: '0 0 24px rgba(180,240,74,0.35)' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="5" y="5" width="14" height="14" rx="2" fill="#1C1C2E" />
            </svg>
          </button>
        </div>
      </div>

      {/* 목표 근접 알림 */}
      {showNearGoal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center pb-24"
          style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
          onClick={() => setShowNearGoal(false)}>
          <div className="w-full mx-4 rounded-3xl p-5 border border-white/8"
            style={{ backgroundColor: '#2C2C3E', maxWidth: 390 }}
            onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(180,240,74,0.15)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 20h20L12 2z" stroke="#B4F04A" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="M12 9v4M12 16h.01" stroke="#B4F04A" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-sm">목표까지 얼마 남았어요!</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {(GOAL_KM - km).toFixed(2)}km 더 달리면 목표 달성!
                </p>
              </div>
            </div>
            <button onClick={() => setShowNearGoal(false)}
              className="w-full py-3 rounded-2xl text-sm font-bold"
              style={{ backgroundColor: 'rgba(180,240,74,0.12)', color: '#B4F04A' }}>
              계속 달리기
            </button>
          </div>
        </div>
      )}

      {/* 목표 달성 알림 */}
      {showGoalDone && (
        <div className="fixed inset-0 z-50 flex items-end justify-center pb-24"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="w-full mx-4 rounded-3xl p-6 border border-white/8"
            style={{ backgroundColor: '#2C2C3E', maxWidth: 390 }}>
            <div className="text-center mb-5">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: 'rgba(180,240,74,0.15)', border: '2px solid rgba(180,240,74,0.3)' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13L9 17L19 7" stroke="#B4F04A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-white font-bold text-base">오늘 운동 목표 달성!</p>
              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{GOAL_KM}km를 완주했습니다 🎉</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowGoalDone(false)}
                className="flex-1 py-3 rounded-2xl text-sm font-medium"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}>
                계속하기
              </button>
              <button
                onClick={() => navigate('/workout/complete', { state: { seconds, km, calories, sport } })}
                className="flex-1 py-3 rounded-2xl text-sm font-bold"
                style={{ backgroundColor: '#B4F04A', color: '#1C1C2E' }}>
                종료하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 종료 확인 모달 */}
      {showStopModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
          onClick={() => setShowStopModal(false)}>
          <div className="w-full rounded-2xl p-5" style={{ backgroundColor: '#2C2C3E', maxWidth: 320 }}
            onClick={(e) => e.stopPropagation()}>
            <p className="text-white font-bold text-base mb-1">운동을 종료할까요?</p>
            <p className="text-xs mb-5" style={{ color: 'rgba(255,255,255,0.4)' }}>지금까지의 기록이 저장됩니다.</p>
            <div className="flex gap-2">
              <button onClick={() => setShowStopModal(false)}
                className="flex-1 py-3 rounded-xl text-sm font-medium"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}>
                계속하기
              </button>
              <button
                onClick={() => navigate('/workout/complete', { state: { seconds, km, calories, sport } })}
                className="flex-1 py-3 rounded-xl text-sm font-bold"
                style={{ backgroundColor: 'rgba(180,240,74,0.15)', color: '#B4F04A' }}>
                종료하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
