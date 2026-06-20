import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function EventDetailPage() {
  const navigate = useNavigate()
  const [joined, setJoined] = useState(false)
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="min-h-screen bg-fig flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center gap-3 px-5 pt-14 pb-4">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <p className="text-white font-bold text-base">이벤트 상세보기</p>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none pb-24 px-5">
        {/* 이벤트 타이틀 */}
        <h1 className="text-white text-2xl font-bold text-center leading-snug mb-6 mt-2">
          5km 한강 달리고<br />오! 소리 나게 선물 받자
        </h1>

        {/* 참여하기 버튼 */}
        <button
          onClick={() => !joined && setShowModal(true)}
          className="w-full py-4 rounded-2xl font-bold text-base mb-6 transition-all"
          style={{
            backgroundColor: joined ? 'rgba(37,99,235,0.3)' : '#2563EB',
            color: joined ? 'rgba(255,255,255,0.4)' : 'white',
          }}
        >
          {joined ? '참여 완료' : '참여하기'}
        </button>

        {/* 설명 */}
        <p className="text-white/50 text-sm text-center leading-relaxed mb-8">
          스파크와 함께<br />건강도, 선물도 모두 챙겨가세요
        </p>

        {/* 1등 상품 */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="w-28 h-28 rounded-2xl border border-white/10 flex items-center justify-center"
            style={{ backgroundColor: '#2C2C3E' }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
              <path d="M3 3l18 18M21 3L3 21" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            </svg>
          </div>
          <p className="text-white/50 text-xs">1등 선물 (3명)</p>
          <p className="text-white text-sm font-bold">신세계 상품권 5만원권</p>
        </div>

        {/* 2등 + 참여자 전원 */}
        <div className="flex gap-5 justify-center mb-8">
          <div className="flex flex-col items-center gap-2">
            <div className="w-24 h-24 rounded-2xl border border-white/10 flex items-center justify-center"
              style={{ backgroundColor: '#2C2C3E' }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                <path d="M3 3l18 18M21 3L3 21" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
              </svg>
            </div>
            <p className="text-white/50 text-xs">2등 선물 (10명)</p>
            <p className="text-white text-xs font-bold text-center">신세계 상품권<br />5천원권</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-24 h-24 rounded-2xl border border-white/10 flex items-center justify-center"
              style={{ backgroundColor: '#2C2C3E' }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                <path d="M3 3l18 18M21 3L3 21" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
              </svg>
            </div>
            <p className="text-white/50 text-xs">참여자 전원</p>
            <p className="text-white text-xs font-bold text-center">앱 내 경험치<br />5배 지급</p>
          </div>
        </div>

        {/* 일시·장소 안내 */}
        <div className="rounded-2xl p-4 text-center"
          style={{ backgroundColor: '#2C2C3E', border: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-white/65 text-sm leading-relaxed">
            일시: 2026. 7. OO<br />
            장소: 반포한강공원 달빛광장<br />
            <span className="text-white/40 text-xs">(런닝 코스는 아래 내용을 참고해주세요)</span>
          </p>
          <div className="mt-3 pt-3 border-t border-white/8">
            <p className="text-white/30 text-xs">(와이어프레임으로 이하 내용 생략)</p>
          </div>
        </div>
      </div>

      {/* 이벤트 참여 완료 모달 */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
          style={{ backgroundColor: 'rgba(0,0,0,0.65)' }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-full rounded-3xl p-6 flex flex-col items-center"
            style={{ backgroundColor: '#2C2C3E', maxWidth: 320 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 아이콘 */}
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: 'rgba(180,240,74,0.12)', border: '2px solid rgba(180,240,74,0.3)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#B4F04A" strokeWidth="1.5" />
                <path d="M12 8v4M12 16h.01" stroke="#B4F04A" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            <p className="text-white font-bold text-base mb-6">이벤트 참여완료!</p>

            <button
              onClick={() => { setJoined(true); setShowModal(false) }}
              className="w-full py-3 rounded-2xl font-bold text-sm text-white"
              style={{ backgroundColor: '#2563EB' }}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
