import { useNavigate } from 'react-router-dom'
import SparkLogo from '../../components/SparkLogo'

export default function LoginPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-fig flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6">

        {/* 히어로 카드 */}
        <div className="w-full h-56 rounded-3xl mb-8 flex flex-col items-center justify-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1C1C2E 0%, #2C2C3E 60%, #1C1C2E 100%)' }}>

          {/* 배경 장식 */}
          <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full" style={{ background: 'radial-gradient(circle, #B4F04A15, transparent)' }} />
          <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full" style={{ background: 'radial-gradient(circle, #9D5CF415, transparent)' }} />

          {/* 앱 아이콘 로고 */}
          <SparkLogo size={80} variant="gradient-dark" className="mb-3" />

          <p className="text-white text-xl font-black tracking-[0.2em]">SPARK</p>
          <p className="text-white/30 text-xs mt-1">운동 기반 커뮤니티 플랫폼</p>
        </div>

        <div className="w-full text-center mb-8">
          <p className="text-white text-2xl font-bold">혼자서 하면 밀리닝</p>
          <p className="text-white/40 text-sm mt-1.5">함께 운동하면 더 즐거워요 🔥</p>
        </div>

        {/* 소셜 로그인 버튼 */}
        <div className="w-full space-y-3">
          {/* 카카오 */}
          <button
            onClick={() => navigate('/auth/signup')}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-sm"
            style={{ backgroundColor: '#FEE500', color: '#191919' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.62 1.56 4.93 3.91 6.29l-.97 3.56 4.11-2.72c.63.09 1.28.13 1.95.13 4.97 0 9-3.36 9-7.5S16.97 3 12 3z" fill="#191919" />
            </svg>
            <span className="flex-1 text-center">카카오로 시작하기</span>
          </button>

          {/* Apple — 검정 배경에 흰 텍스트 */}
          <button
            onClick={() => navigate('/auth/signup')}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-sm"
            style={{ backgroundColor: '#000000', color: '#ffffff' }}
          >
            <svg width="20" height="20" viewBox="0 0 814 1000" fill="none">
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105-42.3-155.5-127.2C46.7 790.7 0 663 0 541.8c0-207.5 135.4-317.5 268.5-317.5 96.4 0 166.1 42.8 220.8 42.8 54.7 0 140.4-45.1 248.3-45.1zM549.8 119.6c28.1-36.8 48.3-88.1 48.3-139.5 0-7.1-.6-14.3-1.9-20.1-45.8 1.9-99.8 30.6-131.5 71.9-26.9 32.6-51.9 84-51.9 136.1 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 41.5 0 93.4-27.5 121.5-67.8z" fill="#ffffff"/>
            </svg>
            <span className="flex-1 text-center">Apple로 시작하기</span>
          </button>

          {/* Google */}
          <button
            onClick={() => navigate('/auth/signup')}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-sm border border-white/10"
            style={{ backgroundColor: '#2C2C3E', color: '#ffffff' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span className="flex-1 text-center">Google로 시작하기</span>
          </button>
        </div>
      </div>

      {/* 하단 */}
      <div className="px-6 pb-10 text-center">
        <p className="text-white/30 text-xs">
          이미 계정이 있으신가요?{' '}
          <button onClick={() => navigate('/auth/email-login')} className="text-lime font-bold">
            로그인
          </button>
        </p>
        <p className="text-white/30 text-[10px] mt-3 leading-relaxed">
          계속 진행함으로써 SPARK의{' '}
          <button
            onClick={() => navigate('/auth/terms?tab=terms')}
            className="underline underline-offset-2"
            style={{ color: '#B4F04A' }}
          >
            이용약관
          </button>
          {' '}및{' '}
          <button
            onClick={() => navigate('/auth/terms?tab=privacy')}
            className="underline underline-offset-2"
            style={{ color: '#B4F04A' }}
          >
            개인정보처리방침
          </button>
          에 동의하게 됩니다.
        </p>
      </div>
    </div>
  )
}
