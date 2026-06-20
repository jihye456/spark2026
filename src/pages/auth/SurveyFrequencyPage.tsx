import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StepBar from '../../components/StepBar'

const options = [
  { id: 'rarely', title: '거의 안 함', desc: '주 0~1회', icon: '🚶' },
  { id: 'light', title: '주 1-2 회', desc: '가벼운 활동', icon: '🏃' },
  { id: 'regular', title: '주 3-4 회', desc: '정기적인 루틴', icon: '⚡' },
  { id: 'intense', title: '주 5 회 이상', desc: '고강도 운동', icon: '🔥' },
]

export default function SurveyFrequencyPage() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-fig flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4">
        <button onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <p className="text-sm font-bold text-white">사용자 조사</p>
        <div className="w-5" />
      </div>

      <StepBar current={7} />

      <div className="px-5 flex-1">
        <p className="text-white text-xl font-bold mb-3 leading-snug">
          평소 주에 운동을<br />얼마나 자주 하시나요?
        </p>
        <p className="text-white/40 text-sm mb-6 leading-relaxed">
          이 답변은 회원님에게 딱 맞는 운동 여정을 설계하고,{' '}
          달성 가능한 목표를 설정하는 데 도움이 됩니다.
        </p>

        <div className="space-y-3">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl border transition-all"
              style={{
                backgroundColor: selected === opt.id ? 'rgba(180,240,74,0.08)' : 'rgba(44,44,62,0.8)',
                borderColor: selected === opt.id ? '#B4F04A' : 'rgba(255,255,255,0.08)',
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
                style={{ backgroundColor: selected === opt.id ? 'rgba(180,240,74,0.15)' : 'rgba(255,255,255,0.05)' }}
              >
                {opt.icon}
              </div>
              <div className="text-left">
                <p className="text-sm font-bold" style={{ color: selected === opt.id ? '#B4F04A' : '#ffffff' }}>
                  {opt.title}
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {opt.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pb-10 pt-4">
        <button
          onClick={() => selected && navigate('/auth/onboarding/time')}
          className="w-full py-4 font-bold text-sm rounded-2xl transition-all"
          style={{
            backgroundColor: selected ? '#B4F04A' : 'rgba(255,255,255,0.05)',
            color: selected ? '#1C1C2E' : 'rgba(255,255,255,0.2)',
          }}
        >
          다음
        </button>
      </div>
    </div>
  )
}
