import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SparkLogo from '../../components/SparkLogo'

export default function EmailLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')

  const isValid = email.includes('@') && password.length >= 6

  const handleLogin = () => {
    if (!isValid) return
    // TODO: 실제 로그인 연동
    navigate('/home')
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
        <p className="text-sm font-bold text-white">로그인</p>
        <div className="w-5" />
      </div>

      <div className="px-5 flex-1">
        {/* 타이틀 */}
        <div className="mb-8">
          <SparkLogo size={48} variant="gradient-dark" className="mb-4" />
          <p className="text-white text-2xl font-bold">다시 오셨네요!</p>
          <p className="text-white/40 text-sm mt-1">계정에 로그인해주세요</p>
        </div>

        {/* 이메일 */}
        <div className="mb-4">
          <label className="text-xs text-white/40 mb-1.5 block">이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError('') }}
            placeholder="spark@example.com"
            className="w-full bg-card border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/20 outline-none focus:border-lime/50 transition-colors"
          />
        </div>

        {/* 비밀번호 */}
        <div className="mb-2">
          <label className="text-xs text-white/40 mb-1.5 block">비밀번호</label>
          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError('') }}
              placeholder="6자 이상 입력해주세요"
              className="w-full bg-card border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/20 outline-none focus:border-lime/50 transition-colors pr-12"
            />
            <button
              onClick={() => setShowPw(!showPw)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showPw ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"
                    stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="1" y1="1" x2="23" y2="23" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#6B7280" strokeWidth="2" />
                  <circle cx="12" cy="12" r="3" stroke="#6B7280" strokeWidth="2" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* 에러 메시지 */}
        {error && <p className="text-red-400 text-xs px-1 mb-2">{error}</p>}

        {/* 비밀번호 찾기 */}
        <div className="flex justify-end mb-8">
          <button className="text-xs text-white/30">비밀번호를 잊으셨나요?</button>
        </div>

        {/* 로그인 버튼 */}
        <button
          onClick={handleLogin}
          disabled={!isValid}
          className={`w-full py-4 font-bold text-sm rounded-2xl transition-all mb-4 ${
            isValid ? 'bg-lime text-fig' : 'bg-white/5 text-white/20 cursor-not-allowed'
          }`}
        >
          로그인
        </button>

        {/* 구분선 */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-white/20">또는</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* 소셜 로그인 축약 */}
        <div className="flex gap-3 mb-8">
          {[
            { label: '카카오', bg: '#FEE500', color: '#000', icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.62 1.56 4.93 3.91 6.29l-.97 3.56 4.11-2.72c.63.09 1.28.13 1.95.13 4.97 0 9-3.36 9-7.5S16.97 3 12 3z" fill="#000" />
              </svg>
            )},
            { label: 'Apple', bg: '#fff', color: '#000', icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M17.05 12.536c-.028-3.025 2.47-4.49 2.583-4.561-1.409-2.06-3.6-2.342-4.378-2.37-1.866-.187-3.638 1.097-4.581 1.097-.942 0-2.397-1.07-3.941-1.041-2.028.029-3.893 1.17-4.938 2.975-2.1 3.647-.54 9.055 1.506 12.017 1.002 1.448 2.2 3.07 3.77 3.011 1.51-.059 2.083-.977 3.91-.977 1.827 0 2.342.977 3.941.944 1.629-.03 2.664-1.478 3.65-2.934 1.15-1.682 1.628-3.31 1.657-3.394-.035-.016-3.173-1.223-3.179-4.767z" fill="#000" />
              </svg>
            )},
            { label: 'Google', bg: '#2C2C3E', color: '#fff', icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            )},
          ].map((s) => (
            <button
              key={s.label}
              onClick={() => navigate('/home')}
              className="flex-1 flex items-center justify-center py-3 rounded-xl border border-white/10 gap-2"
              style={{ backgroundColor: s.bg }}
            >
              {s.icon}
              <span className="text-xs font-medium" style={{ color: s.color }}>{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 하단 회원가입 링크 */}
      <div className="px-5 pb-10 text-center">
        <p className="text-white/30 text-xs">
          아직 계정이 없으신가요?{' '}
          <button onClick={() => navigate('/auth/signup')} className="text-lime font-bold">
            회원가입
          </button>
        </p>
      </div>
    </div>
  )
}
