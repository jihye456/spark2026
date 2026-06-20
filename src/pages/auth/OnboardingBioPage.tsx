import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StepBar from '../../components/StepBar'

const levelOptions = ['입문자', '초보', '중급자', '고급자']
const scheduleOptions = ['평일 아침', '평일 저녁', '주말 오전', '주말 오후', '언제든지']

export default function OnboardingBioPage() {
  const navigate = useNavigate()
  const [bio, setBio] = useState('')
  const [career, setCareer] = useState('')
  const [level, setLevel] = useState<string | null>(null)
  const [schedules, setSchedules] = useState<string[]>([])

  const toggleSchedule = (s: string) =>
    setSchedules((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s])

  return (
    <div className="min-h-screen bg-fig flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4">
        <button onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <p className="text-sm font-bold text-white">자기소개</p>
        <div className="w-12" />
      </div>

      <StepBar current={9} />

      <div className="px-5 flex-1 space-y-5">
        <div>
          <p className="text-white text-xl font-bold mb-1">조금 더 알려주세요</p>
          <p className="text-white/40 text-sm">함께할 운동 친구들에게 나를 소개해요</p>
        </div>

        {/* 자기소개 */}
        <div>
          <label className="text-xs text-white/40 mb-1.5 block">자기소개</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value.slice(0, 100))}
            placeholder="간단히 소개해주세요!"
            rows={3}
            className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-lime/50 transition-colors resize-none"
          />
          <p className="text-[10px] text-white/20 text-right mt-1">{bio.length}/100</p>
        </div>

        {/* 운동 경력 */}
        <div>
          <label className="text-xs text-white/40 mb-1.5 block">운동 경력</label>
          <input
            type="text"
            value={career}
            onChange={(e) => setCareer(e.target.value)}
            placeholder="예) 러닝 3년, 헬스 1년"
            className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-lime/50 transition-colors"
          />
        </div>

        {/* 실력 수준 */}
        <div>
          <label className="text-xs text-white/40 mb-2 block">나의 운동 수준</label>
          <div className="grid grid-cols-4 gap-2">
            {levelOptions.map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`py-2 rounded-xl text-xs font-medium border transition-all ${
                  level === l ? 'bg-lime text-fig border-lime' : 'bg-card border-white/10 text-white/50'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* 선호 운동 시간대 */}
        <div>
          <label className="text-xs text-white/40 mb-2 block">선호 운동 시간대</label>
          <div className="flex flex-wrap gap-2">
            {scheduleOptions.map((s) => (
              <button
                key={s}
                onClick={() => toggleSchedule(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  schedules.includes(s) ? 'bg-lime text-fig border-lime' : 'bg-card border-white/10 text-white/50'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

      </div>

      <div className="px-5 pb-10 pt-4">
        <button
          onClick={() => navigate('/auth/complete')}
          className="w-full py-4 bg-lime text-fig font-bold text-sm rounded-2xl"
        >
          다음
        </button>
      </div>
    </div>
  )
}
