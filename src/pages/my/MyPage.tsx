import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import runImg from '../../assets/run.png'
import gymImg from '../../assets/gym.png'
import bikeImg from '../../assets/bike.png'
import lv2Img from '../../assets/lv2.png'

const SPORT_TAGS = ['#러닝', '#자전거', '#헬스', '#중급자']

const RECENT_WORKOUTS = [
  { id: 1, sport: '러닝', img: runImg, date: '05.20', distance: '5.2km', time: '32:14', calories: 312 },
  { id: 2, sport: '헬스', img: gymImg, date: '05.18', distance: '-', time: '58:00', calories: 210 },
  { id: 3, sport: '자전거', img: bikeImg, date: '05.15', distance: '18.4km', time: '1:02:30', calories: 480 },
]

const MENU_ITEMS = [
  {
    label: '운동 관리', path: '/workout/manage',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="#B4F04A" strokeWidth="1.8"/><line x1="3" y1="9" x2="21" y2="9" stroke="#B4F04A" strokeWidth="1.8"/><line x1="8" y1="2" x2="8" y2="6" stroke="#B4F04A" strokeWidth="1.8" strokeLinecap="round"/><line x1="16" y1="2" x2="16" y2="6" stroke="#B4F04A" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  },
  {
    label: '나의 모임', path: '/meetup/my',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#9D5CF4" strokeWidth="1.8" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke="#9D5CF4" strokeWidth="1.8"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#9D5CF4" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  },
  {
    label: '설정', path: '/my/settings',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8"/></svg>,
  },
]

export default function MyPage() {
  const navigate = useNavigate()
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: '#1C1C2E' }}>
      {/* 헤더 */}
      <div className="px-5 pt-14 pb-2">
        <p className="text-white font-bold text-lg">마이페이지</p>
      </div>

      {/* 프로필 섹션 */}
      <div className="px-5 pt-4 pb-6">
        <div className="flex flex-col items-center">
          {/* 아바타 */}
          <div className="relative mb-3">
            <img
              src={lv2Img}
              alt="프로필"
              className="w-24 h-24 rounded-full object-cover"
              style={{ border: '2px solid rgba(255,255,255,0.1)' }}
            />
            <div
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center border-2"
              style={{ backgroundColor: '#B4F04A', borderColor: '#1C1C2E' }}
            >
              <span className="text-[10px] font-bold" style={{ color: '#1C1C2E' }}>92</span>
            </div>
          </div>

          {/* 이름 */}
          <p className="text-white font-bold text-xl mb-1">하루</p>

          {/* 신조 문구 */}
          <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
            근거리 분 산책하고 싶다면!
          </p>

          {/* 종목 태그 */}
          <div className="flex flex-wrap justify-center gap-2">
            {SPORT_TAGS.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full font-medium"
                style={{ backgroundColor: 'rgba(157,92,244,0.15)', color: '#9D5CF4', border: '1px solid rgba(157,92,244,0.25)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 구분선 */}
        <div className="mt-6 mb-5 h-px" style={{ backgroundColor: 'rgba(255,255,255,0.07)' }} />

        {/* 운동 통계 */}
        <div className="grid grid-cols-3 text-center">
          {[
            { label: '총 운동횟수', value: '48회' },
            { label: '총 거리', value: '184km' },
            { label: '총 시간', value: '62h' },
          ].map((stat, i) => (
            <div key={i} className={i > 0 ? 'border-l' : ''} style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
              <p className="text-white font-bold text-lg">{stat.value}</p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 최근 운동 기록 */}
      <div className="px-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-white font-bold text-sm">최근 운동 기록</p>
          <button
            onClick={() => navigate('/workout/manage')}
            className="text-xs font-medium"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            전체 보기 →
          </button>
        </div>

        <div className="space-y-2.5">
          {RECENT_WORKOUTS.map((w) => (
            <div
              key={w.id}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 border border-white/8"
              style={{ backgroundColor: '#2C2C3E' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(180,240,74,0.1)' }}
              >
                <img src={w.img} alt={w.sport} className="w-5 h-5 object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-white text-sm font-bold">{w.sport}</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{w.date}</p>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  {w.distance !== '-' && (
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{w.distance}</span>
                  )}
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{w.time}</span>
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{w.calories}kcal</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 구분선 */}
      <div className="mx-5 mb-4 h-px" style={{ backgroundColor: 'rgba(255,255,255,0.07)' }} />

      {/* 메뉴 */}
      <div className="px-5">
        <div className="rounded-2xl overflow-hidden border border-white/8" style={{ backgroundColor: '#2C2C3E' }}>
          {MENU_ITEMS.map((item, i) => (
            <button
              key={i}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center justify-between px-4 py-4"
              style={{ borderBottom: i < MENU_ITEMS.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="text-sm font-medium text-white">{item.label}</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowLogoutModal(true)}
          className="w-full mt-3 py-4 rounded-2xl text-sm font-medium"
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
