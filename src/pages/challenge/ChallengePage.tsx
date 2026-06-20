import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import exerciseBadge from '../../assets/Badge-exerciseBadge.png'
import groupBadge from '../../assets/groupBadge.png'
import eventBadge from '../../assets/Badge-eventBadge.png'

type Category = '전체' | '운동' | '모임' | '이벤트'
type ViewMode = 'list' | 'grid'

interface Challenge {
  id: number
  category: '운동' | '모임' | '이벤트'
  title: string
  reward: number
  achieved: number
  total: number
  done: boolean
  isEvent?: boolean
}

const challenges: Challenge[] = [
  { id: 1, category: '운동', title: '30일 러닝 챌린지', reward: 25, achieved: 30, total: 30, done: true },
  { id: 2, category: '운동', title: '30일 러닝 챌린지', reward: 25, achieved: 30, total: 30, done: true },
  { id: 3, category: '모임', title: '번개 모임 참여 챌린지', reward: 50, achieved: 5, total: 10, done: false },
  { id: 4, category: '이벤트', title: '5km 한강 달리기 이벤트', reward: 100, achieved: 0, total: 1, done: false, isEvent: true },
  { id: 5, category: '운동', title: '주 3회 운동 챌린지', reward: 30, achieved: 3, total: 3, done: true },
  { id: 6, category: '운동', title: '걷기 10km 챌린지', reward: 20, achieved: 7, total: 10, done: false },
]

const BADGE_IMAGE: Record<'운동' | '모임' | '이벤트', string> = {
  '운동': exerciseBadge,
  '모임': groupBadge,
  '이벤트': eventBadge,
}

const BADGE_BG: Record<'운동' | '모임' | '이벤트', string> = {
  '운동': '#C8E6C9',
  '모임': '#D1C4E9',
  '이벤트': '#FFE082',
}

function BadgeIcon({ category, size = 28 }: { category: '운동' | '모임' | '이벤트'; size?: number }) {
  return <img src={BADGE_IMAGE[category]} alt={category} style={{ width: size, height: size, objectFit: 'contain' }} />
}

function ProgressBar({ value, done }: { value: number; done: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
        <div className="h-full rounded-full transition-all" style={{
          width: `${value}%`,
          backgroundColor: done ? '#B4F04A' : '#9D5CF4',
        }} />
      </div>
      <span className="text-[10px] flex-shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }}>
        달성률 {value}%
      </span>
    </div>
  )
}

