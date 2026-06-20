import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StepBar from '../../components/StepBar'

const defaultTags = ['#꾸준함', '#계획형', '#아침운동', '#저녁운동', '#혼자운동', '#그룹운동', '#실내운동', '#야외운동', '#고강도', '#지강도', '#유산소', '#근력운동']

export default function SurveyTendencyPage() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>(defaultTags)
  const [showModal, setShowModal] = useState(false)
  const [customInput, setCustomInput] = useState('')

  const toggleTag = (tag: string) =>
    setSelected((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag])

  const addCustomTag = () => {
    const tag = `#${customInput.trim()}`
    if (customInput.trim() && !tags.includes(tag)) {
      setTags((prev) => [...prev, tag])
      setSelected((prev) => [...prev, tag])
    }
    setCustomInput('')
    setShowModal(false)
  }

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

      <StepBar current={5} />

      <div className="px-5 flex-1">
        <p className="text-white text-xl font-bold mb-1">나의 운동 성향은?</p>
        <p className="text-white/40 text-sm mb-6">가장 잘 어울리는 키워드를 선택해 주세요.</p>

        {/* 태그 목록 */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const isOn = selected.includes(tag)
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className="px-4 py-2 rounded-full text-sm font-medium border transition-all"
                style={{
                  backgroundColor: isOn ? '#B4F04A' : 'transparent',
                  borderColor: isOn ? '#B4F04A' : 'rgba(255,255,255,0.15)',
                  color: isOn ? '#1C1C2E' : 'rgba(255,255,255,0.6)',
                }}
              >
                {tag}
              </button>
            )
          })}

          {/* 직접 입력 */}
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 rounded-full text-sm font-medium border transition-all"
            style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.4)', backgroundColor: 'transparent' }}
          >
            + 직접 입력
          </button>
        </div>
      </div>

      <div className="px-5 pb-10 pt-4">
        <button
          onClick={() => navigate('/auth/onboarding/sports')}
          className="w-full py-4 font-bold text-sm rounded-2xl transition-all"
          style={{
            backgroundColor: selected.length > 0 ? '#B4F04A' : 'rgba(255,255,255,0.05)',
            color: selected.length > 0 ? '#1C1C2E' : 'rgba(255,255,255,0.2)',
          }}
        >
          다음
        </button>
      </div>

      {/* 직접 입력 모달 */}
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
            <p className="text-white font-bold text-base mb-4">운동 성향 직접 입력</p>
            <label className="text-xs text-white/40 mb-1.5 block">운동 이름</label>
            <input
              autoFocus
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value.slice(0, 10))}
              placeholder="운동 이름을 입력해 주세요"
              className="w-full rounded-xl px-4 py-3 text-sm outline-none border border-white/10 mb-1"
              style={{ backgroundColor: '#1C1C2E', color: '#fff' }}
            />
            <p className="text-[10px] text-white/30 text-right mb-4">{customInput.length}/10</p>
            <div className="flex gap-2">
              <button
                onClick={() => { setShowModal(false); setCustomInput('') }}
                className="flex-1 py-3 rounded-xl text-sm font-medium"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}
              >
                취소
              </button>
              <button
                onClick={addCustomTag}
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
