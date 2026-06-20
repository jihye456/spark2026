import { useNavigate, useLocation } from 'react-router-dom'
import { ParticipantProfile } from '../../components/ParticipantProfileSheet'
import lv1Img from '../../assets/lv1.png'
import lv2Img from '../../assets/lv2.png'
import lv3Img from '../../assets/lv3.png'

function getLevelImage(levelLabel: string): string {
  if (levelLabel === '숙련자') return lv3Img
  if (levelLabel === '중급자') return lv2Img
  return lv1Img
}

export default function ParticipantProfilePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const p = location.state?.participant as ParticipantProfile | undefined

  if (!p) {
    navigate(-1)
    return null
  }

  const trustRows = [
    [
      { label: '운동 횟수', value: `${p.trust.workoutCount}회` },
      { label: '번개 활동', value: `${p.trust.meetupCount}회` },
    ],
    [
      { label: '추천', value: `${p.trust.recommend}` },
      { label: '레벨 정확해요', value: `${p.trust.levelAccurate}` },
    ],
    [
      { label: '또 만나고 싶어요', value: `${p.trust.meetAgain}` },
      { label: '시간 약속을 잘 지켜요', value: `${p.trust.punctual}` },
    ],
  ]

  return (
    <div className="min-h-screen bg-fig flex flex-col overflow-y-auto scrollbar-none pb-10">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4 flex-shrink-0">
        <button onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <p className="text-sm font-bold text-white">프로필</p>
        <div className="w-5" />
      </div>

      {/* 프로필 헤더 카드 */}
      <div className="px-5 mb-4">
        <div className="rounded-2xl p-5 border border-white/8" style={{ backgroundColor: '#2C2C3E' }}>
          <div className="flex items-center gap-4">
            {/* 프로필 이미지 */}
            <div
              className="w-20 h-20 rounded-2xl flex-shrink-0 overflow-hidden flex items-center justify-center"
              style={{
                background: p.isHost
                  ? 'linear-gradient(135deg, rgba(180,240,74,0.25), rgba(157,92,244,0.25))'
                  : 'rgba(157,92,244,0.15)',
                border: p.isHost ? '2px solid rgba(180,240,74,0.5)' : '2px solid rgba(157,92,244,0.3)',
              }}
            >
              <img
                src={getLevelImage(p.levelLabel)}
                alt="profile"
                className="w-14 h-14 object-contain"
              />
            </div>

            {/* 이름·정보 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-white font-bold text-lg leading-tight">{p.name}</p>
                {p.isHost && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: '#B4F04A', color: '#1C1C2E' }}>
                    모임장
                  </span>
                )}
              </div>
              <p className="text-white/45 text-sm mb-2">{p.age}세 · {p.gender} · LV.{p.level}</p>
              <span
                className="text-[11px] px-2.5 py-1 rounded-full font-medium"
                style={{ backgroundColor: 'rgba(157,92,244,0.15)', color: '#9D5CF4' }}
              >
                {p.levelLabel}
              </span>
            </div>
          </div>

          {/* 한 줄 소개 */}
          {p.bio && (
            <p className="text-white/55 text-sm leading-relaxed mt-4 pt-4 border-t border-white/8">
              {p.bio}
            </p>
          )}
        </div>
      </div>

      <div className="px-5 space-y-3">
        {/* 해시태그 */}
        <div className="flex flex-wrap gap-2">
          {p.hashtags.map((tag) => (
            <span key={tag} className="px-3 py-1.5 rounded-full text-xs border"
              style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.55)' }}>
              {tag}
            </span>
          ))}
        </div>

        {/* 신뢰도 */}
        <div className="rounded-2xl p-4 border border-white/8" style={{ backgroundColor: '#2C2C3E' }}>
          <p className="text-xs font-bold mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>신뢰도</p>
          <div className="space-y-2">
            {trustRows.map((row, ri) => (
              <div key={ri} className="grid grid-cols-2 gap-2">
                {row.map((chip) => (
                  <div
                    key={chip.label}
                    className="rounded-xl px-3 py-2.5 flex flex-col items-center justify-center text-center"
                    style={{ backgroundColor: 'rgba(180,240,74,0.08)', border: '1px solid rgba(180,240,74,0.2)' }}
                  >
                    <p className="text-[10px] mb-0.5" style={{ color: 'rgba(180,240,74,0.7)' }}>{chip.label}</p>
                    <p className="text-sm font-bold" style={{ color: '#B4F04A' }}>{chip.value}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 운동 성향 */}
        <div className="rounded-2xl p-4 border border-white/8" style={{ backgroundColor: '#2C2C3E' }}>
          <p className="text-xs font-bold mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>운동 성향</p>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
            {p.tendency}
          </p>
        </div>

        {/* 운동 레벨 */}
        <div className="rounded-2xl p-4 border border-white/8" style={{ backgroundColor: '#2C2C3E' }}>
          <p className="text-xs font-bold mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>운동 레벨</p>
          <div className="flex items-center gap-3">
            <img src={getLevelImage(p.levelLabel)} alt="level" className="w-10 h-10 object-contain" />
            <div>
              <p className="text-white text-sm font-bold">{p.levelLabel}</p>
              <p className="text-white/35 text-xs mt-0.5">LV.{p.level}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
