import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function MeetupApplyPage() {
  const navigate = useNavigate()
  const [nickname, setNickname] = useState('')
  const [location, setLocation] = useState('')
  const [intro, setIntro] = useState('')

  const isValid = nickname.trim().length > 0 && location.trim().length > 0

  return (
    <div className="min-h-screen bg-fig">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4">
        <button onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <p className="text-sm font-bold text-white">신청서</p>
        <div className="w-5" />
      </div>

      <div className="px-5">
        {/* 모임 요약 */}
        <div className="bg-card rounded-2xl p-4 border border-white/5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple/20 flex items-center justify-center">
              <span className="text-lg">🏃</span>
            </div>
            <div>
              <p className="text-sm font-bold text-white">서울숲 가벼운 러닝</p>
              <p className="text-xs text-white/40">13:30 · 서울숲 정문 · 5명</p>
            </div>
          </div>
        </div>

        {/* 프로필 사진 */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-2">
            <div className="w-20 h-20 rounded-2xl bg-card border-2 border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="4" stroke="#6B7280" strokeWidth="1.5" />
                <circle cx="12" cy="11" r="3" stroke="#6B7280" strokeWidth="1.5" />
                <path d="M5 20c0-2.5 3-4 7-4s7 1.5 7 4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-lime rounded-full flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M12 5V19M5 12H19" stroke="#1C1C2E" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-white/30">프로필 사진 추가 (선택)</p>
        </div>

        {/* 입력 폼 */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-xs text-white/40 mb-1.5 block">닉네임 <span className="text-lime">*</span></label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력하세요"
              className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-lime/50 transition-colors"
            />
          </div>

          <div>
            <label className="text-xs text-white/40 mb-1.5 block">사는 동네 <span className="text-lime">*</span></label>
            <div className="relative">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="예) 성동구 서울숲동"
                className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-lime/50 transition-colors pr-10"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="#6B7280" strokeWidth="2" />
                  <circle cx="12" cy="10" r="3" stroke="#6B7280" strokeWidth="2" />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs text-white/40 mb-1.5 block">자기소개 (선택)</label>
            <textarea
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              placeholder="모임원들에게 간단히 소개해주세요!"
              rows={3}
              className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-lime/50 transition-colors resize-none"
            />
            <p className="text-[10px] text-white/20 text-right mt-1">{intro.length}/100</p>
          </div>

          <div>
            <label className="text-xs text-white/40 mb-2 block">선호 운동</label>
            <div className="flex flex-wrap gap-2">
              {['러닝', 'GYM', '자전거', '수영', '테니스', '기타'].map((sport, i) => (
                <button
                  key={i}
                  className="px-3 py-1.5 rounded-full text-xs font-medium border border-white/10 text-white/40 hover:border-lime hover:text-lime transition-colors"
                >
                  {sport}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 주의사항 */}
        <div className="bg-card rounded-2xl p-4 border border-white/5 mb-6">
          <p className="text-xs text-white/40 mb-2 font-medium">참여 전 확인해주세요</p>
          <ul className="space-y-1.5">
            {[
              '모임 1시간 전까지 취소가 가능합니다',
              '무단 불참 시 신뢰 점수가 차감됩니다',
              '모임장의 안내에 따라 활동해주세요',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-white/30">
                <span className="text-lime mt-0.5">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* 버튼 */}
        <button
          onClick={() => navigate('/home')}
          disabled={!isValid}
          className={`w-full py-4 font-bold text-sm rounded-2xl mb-3 transition-all ${
            isValid ? 'bg-lime text-fig' : 'bg-white/5 text-white/20 cursor-not-allowed'
          }`}
        >
          완료하기
        </button>
        <button
          onClick={() => navigate(-1)}
          className="w-full py-4 border border-white/10 text-white/40 text-sm rounded-2xl mb-8"
        >
          취소
        </button>
      </div>
    </div>
  )
}
