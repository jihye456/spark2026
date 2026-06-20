import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import StepBar from '../../components/StepBar'

function CheckCircle({ checked }: { checked: boolean }) {
  return (
    <div style={{
      width: 20,
      height: 20,
      borderRadius: '50%',
      border: `2px solid ${checked ? '#B4F04A' : 'rgba(255,255,255,0.3)'}`,
      backgroundColor: checked ? '#B4F04A' : 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      transition: 'all 0.15s ease',
    }}>
      {checked && (
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <path d="M2 5.5L4.5 8L9 3" stroke="#1C1C2E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  )
}

// 실제 서비스에서는 API 호출로 대체
const TAKEN_NICKNAMES = ['spark', 'admin', '스파크', 'test']

type CheckResult = 'taken' | 'available' | null

const STORAGE_KEY = 'spark_signup_draft'

function loadDraft() {
  try { return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}') } catch { return {} }
}

export default function SignupPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const phoneVerified = (location.state as { phoneVerified?: boolean })?.phoneVerified ?? false

  const draft = loadDraft()
  const [nickname, setNickname] = useState<string>(draft.nickname ?? '')
  const [checkResult, setCheckResult] = useState<CheckResult>(draft.checkResult ?? null)
  const [checkedNickname, setCheckedNickname] = useState<string>(draft.checkedNickname ?? '')
  const [showModal, setShowModal] = useState<CheckResult>(null)
  const [gender, setGender] = useState<'male' | 'female' | 'other' | null>(draft.gender ?? null)
  const [ageGroup, setAgeGroup] = useState<string | null>(draft.ageGroup ?? null)
  const [agreed, setAgreed] = useState(draft.agreed ?? { all: false, terms: false, privacy: false, marketing: false })

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ nickname, checkResult, checkedNickname, gender, ageGroup, agreed }))
  }, [nickname, checkResult, checkedNickname, gender, ageGroup, agreed])

  const handleCheckNickname = () => {
    const trimmed = nickname.trim()
    if (trimmed.length < 2) return
    const result: CheckResult = TAKEN_NICKNAMES.includes(trimmed.toLowerCase()) ? 'taken' : 'available'
    setCheckResult(result)
    setCheckedNickname(trimmed)
    setShowModal(result)
  }

  const isNicknameVerified = checkResult === 'available' && checkedNickname === nickname.trim()

  const toggleAll = () => {
    const next = !agreed.all
    setAgreed({ all: next, terms: next, privacy: next, marketing: next })
  }

  const toggle = (key: keyof typeof agreed) => {
    const next = { ...agreed, [key]: !agreed[key] }
    next.all = next.terms && next.privacy && next.marketing
    setAgreed(next)
  }

  const isValid = isNicknameVerified && phoneVerified && agreed.terms && agreed.privacy

  return (
    <div className="min-h-screen bg-fig flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4">
        <button onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <p className="text-sm font-bold text-white">회원가입</p>
        <div className="w-5" />
      </div>

      <StepBar current={1} />

      <div className="px-5 flex-1">
        {/* 닉네임 */}
        <div className="mb-5">
          <p className="text-white/40 text-sm mb-4">SPARK에서 사용할 닉네임을 정해주세요</p>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs text-white/40">닉네임 <span className="text-lime">*</span></label>
            <button
              onClick={handleCheckNickname}
              disabled={nickname.trim().length < 2}
              className="text-xs font-bold px-3 py-1 rounded-lg transition-all"
              style={{
                backgroundColor: nickname.trim().length >= 2 ? '#B4F04A' : 'rgba(255,255,255,0.06)',
                color: nickname.trim().length >= 2 ? '#1C1C2E' : 'rgba(255,255,255,0.25)',
              }}
            >
              중복확인
            </button>
          </div>
          <input
            type="text"
            value={nickname}
            onChange={(e) => { setNickname(e.target.value); setCheckResult(null) }}
            placeholder="2~10자 이내 작성"
            maxLength={12}
            className="w-full bg-card border rounded-xl px-4 py-3 text-sm placeholder-white/20 outline-none transition-colors"
            style={{
              borderColor: isNicknameVerified ? '#B4F04A' : checkResult === 'taken' ? '#EF4444' : 'rgba(255,255,255,0.1)',
            }}
          />
          <div className="flex justify-between mt-1 px-1">
            {isNicknameVerified && <p className="text-[10px] text-lime">사용 가능한 닉네임이에요</p>}
            {checkResult === 'taken' && checkedNickname === nickname.trim() && <p className="text-[10px] text-red-400">이미 사용 중인 닉네임이에요</p>}
            {!checkResult && <p className="text-[10px] text-white/20">특수문자 제외, 최대 12자</p>}
            <p className="text-[10px] text-white/30 ml-auto">{nickname.length}/12</p>
          </div>
        </div>

        {/* 성별 선택 */}
        <div className="mb-5">
          <label className="text-xs text-white/40 mb-2 block">성별</label>
          <div className="flex gap-2">
            {[
              { value: 'male', label: '남성', icon: '♂' },
              { value: 'female', label: '여성', icon: '♀' },
              { value: 'other', label: '이외', icon: '⚧' },
            ].map((g) => (
              <button
                key={g.value}
                onClick={() => setGender(g.value as 'male' | 'female' | 'other')}
                className="flex-1 py-3 rounded-xl text-sm font-medium border transition-all flex items-center justify-center gap-1.5"
                style={{
                  backgroundColor: gender === g.value ? '#B4F04A' : 'transparent',
                  borderColor: gender === g.value ? '#B4F04A' : 'rgba(255,255,255,0.1)',
                  color: gender === g.value ? '#1C1C2E' : 'rgba(255,255,255,0.5)',
                }}
              >
                <span className="text-xs">{g.icon}</span>
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* 나이 선택 */}
        <div className="mb-5">
          <label className="text-xs text-white/40 mb-2 block">나이대</label>
          <div className="grid grid-cols-4 gap-2">
            {['10대', '20대', '30대', '40대', '50대', '60대 이상'].map((age) => (
              <button
                key={age}
                onClick={() => setAgeGroup(age)}
                className="py-2.5 rounded-xl text-xs font-medium border transition-all"
                style={{
                  backgroundColor: ageGroup === age ? '#B4F04A' : 'transparent',
                  borderColor: ageGroup === age ? '#B4F04A' : 'rgba(255,255,255,0.1)',
                  color: ageGroup === age ? '#1C1C2E' : 'rgba(255,255,255,0.5)',
                }}
              >
                {age}
              </button>
            ))}
          </div>
        </div>

        {/* 연락처 인증 */}
        <div className="mb-6">
          <label className="text-xs text-white/40 mb-1.5 block">연락처 인증</label>
          <button
            onClick={() => !phoneVerified && navigate('/auth/phone')}
            className="w-full flex items-center justify-between rounded-xl px-4 py-3 border transition-all"
            style={{
              backgroundColor: phoneVerified ? 'rgba(180,240,74,0.08)' : 'rgba(44,44,62,1)',
              borderColor: phoneVerified ? '#B4F04A' : 'rgba(255,255,255,0.1)',
            }}
          >
            <div className="flex items-center gap-2">
              {phoneVerified && (
                <div style={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: '#B4F04A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="10" height="10" viewBox="0 0 11 11" fill="none">
                    <path d="M2 5.5L4.5 8L9 3" stroke="#1C1C2E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
              <span className="text-sm" style={{ color: phoneVerified ? '#B4F04A' : 'rgba(255,255,255,0.3)' }}>
                {phoneVerified ? '인증 완료' : '전화번호를 인증해주세요'}
              </span>
            </div>
            {!phoneVerified && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

        {/* 약관 동의 */}
        <div className="bg-card rounded-2xl p-4 border border-white/5 mb-6">
          {/* 전체 동의 */}
          <button onClick={toggleAll} className="flex items-center gap-3 w-full pb-3 border-b border-white/5">
            <CheckCircle checked={agreed.all} />
            <span className="text-sm font-bold text-white">전체 동의하기</span>
          </button>

          <div className="space-y-3 mt-3">
            {[
              { key: 'terms' as const, label: '이용약관 동의', required: true },
              { key: 'privacy' as const, label: '개인정보 수집·이용 동의', required: true },
              { key: 'marketing' as const, label: '마케팅 정보 수신 동의', required: false },
            ].map((item) => (
              <button key={item.key} onClick={() => toggle(item.key)} className="flex items-center gap-3 w-full">
                <CheckCircle checked={agreed[item.key]} />
                <span className="text-sm text-white/60 text-left">{item.label}</span>
                {item.required
                  ? <span className="text-lime text-[10px] ml-auto flex-shrink-0">(필수)</span>
                  : <span className="text-white/30 text-[10px] ml-auto flex-shrink-0">(선택)</span>
                }
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 중복확인 결과 모달 */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 px-8"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
          onClick={() => setShowModal(null)}
        >
          <div
            className="w-full rounded-3xl p-6 flex flex-col items-center text-center"
            style={{ backgroundColor: '#2C2C3E', maxWidth: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 아이콘 */}
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
              style={{
                backgroundColor: showModal === 'taken' ? 'rgba(239,68,68,0.15)' : 'rgba(34,197,94,0.15)',
                color: showModal === 'taken' ? '#EF4444' : '#22C55E',
                fontSize: 26,
                fontWeight: 900,
              }}
            >
              !
            </div>

            <p className="text-white font-bold text-base mb-2">
              {showModal === 'taken' ? '중복된 닉네임' : '사용가능한 닉네임'}
            </p>
            <p className="text-white/50 text-sm mb-6 leading-relaxed">
              {showModal === 'taken'
                ? '이미 사용 중인 닉네임입니다.\n다른 닉네임을 입력해 주세요.'
                : '멋진 닉네임이네요!\n이 닉네임으로 시작할까요?'}
            </p>

            <button
              onClick={() => setShowModal(null)}
              className="w-full py-3.5 rounded-2xl font-bold text-sm"
              style={{ backgroundColor: '#B4F04A', color: '#1C1C2E' }}
            >
              확인
            </button>
          </div>
        </div>
      )}

      {/* 다음 버튼 */}
      <div className="px-5 pb-10">
        <button
          onClick={() => navigate('/auth/onboarding/region')}
          disabled={!isValid}
          className={`w-full py-4 font-bold text-sm rounded-2xl transition-all ${isValid ? 'bg-lime text-fig' : 'bg-white/5 text-white/20 cursor-not-allowed'}`}
        >
          다음
        </button>
      </div>
    </div>
  )
}
