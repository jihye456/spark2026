import { useNavigate } from 'react-router-dom'

const badgeTags = ['#러닝', '#이른아침', '#장거리', '#혼자']

const workoutHistory = [
  { date: '2026.05/8', distance: '5.2km', tag: '러닝', emoji: '🏃' },
  { date: '2026.05/10', distance: '3.1km', tag: '러닝', emoji: '🏃' },
  { date: '2026.05/14', distance: '6.0km', tag: '러닝', emoji: '🏃' },
  { date: '2026.05/20', distance: '4.5km', tag: 'GYM', emoji: '🏋️' },
]

export default function ProfilePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-fig">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 pt-14 pb-3">
        <button onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <h1 className="text-sm font-bold text-white">프로필</h1>
        <button>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* 프로필 */}
      <div className="px-5 py-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-fig"
              style={{ background: 'linear-gradient(135deg, #B4F04A 0%, #9D5CF4 100%)' }}>
              지
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-lime rounded-full border-2 border-fig flex items-center justify-center">
              <span className="text-[9px] font-bold text-fig">92</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-lg font-bold text-white">지혜니</p>
              <span className="bg-white/10 text-white/60 text-xs px-2 py-0.5 rounded-full">LV.92</span>
            </div>
            <p className="text-sm text-white/40 mt-0.5">근거리 분 산택하고 싶다면!</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {badgeTags.map((tag, i) => (
                <span key={i} className="bg-purple/20 text-purple text-[10px] px-2 py-0.5 rounded-full">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* 스탯 */}
        <div className="grid grid-cols-4 gap-2 mt-5">
          {[
            { label: '선호 운동', value: '러닝' },
            { label: '이번 달', value: '12회' },
            { label: '총 거리', value: '48km' },
            { label: '참여 모임', value: '20개' },
          ].map((stat, i) => (
            <div key={i} className="bg-card rounded-xl p-2.5 text-center border border-white/5">
              <p className="text-sm font-bold text-white">{stat.value}</p>
              <p className="text-[10px] text-white/30 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 운동 기록 */}
      <div className="px-5 mt-2">
        <h3 className="text-sm font-bold text-white mb-3">운동 기록</h3>
        <div className="flex gap-2 mb-4">
          {['러닝', '자전거', '헬스', '수영'].map((type, i) => (
            <button
              key={i}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border ${i === 0 ? 'bg-lime text-fig border-lime' : 'bg-transparent text-white/40 border-white/10'}`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {workoutHistory.map((r, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-card rounded-2xl border border-white/5">
              <div className="w-10 h-10 bg-lime/20 rounded-xl flex items-center justify-center">
                <span className="text-sm">{r.emoji}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-white">{r.distance}</p>
                  <span className="text-xs bg-white/5 text-white/40 px-2 py-0.5 rounded-full">{r.tag}</span>
                </div>
                <p className="text-xs text-white/30 mt-0.5">{r.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 내가 참여한 모임 */}
      <div className="px-5 mt-5 mb-8">
        <h3 className="text-sm font-bold text-white mb-3">내가 참여한 모임</h3>
        <div className="grid grid-cols-2 gap-3">
          {['서울숲 러닝', '한강 자전거', '강남 GYM', '뚝섬 러닝'].map((meetup, i) => (
            <div key={i} className="bg-card rounded-2xl p-3 border border-white/5">
              <div className="w-8 h-8 bg-white/5 rounded-lg mb-2 flex items-center justify-center">
                <span className="text-sm">⚡</span>
              </div>
              <p className="text-xs font-bold text-white">{meetup}</p>
              <p className="text-[10px] text-white/30 mt-0.5">2026.05/{(i + 1) * 3}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
