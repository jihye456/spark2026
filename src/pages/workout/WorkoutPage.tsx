import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import runImg from '../../assets/run.png'
import bikeImg from '../../assets/bike.png'
import swimImg from '../../assets/swim.png'
import gymImg from '../../assets/gym.png'
import tennisImg from '../../assets/tennis.png'

const SPORTS = [
  { id: 'run',    name: '달리기',  image: runImg },
  { id: 'bike',   name: '자전거',  image: bikeImg },
  { id: 'walk',   name: '걷기',    image: runImg },
  { id: 'gym',    name: '근력',    image: gymImg },
  { id: 'swim',   name: '수영하기', image: swimImg },
  { id: 'tennis', name: '테니스',  image: tennisImg },
]

const BEST: Record<string, { time: string; dist: string }> = {
  run:    { time: '28:45', dist: '5.2km' },
  bike:   { time: '45:12', dist: '12.8km' },
  walk:   { time: '52:30', dist: '4.1km' },
  gym:    { time: '60:00', dist: '--' },
  swim:   { time: '35:20', dist: '1.5km' },
  tennis: { time: '48:00', dist: '--' },
}

const CLIMB = { dist: 3.2, goal: 5, kcal: 195, goalKcal: 300, time: 19, goalTime: 30 }

export default function WorkoutPage() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState('run')
  const best = BEST[selected]
  const [showTogetherModal, setShowTogetherModal] = useState(false)
  const [showNoMeetupModal, setShowNoMeetupModal] = useState(false)

  const goalPct = Math.round((CLIMB.dist / CLIMB.goal) * 100)
  const R = 28
  const circ = 2 * Math.PI * R
  const offset = circ * (1 - goalPct / 100)

  return (
    <div className="min-h-screen bg-fig flex flex-col">
      <div className="px-5 pt-14 pb-4">
        <p className="text-white font-bold text-lg">운동 시작</p>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none pb-24 px-5 space-y-4">
        {/* 오늘 목표 카드 */}
        <div className="rounded-2xl p-4 border border-white/8" style={{ backgroundColor: '#2C2C3E' }}>
          <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>오늘의 운동 목표를 달성해요!</p>
          <div className="flex items-center gap-4">
            <div className="flex-1 space-y-2">
              {[
                { label: '거리', value: `${CLIMB.dist}km`, goal: `${CLIMB.goal}km` },
                { label: '시간', value: `${CLIMB.time}분`, goal: `${CLIMB.goalTime}분` },
                { label: '칼로리', value: `${CLIMB.kcal}kcal`, goal: `${CLIMB.goalKcal}kcal` },
              ].map(({ label, value, goal }) => (
                <div key={label} className="flex items-center justify-between text-xs">
                  <span style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</span>
                  <span className="text-white font-medium">{value} <span style={{ color: 'rgba(255,255,255,0.3)' }}>/ {goal}</span></span>
                </div>
              ))}
            </div>
            {/* 도넛 링 */}
            <div className="relative w-16 h-16 flex-shrink-0">
              <svg width="64" height="64" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r={R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="6" />
                <circle cx="32" cy="32" r={R} fill="none" stroke="#B4F04A" strokeWidth="6"
                  strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
                  transform="rotate(-90 32 32)" />
              </svg>
              <p className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">{goalPct}%</p>
            </div>
          </div>
        </div>

        {/* 운동 종목 선택 */}
        <div>
          <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>운동 종목 선택</p>
          <div className="grid grid-cols-2 gap-2">
            {SPORTS.map((sport) => (
              <button
                key={sport.id}
                onClick={() => setSelected(sport.id)}
                className="rounded-2xl p-4 flex items-center gap-3 border transition-all"
                style={{
                  backgroundColor: selected === sport.id ? 'rgba(180,240,74,0.1)' : '#2C2C3E',
                  borderColor: selected === sport.id ? 'rgba(180,240,74,0.4)' : 'rgba(255,255,255,0.06)',
                }}
              >
                <img src={sport.image} alt={sport.name} className="w-8 h-8 object-contain" />
                <span className="text-sm font-bold" style={{ color: selected === sport.id ? '#B4F04A' : 'rgba(255,255,255,0.8)' }}>
                  {sport.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 최고 성적 */}
        <div className="rounded-2xl p-4 border border-white/8" style={{ backgroundColor: '#2C2C3E' }}>
          <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>최고 성적</p>
          <div className="grid grid-cols-2 gap-3">
            {[{ label: '시간', value: best.time }, { label: '거리', value: best.dist }].map(({ label, value }) => (
              <div key={label} className="rounded-xl p-3" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                <p className="text-[10px] mb-1" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</p>
                <p className="text-white font-bold text-base">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 버튼 */}
        <div className="space-y-2 pb-2">
          <button
            onClick={() => navigate('/workout/session', { state: { sport: SPORTS.find(s => s.id === selected) } })}
            className="w-full py-4 rounded-2xl font-bold text-base"
            style={{ backgroundColor: '#B4F04A', color: '#1C1C2E' }}
          >
            운동 시작하기
          </button>
          <button
            onClick={() => navigate('/workout/record')}
            className="w-full py-4 rounded-2xl font-bold text-base border"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', borderColor: 'rgba(255,255,255,0.1)' }}
          >
            운동 기록하기
          </button>
          <button
            onClick={() => setShowTogetherModal(true)}
            className="w-full py-4 rounded-2xl font-bold text-base border flex items-center justify-center gap-2"
            style={{ backgroundColor: 'rgba(157,92,244,0.08)', color: '#9D5CF4', borderColor: 'rgba(157,92,244,0.25)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#9D5CF4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9" cy="7" r="4" stroke="#9D5CF4" strokeWidth="2" />
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#9D5CF4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            같이 운동하기
          </button>
        </div>
      </div>

      {/* 모임장 여부 확인 팝업 (WOK-010) */}
      {showTogetherModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-8"
          style={{ backgroundColor: 'rgba(0,0,0,0.65)' }}
          onClick={() => setShowTogetherModal(false)}
        >
          <div className="w-full rounded-2xl p-6" style={{ backgroundColor: '#2C2C3E', maxWidth: 320 }}
            onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: 'rgba(157,92,244,0.12)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#9D5CF4" strokeWidth="2" />
                <path d="M12 8v4M12 16h.01" stroke="#9D5CF4" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-white font-bold text-base text-center mb-1">번개를 오픈한</p>
            <p className="text-white font-bold text-base text-center mb-6">모임장이신가요?</p>
            <div className="flex gap-3">
              <button
                onClick={() => { setShowTogetherModal(false); navigate('/workout/together/cap-ready') }}
                className="flex-1 py-3 rounded-xl text-sm font-bold"
                style={{ backgroundColor: '#9D5CF4', color: '#fff' }}
              >예</button>
              <button
                onClick={() => { setShowTogetherModal(false); setShowNoMeetupModal(true) }}
                className="flex-1 py-3 rounded-xl text-sm font-bold"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}
              >아니오</button>
            </div>
          </div>
        </div>
      )}

      {/* 모임 미가입 안내 팝업 (WOK-010 → 아니오) */}
      {showNoMeetupModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-8"
          style={{ backgroundColor: 'rgba(0,0,0,0.65)' }}
          onClick={() => setShowNoMeetupModal(false)}
        >
          <div className="w-full rounded-2xl p-6" style={{ backgroundColor: '#2C2C3E', maxWidth: 320 }}
            onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: 'rgba(255,160,60,0.12)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#FFA03C" strokeWidth="2" />
                <path d="M12 8v4M12 16h.01" stroke="#FFA03C" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-white font-bold text-base text-center mb-2">잇! 모임에 소속돼야</p>
            <p className="text-white font-bold text-base text-center mb-2">운동을 시작할 수 있어요!</p>
            <p className="text-xs text-center mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
              번개 모임에 참여하거나 직접 만들어보세요
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => { setShowNoMeetupModal(false); navigate('/meetup/create') }}
                className="flex-1 py-3 rounded-xl text-sm font-bold"
                style={{ backgroundColor: '#B4F04A', color: '#1C1C2E' }}
              >모임 만들기</button>
              <button
                onClick={() => { setShowNoMeetupModal(false); navigate('/meetup') }}
                className="flex-1 py-3 rounded-xl text-sm font-bold"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' }}
              >모임 찾아보기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
