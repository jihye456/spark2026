import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StepBar from '../../components/StepBar'

import dietImg from '../../assets/diet.png'
import bulkupImg from '../../assets/bulkup.png'
import fitnessImg from '../../assets/fitness.png'

const goals = [
  { id: 'diet',   title: '다이어트',          desc: '체중 감량 및 탄탄한 몸매',       image: dietImg },
  { id: 'bulk',   title: '벌크업',             desc: '근육 증량 및 근력 강화',          image: bulkupImg },
  { id: 'health', title: '체력 증진/건강 유지', desc: '지치지 않는 체력과 건강 유지',   image: fitnessImg },
]

export default function SurveyGoalPage() {
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
        <p className="text-sm font-bold text-white">운동 목표</p>
        <div className="w-5" />
      </div>

      <StepBar current={4} />

      <div className="px-5 flex-1">
        <p className="text-white text-xl font-bold mb-1">운동의 목표가 어떻게 되시나요?</p>
        <p className="text-white/40 text-sm mb-5">목표에 따라 캐릭터가 성장하는 모습이 달라집니다.</p>

        {/* 안내 박스 */}
        <div className="flex gap-2.5 bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">
          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-[10px] font-bold">i</span>
          </div>
          <p className="text-xs text-white/50 leading-relaxed">
            입력하신 정보는 오직 유저님의 운동에 따라 변화하는 개인 맞춤형 캐릭터를 생성하는 데에만 안전하게 사용됩니다.
          </p>
        </div>

        {/* 목표 선택 */}
        <div className="space-y-3">
          {goals.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelected(g.id)}
              className="w-full flex items-center gap-4 p-4 rounded-2xl border transition-all"
              style={{
                backgroundColor: selected === g.id ? 'rgba(180,240,74,0.08)' : 'rgba(255,255,255,0.03)',
                borderColor: selected === g.id ? '#B4F04A' : 'rgba(255,255,255,0.1)',
              }}
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 flex-shrink-0 flex items-center justify-center">
                <img src={g.image} alt={g.title} className="w-7 h-7 object-contain" />
              </div>

              <div className="flex-1 text-left">
                <p className="text-sm font-bold text-white mb-0.5">{g.title}</p>
                <p className="text-xs text-white/40">{g.desc}</p>
              </div>

              {/* 라디오 */}
              <div style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                border: `2px solid ${selected === g.id ? '#B4F04A' : 'rgba(255,255,255,0.25)'}`,
                backgroundColor: selected === g.id ? '#B4F04A' : 'transparent',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {selected === g.id && (
                  <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#1C1C2E' }} />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pb-10 pt-4">
        <button
          onClick={() => selected && navigate('/auth/survey/tendency')}
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
