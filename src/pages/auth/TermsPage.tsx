import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const termsContent = `제1조 (목적)
본 약관은 운동 관리 서비스(이하 "서비스"라 함)의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.

제2조 (정의)
본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
"회원"이라 함은 본 약관에 동의하고 서비스를 이용하는 자를 말합니다.
"아이디(ID)"라 함은 회원의 식별과 서비스 이용을 위하여 회원이 정하고 회사가 승인하는 문자와 숫자의 조합을 말합니다.
"비밀번호"라 함은 회원이 부여받은 아이디와 일치되는 회원임을 확인하고 비밀보호를 위해 회원 자신이 정한 문자 또는 숫자의 조합을 말합니다.

제3조 (약관의 효력 및 변경)
1. 본 약관은 서비스를 이용하고자 하는 모든 회원에 대하여 그 효력을 발생합니다.
2. 회사는 필요한 경우 우관 관련 법령을 위배하지 않는 범위 내에서 본 약관을 변경할 수 있습니다.
3. 회사가 약관을 변경할 경우에는 적용일자 및 변경사유를 명시하여 현행약관과 함께 서비스 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다.

제4조 (서비스의 제공)
1. 회사는 다음과 같은 서비스를 제공합니다.
   - 운동 기록 및 관리 서비스
   - 운동 모임 매칭 서비스
   - 챌린지 및 목표 설정 서비스
   - 기타 회사가 정하는 서비스

제5조 (서비스 이용의 제한)
회사는 다음 각 호에 해당하는 경우 서비스 이용을 제한할 수 있습니다.
1. 서비스 운영을 고의로 방해한 경우
2. 타인의 정보를 도용한 경우
3. 불법 광고, 스팸 등을 유포한 경우`

const privacyContent = `1. 개인정보의 수집 및 이용 목적
회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
- 회원 가입 및 관리
- 서비스 제공
- 마케팅 및 광고 활용
- 서비스 개선 및 신규 서비스 개발

2. 수집하는 개인정보 항목
회사는 다음의 개인정보 항목을 처리하고 있습니다.
필수항목: 이메일 주소, 비밀번호 (암호화하여 저장), 닉네임
선택항목: 성별, 생년월일, 운동 선호도, 위치 정보
자동 수집 항목: 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보

3. 개인정보의 보유 및 이용 기간
회원 탈퇴 시까지 보유하며, 관계 법령에 따라 보존할 필요가 있는 경우 해당 기간 동안 보존합니다.

4. 개인정보의 파기
회사는 개인정보 보유 기간의 경과, 처리 목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.

5. 개인정보 보호 책임자
개인정보 보호 책임자: SPARK 개인정보 보호팀
이메일: privacy@spark.app`

export default function TermsPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialTab = searchParams.get('tab') === 'privacy' ? 'privacy' : 'terms'
  const [tab, setTab] = useState<'terms' | 'privacy'>(initialTab)

  return (
    <div className="h-screen bg-fig flex flex-col overflow-hidden">
      {/* 헤더 */}
      <div className="flex-shrink-0 flex items-center justify-between px-5 pt-14 pb-4">
        <button onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <p className="text-sm font-bold text-white">이용약관</p>
        <div className="w-5" />
      </div>

      {/* 탭 */}
      <div className="flex-shrink-0 px-5 flex gap-1 border-b border-white/10">
        {[
          { key: 'terms', label: '서비스 이용약관' },
          { key: 'privacy', label: '개인정보 처리방침' },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key as 'terms' | 'privacy')}
            className="flex-1 py-3 text-sm font-medium transition-all relative"
            style={{ color: tab === t.key ? '#B4F04A' : 'rgba(255,255,255,0.4)' }}
          >
            {t.label}
            {tab === t.key && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-lime rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* 본문 */}
      <div className="flex-1 overflow-y-auto px-5 py-6 scrollbar-none">
        <pre className="text-xs text-white/60 leading-relaxed whitespace-pre-wrap font-sans">
          {tab === 'terms' ? termsContent : privacyContent}
        </pre>
      </div>

    </div>
  )
}
