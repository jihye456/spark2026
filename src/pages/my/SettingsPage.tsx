import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SETTINGS_ITEMS = [
  {
    section: '계정',
    items: [
      { label: '개인정보 설정', sub: '닉네임, 자기소개', path: null },
      { label: '연결된 SNS', sub: '구글, 카카오', path: null },
    ],
  },
  {
    section: '앱 설정',
    items: [
      { label: '알림 설정', sub: null, path: null },
    ],
  },
  {
    section: '정보',
    items: [
      { label: '이용약관', sub: null, path: null },
      { label: '개인정보처리방침', sub: null, path: null },
      { label: '고객센터 / 1:1 문의', sub: null, path: null },
      { label: '버전 정보', sub: 'v1.0.0', path: null },
    ],
  },
]

export default function SettingsPage() {
  const navigate = useNavigate()
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1C1C2E' }}>
      {/* 헤더 */}
      <div className="flex items-center gap-3 px-5 pt-14 pb-4">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <p className="text-white font-bold text-base">설정</p>
      </div>

      <div className="px-5 space-y-5 pb-12">
        {SETTINGS_ITEMS.map((section) => (
          <div key={section.section}>
            <p className="text-xs font-bold mb-2 px-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {section.section}
            </p>
            <div className="rounded-2xl overflow-hidden border border-white/8" style={{ backgroundColor: '#2C2C3E' }}>
              {section.items.map((item, i) => (
                <button
                  key={i}
                  className="w-full flex items-center justify-between px-4 py-4"
                  style={{ borderBottom: i < section.items.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}
                >
                  <div>
                    <p className="text-white text-sm font-medium text-left">{item.label}</p>
                    {item.sub && (
                      <p className="text-xs mt-0.5 text-left" style={{ color: 'rgba(255,255,255,0.3)' }}>{item.sub}</p>
                    )}
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={() => setShowLogoutModal(true)}
          className="w-full py-4 rounded-2xl text-sm font-medium"
          style={{ border: '1px solid rgba(255,80,80,0.2)', color: 'rgba(255,100,100,0.7)' }}
        >
          로그아웃
        </button>
      </div>

      {/* 로그아웃 모달 */}
      {showLogoutModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
          style={{ backgroundColor: 'rgba(0,0,0,0.65)' }}
          onClick={() => setShowLogoutModal(false)}
        >
          <div
            className="w-full rounded-2xl p-5"
            style={{ backgroundColor: '#2C2C3E', maxWidth: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-white font-bold text-base mb-1 text-center">로그아웃</p>
            <p className="text-xs text-center mb-5" style={{ color: 'rgba(255,255,255,0.4)' }}>
              정말 로그아웃 하시겠어요?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-3 rounded-xl text-sm font-medium"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}
              >
                취소
              </button>
              <button
                onClick={() => navigate('/auth/login')}
                className="flex-1 py-3 rounded-xl text-sm font-bold"
                style={{ backgroundColor: 'rgba(255,80,80,0.15)', color: '#FF6464' }}
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
