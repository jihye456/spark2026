import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProfileCompletePage() {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) { clearInterval(interval); return 100 }
          return p + 2
        })
      }, 20)
      return () => clearInterval(interval)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const circumference = 2 * Math.PI * 60
  const strokeDashoffset = circumference * (1 - progress / 100)

  return (
    <div className="min-h-screen bg-fig flex flex-col items-center justify-between px-5 py-16">
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        {/* 헤더 */}
        <div className="flex items-center justify-between w-full mb-10">
          <p className="text-white/40 text-sm">프로필 완성</p>
          <button onClick={() => navigate('/home')} className="text-xs text-white/30">완료</button>
        </div>

        {/* 원형 프로그레스 */}
        <div className="relative mb-8">
          <svg width="160" height="160" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r="60" fill="none" stroke="#2C2C3E" strokeWidth="10" />
            <circle
              cx="80" cy="80" r="60"
              fill="none"
              stroke={progress === 100 ? '#B4F04A' : '#9D5CF4'}
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 80 80)"
              style={{ transition: 'stroke-dashoffset 0.05s, stroke 0.5s' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {progress === 100 ? (
              <>
                <p className="text-2xl font-black text-white tracking-widest">SPARK</p>
                <p className="text-xs text-white/30 mt-1">준비 완료!</p>
              </>
            ) : (
              <>
                <p className="text-2xl font-bold text-white">{progress}%</p>
                <p className="text-xs text-white/40">설정 중...</p>
              </>
            )}
          </div>
        </div>

        {/* 완성 메시지 */}
        <div className="text-center mb-8">
          <p className="text-white text-xl font-bold mb-1">
            {progress === 100 ? 'SPARK 이시네요!' : '프로필을 설정하고 있어요'}
          </p>
          <p className="text-white/40 text-sm">
            {progress === 100
              ? '당신과 어울리는 멋진 운동 친구를\n내일의 건강한 라이프스타일을 가져요!'
              : '잠시만 기다려주세요...'}
          </p>
        </div>

        {/* 기능 미리보기 */}
        {progress === 100 && (
          <div className="w-full space-y-3 mb-8">
            <p className="text-xs text-white/30 font-medium">이런 기능을 사용할 수 있어요</p>
            {[
              { emoji: '⚡', title: '번개 모임 참여', desc: '내 주변 운동 모임에 즉시 참여하세요' },
              { emoji: '🏆', title: '운동 목표', desc: 'SPARK와 함께 운동 목표를 달성해보세요' },
              { emoji: '📊', title: '운동 기록', desc: '나의 운동 히스토리를 한눈에 확인하세요' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-card rounded-2xl p-3.5 border border-white/5">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                  {item.emoji}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{item.title}</p>
                  <p className="text-xs text-white/40">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 시작 버튼 */}
      <button
        onClick={() => navigate('/home')}
        disabled={progress < 100}
        className={`w-full py-4 font-bold text-sm rounded-2xl transition-all ${
          progress === 100 ? 'bg-lime text-fig' : 'bg-white/5 text-white/20 cursor-not-allowed'
        }`}
      >
        {progress === 100 ? 'SPARK 시작하기 →' : '프로필 설정 중...'}
      </button>
    </div>
  )
}
