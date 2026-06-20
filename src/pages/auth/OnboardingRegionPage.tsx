import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StepBar from '../../components/StepBar'

const regions = [
  '서울 전체', '강남/서초', '홍대/마포', '성동/광진', '노원/도봉',
  '영등포/구로', '종로/중구', '강서/양천', '성북/강북', '송파/강동',
]

export default function OnboardingRegionPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<string | null>(null)

  const filtered = regions.filter((r) => r.includes(search))

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
        <div className="w-12" />
      </div>

      <StepBar current={3} />

      <div className="px-5 flex-1">
        <p className="text-white text-xl font-bold mb-1">주로 운동하는 지역이<br />어디인가요?</p>
        <p className="text-white/40 text-sm mb-5">주변 번개 모임 추천에 활용돼요</p>

        {/* 검색 */}
        <div className="flex items-center gap-2 bg-card border border-white/10 rounded-xl px-4 py-3 mb-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="#6B7280" strokeWidth="2" />
            <path d="M21 21L16.65 16.65" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="지역 검색"
            className="bg-transparent text-sm text-white placeholder-white/20 outline-none flex-1"
          />
        </div>

        {/* 현재 위치 */}
        <button className="flex items-center gap-2 mb-4 text-lime text-sm font-medium">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="#B4F04A" strokeWidth="2" />
            <circle cx="12" cy="10" r="3" stroke="#B4F04A" strokeWidth="2" />
          </svg>
          현재 위치 사용
        </button>

        {/* 지역 리스트 */}
        <div className="space-y-2">
          {filtered.map((region) => (
            <button
              key={region}
              onClick={() => setSelected(region)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border transition-all ${
                selected === region
                  ? 'bg-lime/10 border-lime text-lime'
                  : 'bg-card border-white/5 text-white/70'
              }`}
            >
              <span className="text-sm font-medium">{region}</span>
              {selected === region && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13L9 17L19 7" stroke="#B4F04A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pb-10 pt-4">
        <button
          onClick={() => selected && navigate('/auth/survey/goal')}
          disabled={!selected}
          className={`w-full py-4 font-bold text-sm rounded-2xl transition-all ${selected ? 'bg-lime text-fig' : 'bg-white/5 text-white/20 cursor-not-allowed'}`}
        >
          다음
        </button>
      </div>
    </div>
  )
}
