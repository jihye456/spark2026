import { useNavigate, useLocation } from 'react-router-dom'
import runImg from '../../assets/run.png'

function fmtTime(s: number) {
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  if (h > 0) return `${h}시간 ${m}분 ${sec}초`
  if (m > 0) return `${m}분 ${sec}초`
  return `${sec}초`
}

function fmtPace(seconds: number, km: number) {
  if (km < 0.01) return '--'
  const sPerKm = seconds / km
  const m = Math.floor(sPerKm / 60)
  const s = Math.floor(sPerKm % 60)
  return `${m}'${String(s).padStart(2, '0')}"/km`
}

const GOAL_KM = 3.0

export default function WorkoutCompletePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const {
    seconds = 1820,
    km = 3.2,
    calories = 208,
    sport = { name: '달리기', image: runImg },
  } = location.state ?? {}

  const goalPct = Math.min(Math.round((km / GOAL_KM) * 100), 100)
  const goalAchieved = goalPct >= 100

  const stats = [
    { label: '운동 시간', value: fmtTime(seconds) },
    { label: '달성 거리', value: `${Number(km).toFixed(2)} km` },
    { label: '소모 칼로리', value: `${calories} kcal` },
    { label: '평균 페이스', value: fmtPace(seconds, km) },
  ]

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#1C1C2E' }}>
      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4">
        <div className="w-5" />
        <p className="text-white font-bold text-base">운동 완료</p>
        <div className="w-5" />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none pb-10 px-5">
        {/* 완료 배너 */}
        <div className="rounded-3xl p-6 mb-5 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(180,240,74,0.2) 0%, rgba(157,92,244,0.2) 100%)', border: '1px solid rgba(180,240,74,0.2)' }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"
            style={{ backgroundColor: goalAchieved ? '#B4F04A' : 'rgba(255,255,255,0.1)' }}>
            <img src={sport.image} alt={sport.name} className="w-9 h-9 object-contain" style={{ filter: goalAchieved ? 'brightness(0)' : 'none' }} />
          </div>
          {goalAchieved ? (
            <>
              <p className="text-white font-bold text-xl mb-1">오늘도 해냈어요! 🎉</p>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>목표를 달성했습니다. 정말 잘하셨어요!</p>
            </>
          ) : (
            <>
              <p className="text-white font-bold text-xl mb-1">수고하셨어요!</p>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>오늘도 운동했습니다. 내일도 화이팅!</p>
            </>
          )}
        </div>

        {/* 목표 달성률 */}
        <div className="rounded-2xl p-4 mb-4 border border-white/8" style={{ backgroundColor: '#2C2C3E' }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold text-white">목표 달성률</p>
            <span className="text-sm font-bold" style={{ color: goalAchieved ? '#B4F04A' : '#9D5CF4' }}>{goalPct}%</span>
          </div>
          <div className="h-3 rounded-full overflow-hidden mb-1" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
            <div className="h-full rounded-full transition-all"
              style={{ width: `${goalPct}%`, backgroundColor: goalAchieved ? '#B4F04A' : '#9D5CF4' }} />
          </div>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {Number(km).toFixed(2)}km / {GOAL_KM}km
          </p>
        </div>

        {/* 운동 통계 */}
        <div className="rounded-2xl p-4 mb-4 border border-white/8" style={{ backgroundColor: '#2C2C3E' }}>
          <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>운동 기록</p>
          <div className="grid grid-cols-2 gap-3">
            {stats.map(({ label, value }) => (
              <div key={label} className="rounded-xl p-3" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                <p className="text-[10px] mb-1" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</p>
                <p className="text-white font-bold text-sm">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 경험치 */}
        <div className="rounded-2xl p-4 mb-6 border border-white/8" style={{ backgroundColor: '#2C2C3E' }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold text-white">획득 경험치</p>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: 'rgba(180,240,74,0.15)', color: '#B4F04A' }}>
              +{Math.round(Number(km) * 10 + (goalAchieved ? 30 : 0))} XP
            </span>
          </div>
          <div className="flex items-center justify-between text-xs mb-2">
            <span style={{ color: 'rgba(255,255,255,0.35)' }}>NEXT LEVEL</span>
            <span style={{ color: 'rgba(255,255,255,0.35)' }}>1120 / 2080 EXP</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
            <div className="h-2 rounded-full" style={{ width: '54%', background: 'linear-gradient(90deg, #B4F04A, #9D5CF4)' }} />
          </div>
        </div>

        {/* 버튼 */}
        <div className="space-y-2">
          <button
            onClick={() => navigate('/workout')}
            className="w-full py-4 rounded-2xl font-bold text-base"
            style={{ backgroundColor: '#B4F04A', color: '#1C1C2E' }}
          >
            다시 운동하기
          </button>
          <button
            onClick={() => navigate('/home')}
            className="w-full py-4 rounded-2xl font-bold text-base border"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', borderColor: 'rgba(255,255,255,0.1)' }}
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  )
}
