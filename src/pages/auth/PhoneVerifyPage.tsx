import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StepBar from '../../components/StepBar'

export default function PhoneVerifyPage() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [step, setStep] = useState<'phone' | 'otp'>('phone')

  const handlePhoneChange = (v: string) => {
    const nums = v.replace(/\D/g, '').slice(0, 11)
    const formatted = nums.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
    setPhone(formatted)
  }

  const handleOtp = (val: string, idx: number) => {
    if (!/^\d?$/.test(val)) return
    const next = [...otp]
    next[idx] = val
    setOtp(next)
    if (val && idx < 5) {
      const el = document.getElementById(`otp-${idx + 1}`)
      el?.focus()
    }
  }

  const isPhoneValid = phone.replace(/-/g, '').length === 11
  const isOtpValid = otp.every((d) => d !== '')

  return (
    <div className="min-h-screen bg-fig flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4">
        <button onClick={() => step === 'otp' ? setStep('phone') : navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <p className="text-sm font-bold text-white">전화번호 인증</p>
        <div className="w-5" />
      </div>

      <StepBar current={2} />

      <div className="px-5 flex-1">
        {step === 'phone' ? (
          <>
            <p className="text-white text-xl font-bold mb-1">전화번호를 입력해주세요</p>
            <p className="text-white/40 text-sm mb-6">인증 코드를 전송해 드릴게요</p>

            <label className="text-xs text-white/40 mb-1.5 block">전화번호</label>
            <div className="flex gap-2 mb-3">
              <div className="bg-card border border-white/10 rounded-xl px-3 py-3 flex items-center gap-1 min-w-[70px]">
                <span className="text-sm text-white">🇰🇷</span>
                <span className="text-sm text-white">+82</span>
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="010-0000-0000"
                className="flex-1 bg-card border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-lime/50 transition-colors"
              />
            </div>

            <p className="text-xs text-white/30 mb-8">
              입력하신 번호로 인증 문자가 발송됩니다
            </p>

            <button
              onClick={() => isPhoneValid && setStep('otp')}
              disabled={!isPhoneValid}
              className={`w-full py-4 font-bold text-sm rounded-2xl transition-all ${isPhoneValid ? 'bg-lime text-fig' : 'bg-white/5 text-white/20 cursor-not-allowed'}`}
            >
              인증하기
            </button>
          </>
        ) : (
          <>
            <p className="text-white text-xl font-bold mb-1">인증 코드를 입력해주세요</p>
            <p className="text-white/40 text-sm mb-2">{phone}으로 전송된</p>
            <p className="text-white/40 text-sm mb-6">6자리 코드를 입력해주세요</p>

            {/* OTP 입력 */}
            <div className="flex gap-2 justify-center mb-4">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="tel"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtp(e.target.value, idx)}
                  className={`w-12 h-14 bg-card border rounded-xl text-center text-xl font-bold text-white outline-none transition-colors ${digit ? 'border-lime' : 'border-white/10'} focus:border-lime/50`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between mb-8">
              <p className="text-xs text-white/30">코드를 받지 못하셨나요?</p>
              <button
                onClick={() => setStep('phone')}
                className="text-xs text-lime font-bold"
              >
                재전송
              </button>
            </div>

            <button
              onClick={() => isOtpValid && navigate('/auth/signup', { state: { phoneVerified: true } })}
              disabled={!isOtpValid}
              className={`w-full py-4 font-bold text-sm rounded-2xl transition-all ${isOtpValid ? 'bg-lime text-fig' : 'bg-white/5 text-white/20 cursor-not-allowed'}`}
            >
              확인
            </button>
          </>
        )}
      </div>
    </div>
  )
}
