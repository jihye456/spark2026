import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StepBar from '../../components/StepBar'

const timeOptions = [
  {
    label: '30분 미만',
    desc: '가볍게 짧고 빠른 운동을 선호해요 (런닝, 짧은 운동 등)',
  },
  {
    label: '30분 ~ 90분',
    desc: '적당한 시간에 집중적으로 운동하는 편이에요',
  },
  {
    label: '60분 ~ 90분',
    desc: '루틴이 있고 꾸준히 운동하는 편이에요 (헬스, 수영 등)',
  },
  {
    label: '90분 초과',
    desc: '다양한 종목을 오랫동안 즐기는 편이에요',
  },
]

export default function OnboardingTimePage() {
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
        <p className="text-sm font-bold text-white">평균 운동 시간</p>
        <div className="w-12" />
      </div>

      <StepBar current={8} />

      <div className="px-5 flex-1">
        <p className="text-white text-xl font-bold mb-1">한 번 운동할 때 평균적으로<br />얼마나 오래 하시나요?</p>
        <p className="text-white/40 text-sm mb-6">(평균 운동 시간)</p>

        <div className="space-y-3">
          {timeOptions.map((opt) => (
            <button
              key={opt.label}
              onClick={() => setSelected(opt.label)}
              className={`w-full text-left px-4 py-4 rounded-2xl border transition-all ${
                selected === opt.label
                  ? 'bg-lime/10 border-lime'
                  : 'bg-card border-white/5'
              }`}
            >
              <p className={`text-sm font-bold mb-1 ${selected === opt.label ? 'text-lime' : 'text-white'}`}>
                {opt.label}
              </p>
              <p className="text-xs text-white/40 leading-relaxed">{opt.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pb-10 pt-4">
        <button
          onClick={() => selected && navigate('/auth/onboarding/bio')}
          disabled={!selected}
          className={`w-full py-4 font-bold text-sm rounded-2xl transition-all ${selected ? 'bg-lime text-fig' : 'bg-white/5 text-white/20 cursor-not-allowed'}`}
        >
          다음
        </button>
      </div>
    </div>
  )
}
