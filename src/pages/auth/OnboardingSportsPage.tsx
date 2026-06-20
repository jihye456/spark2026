import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StepBar from '../../components/StepBar'

import runImg from '../../assets/run.png'
import gymImg from '../../assets/gym.png'
import bikeImg from '../../assets/bike.png'
import swimImg from '../../assets/swim.png'
import tennisImg from '../../assets/tennis.png'
import soccerImg from '../../assets/soccer.png'
import badmintonImg from '../../assets/badminton.png'
import basketballImg from '../../assets/basketball.png'
import climbImg from '../../assets/climb.png'
import golfImg from '../../assets/golf.png'
import bolingImg from '../../assets/boling.png'
import sparkImg from '../../assets/spark.png'

const sports = [
  { name: '러닝',   image: runImg },
  { name: 'GYM',   image: gymImg },
  { name: '자전거', image: bikeImg },
  { name: '수영',   image: swimImg },
  { name: '테니스', image: tennisImg },
  { name: '축구',   image: soccerImg },
  { name: '배드민턴', image: badmintonImg },
  { name: '농구',   image: basketballImg },
  { name: '등산',   image: climbImg },
  { name: '골프',   image: golfImg },
  { name: '볼링',   image: bolingImg },
]

export default function OnboardingSportsPage() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string[]>([])
  const [showModal, setShowModal] = useState(false)
  const [customInput, setCustomInput] = useState('')
  const [customSport, setCustomSport] = useState<string | null>(null)

  const toggle = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    )
  }

  const handleCustomAdd = () => {
    const trimmed = customInput.trim()
    if (!trimmed) return
    const prev = customSport
    if (prev) setSelected((s) => s.filter((x) => x !== prev))
    setCustomSport(trimmed)
    setSelected((s) => [...s.filter((x) => x !== prev), trimmed])
    setCustomInput('')
    setShowModal(false)
  }

  const isCustomSelected = customSport && selected.includes(customSport)

  return (
    <div className="min-h-screen bg-fig flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4">
        <button onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <p className="text-sm font-bold text-white">선호 운동 선택</p>
        <div className="w-12" />
      </div>

      <StepBar current={6} />

      <div className="px-5 flex-1">
        <p className="text-white text-xl font-bold mb-1">선호 운동 선택</p>
        <p className="text-white/40 text-sm mb-1">좋아하는 운동을 선택해주세요</p>
        <p className="text-white/30 text-xs mb-6">중복 선택 가능 ({selected.length}개 선택됨)</p>

        <div className="grid grid-cols-3 gap-3">
          {sports.map((sport) => {
            const isOn = selected.includes(sport.name)
            return (
              <button
                key={sport.name}
                onClick={() => toggle(sport.name)}
                className={`flex flex-col items-center justify-center py-5 rounded-2xl border transition-all ${
                  isOn ? 'bg-lime/10 border-lime' : 'bg-card border-white/5'
                }`}
              >
                <img src={sport.image} alt={sport.name} className="w-8 h-8 object-contain mb-2" />
                <span className={`text-xs font-medium ${isOn ? 'text-lime' : 'text-white/60'}`}>
                  {sport.name}
                </span>
              </button>
            )
          })}

          {/* 기타 - 직접입력 */}
          <button
            onClick={() => setShowModal(true)}
            className="flex flex-col items-center justify-center py-5 rounded-2xl border transition-all"
            style={{
              backgroundColor: isCustomSelected ? 'rgba(180,240,74,0.1)' : 'rgba(44,44,62,1)',
              borderColor: isCustomSelected ? '#B4F04A' : 'rgba(255,255,255,0.05)',
            }}
          >
            <img src={sparkImg} alt="기타" className="w-8 h-8 object-contain mb-2" />
            <span className="text-xs font-medium" style={{ color: isCustomSelected ? '#B4F04A' : 'rgba(255,255,255,0.6)' }}>
              {customSport ?? '기타'}
            </span>
            <span className="text-[10px] mt-0.5" style={{ color: isCustomSelected ? 'rgba(180,240,74,0.7)' : 'rgba(255,255,255,0.3)' }}>
              직접입력
            </span>
          </button>
        </div>
      </div>

      <div className="px-5 pb-10 pt-4">
        <button
          onClick={() => navigate('/auth/survey/frequency')}
          disabled={selected.length === 0}
          className={`w-full py-4 font-bold text-sm rounded-2xl transition-all ${
            selected.length > 0 ? 'bg-lime text-fig' : 'bg-white/5 text-white/20 cursor-not-allowed'
          }`}
        >
          다음
        </button>
      </div>

      {/* 직접입력 모달 */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 px-6"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-full rounded-2xl p-5"
            style={{ backgroundColor: '#2C2C3E', maxWidth: 320 }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-white font-bold text-base mb-4">기타 운동 직접 입력</p>
            <label className="text-xs text-white/40 mb-1.5 block">운동 이름</label>
            <input
              autoFocus
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value.slice(0, 20))}
              placeholder="운동 이름을 입력해 주세요"
              className="w-full rounded-xl px-4 py-3 text-sm outline-none border border-white/10 mb-1"
              style={{ backgroundColor: '#1C1C2E', color: '#fff' }}
            />
            <p className="text-[10px] text-white/30 text-right mb-4">{customInput.length}/20</p>
            <div className="flex gap-2">
              <button
                onClick={() => { setShowModal(false); setCustomInput('') }}
                className="flex-1 py-3 rounded-xl text-sm font-medium"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}
              >
                취소
              </button>
              <button
                onClick={handleCustomAdd}
                className="flex-1 py-3 rounded-xl text-sm font-bold"
                style={{
                  backgroundColor: customInput.trim() ? '#B4F04A' : 'rgba(255,255,255,0.05)',
                  color: customInput.trim() ? '#1C1C2E' : 'rgba(255,255,255,0.2)',
                }}
              >
                추가하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