export default function ChallengePage() {
  const navigate = useNavigate()
  const [category, setCategory] = useState<Category>('전체')
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [modalChallenge, setModalChallenge] = useState<Challenge | null>(null)

  const filtered = challenges.filter((c) => category === '전체' || c.category === category)

  const total = challenges.length
  const achieved = challenges.filter((c) => c.done).length
  const rate = Math.round((achieved / total) * 100)

  // SVG donut
  const R = 36
  const circ = 2 * Math.PI * R
  const offset = circ * (1 - rate / 100)

  const handleChallengeClick = (c: Challenge) => {
    if (c.isEvent) {
      navigate('/challenge/event')
    } else {
      setModalChallenge(c)
    }
  }

  const achieveRate = (c: Challenge) => Math.round((c.achieved / c.total) * 100)

  return (
    <div className="min-h-screen bg-fig flex flex-col">
      {/* 헤더 */}
      <div className="px-5 pt-14 pb-4">
        <p className="text-white font-bold text-lg">챌린지</p>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none pb-24 px-5 space-y-4">
        {/* 달성률 대시보드 */}
        <div className="rounded-2xl p-5 border border-white/8" style={{ backgroundColor: '#2C2C3E' }}>
          <p className="text-white font-bold text-base leading-tight">오늘도</p>
          <p className="text-white font-bold text-xl mb-4">챌린지 진행중!</p>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/40 text-xs mb-1">챌린지 달성도</p>
              <p className="text-white font-bold text-2xl">{achieved}/{total}</p>
            </div>

            {/* 도넛 그래프 */}
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r={R} fill="none"
                  stroke="rgba(255,255,255,0.08)" strokeWidth="9" />
                <circle cx="40" cy="40" r={R} fill="none"
                  stroke="#B4F04A" strokeWidth="9"
                  strokeLinecap="round"
                  strokeDasharray={circ}
                  strokeDashoffset={offset}
                  transform="rotate(-90 40 40)" />
              </svg>
              <p className="absolute text-white font-bold text-sm">{rate}%</p>
            </div>
          </div>
        </div>

        {/* 카테고리 필터 + 뷰 전환 */}
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5 flex-1">
            {(['전체', '운동', '모임', '이벤트'] as Category[]).map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className="px-3 py-1.5 rounded-full text-xs font-bold flex-shrink-0 transition-all"
                style={{
                  backgroundColor: category === c ? '#B4F04A' : 'rgba(255,255,255,0.08)',
                  color: category === c ? '#1C1C2E' : 'rgba(255,255,255,0.5)',
                }}
              >
                {c}
              </button>
            ))}
          </div>

          {/* 리스트/그리드 토글 */}
          <button
            onClick={() => setViewMode((v) => v === 'list' ? 'grid' : 'list')}
            className="w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0"
            style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
          >
            {viewMode === 'list' ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="7" height="7" rx="1" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
                <rect x="14" y="3" width="7" height="7" rx="1" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
                <rect x="3" y="14" width="7" height="7" rx="1" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
                <rect x="14" y="14" width="7" height="7" rx="1" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

        {/* 리스트 뷰 */}
        {viewMode === 'list' && (
          <div className="space-y-3">
            {filtered.map((c) => (
              <button
                key={c.id}
                onClick={() => handleChallengeClick(c)}
                className="w-full rounded-2xl px-4 py-3 border border-white/8 text-left"
                style={{ backgroundColor: '#2C2C3E' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: BADGE_BG[c.category] }}>
                    <BadgeIcon category={c.category} size={32} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-white text-xs font-bold truncate pr-2">{c.title}</p>
                      {c.done && (
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: 'rgba(180,240,74,0.15)', color: '#B4F04A' }}>
                          완료
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      보상: {c.reward} xp
                    </p>
                    <ProgressBar value={achieveRate(c)} done={c.done} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* 그리드 뷰 */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-3 gap-2">
            {filtered.map((c) => (
              <button
                key={c.id}
                onClick={() => handleChallengeClick(c)}
                className="aspect-square rounded-2xl flex flex-col items-center justify-center gap-1.5 border border-white/8"
                style={{ backgroundColor: '#2C2C3E' }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: BADGE_BG[c.category] }}>
                  <BadgeIcon category={c.category} size={32} />
                </div>
                {c.done && (
                  <span className="text-[8px] font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: 'rgba(180,240,74,0.15)', color: '#B4F04A' }}>
                    완료
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 챌린지 규칙 모달 */}
      {modalChallenge && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center pb-20"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
          onClick={() => setModalChallenge(null)}
        >
          <div
            className="w-full rounded-3xl p-5 mx-4"
            style={{ backgroundColor: '#2C2C3E', maxWidth: 390 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 헤더: X 버튼 */}
            <div className="flex justify-end mb-3">
              <button onClick={() => setModalChallenge(null)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* 챌린지 카드 요약 */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: BADGE_BG[modalChallenge.category] }}>
                <BadgeIcon category={modalChallenge.category} size={36} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-white text-sm font-bold truncate pr-2">{modalChallenge.title}</p>
                  {modalChallenge.done && (
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: 'rgba(180,240,74,0.15)', color: '#B4F04A' }}>
                      완료
                    </span>
                  )}
                </div>
                <p className="text-[10px] mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  보상: {modalChallenge.reward} xp
                </p>
                <ProgressBar value={achieveRate(modalChallenge)} done={modalChallenge.done} />
              </div>
            </div>

            {/* 규칙 안내 */}
            <div className="rounded-xl px-4 py-3 mb-2"
              style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                ▶ 운동 시작 버튼을 누른 뒤 1분을 초과하고 소모 칼로리가 있어야 1일 운동으로 인정돼요
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
