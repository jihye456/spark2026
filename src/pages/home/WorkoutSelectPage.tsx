import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const categories = ['전체', '러닝', '짐', '자전거', '수영', '기타']

const workouts = [
  { id: 1, name: '서울숲 가벼운 러닝', type: '러닝', time: '13:30', location: '서울숲 정문', participants: 3, max: 5, level: '입문', emoji: '🏃' },
  { id: 2, name: '한강 자전거 라이딩', type: '자전거', time: '15:00', location: '여의도 한강공원', participants: 2, max: 6, level: '중급', emoji: '🚴' },
  { id: 3, name: '홍대 크로스핏 GYM', type: '짐', time: '19:00', location: '홍대 GYM', participants: 4, max: 8, level: '고급', emoji: '🏋️' },
  { id: 4, name: '올림픽공원 저녁 러닝', type: '러닝', time: '20:00', location: '올림픽공원 동문', participants: 1, max: 4, level: '입문', emoji: '🏃' },
]

const nearbyMeetups = [
  { name: '퇴근 후 산책', distance: '0.3km', time: '20:00', emoji: '🚶' },
  { name: '거북런', distance: '0.8km', time: '21:00', emoji: '🏃' },
]

export default function WorkoutSelectPage() {
  const [activeCategory, setActiveCategory] = useState('전체')
  const navigate = useNavigate()

  const filtered = activeCategory === '전체' ? workouts : workouts.filter(w => w.type === activeCategory)

  return (
    <div className="min-h-screen bg-fig">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4">
        <button onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <p className="text-sm font-bold text-white">운동 찾기</p>
        <button>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="2" />
            <path d="M21 21L16.65 16.65" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="px-5">
        {/* 인사 */}
        <div className="mb-5">
          <p className="text-white/40 text-sm">오늘의 추천</p>
          <p className="text-white text-xl font-bold mt-0.5">하루님 공개를 골라이 있습니다!</p>
        </div>

        {/* 빠른 시작 3가지 */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: '내 주변\n번개 모임', emoji: '⚡', color: 'from-lime to-green-400', action: () => navigate('/meetup') },
            { label: '혼자\n운동하기', emoji: '💪', color: 'from-purple to-purple-light', action: () => navigate('/workout/session') },
            { label: '챌린지\n참여하기', emoji: '🏆', color: 'from-yellow-400 to-lime', action: () => navigate('/challenge') },
          ].map((item, i) => (
            <button
              key={i}
              onClick={item.action}
              className={`rounded-2xl p-3 text-left relative overflow-hidden bg-gradient-to-br ${item.color}`}
            >
              <span className="text-2xl block mb-2">{item.emoji}</span>
              <p className="text-fig text-[11px] font-bold leading-tight whitespace-pre-line">{item.label}</p>
            </button>
          ))}
        </div>

        {/* 내 주변 번개 */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold text-white">내 주변 번개</p>
            <button onClick={() => navigate('/meetup')} className="text-xs text-white/30">전체보기</button>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1">
            {nearbyMeetups.map((m, i) => (
              <div
                key={i}
                onClick={() => navigate('/meetup/detail')}
                className="flex-shrink-0 bg-card rounded-2xl p-3 min-w-[130px] border border-white/5 cursor-pointer"
              >
                <span className="text-xl">{m.emoji}</span>
                <p className="text-xs font-bold text-white mt-2">{m.name}</p>
                <p className="text-[10px] text-white/30 mt-0.5">{m.distance} · {m.time}</p>
              </div>
            ))}
            <div
              onClick={() => navigate('/meetup/create')}
              className="flex-shrink-0 bg-transparent rounded-2xl p-3 min-w-[110px] border border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer"
            >
              <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center mb-1">
                <span className="text-lime text-lg font-bold">+</span>
              </div>
              <p className="text-[10px] text-white/30 text-center">모임 만들기</p>
            </div>
          </div>
        </div>

        {/* 카테고리 필터 */}
        <div className="mb-4">
          <p className="text-sm font-bold text-white mb-3">자주 하는 운동 찾기</p>
          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeCategory === cat ? 'bg-lime text-fig' : 'bg-card text-white/40 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 운동 리스트 */}
        <div className="space-y-3 pb-8">
          {filtered.map((w) => (
            <div
              key={w.id}
              onClick={() => navigate('/meetup/detail')}
              className="bg-card rounded-2xl p-4 border border-white/5 cursor-pointer active:border-lime/20 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl flex-shrink-0">
                  {w.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-bold text-white truncate pr-2">{w.name}</p>
                    <span className={`flex-shrink-0 text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      w.level === '입문' ? 'bg-lime/20 text-lime' : w.level === '중급' ? 'bg-purple/20 text-purple' : 'bg-red-500/20 text-red-400'
                    }`}>{w.level}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-white/30 flex items-center gap-1">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#6B7280" strokeWidth="2" />
                        <path d="M12 6V12L16 14" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      {w.time}
                    </span>
                    <span className="text-xs text-white/30 flex items-center gap-1">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="#6B7280" strokeWidth="2" />
                      </svg>
                      {w.location}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1">
                      <div className="flex -space-x-1">
                        {Array.from({ length: Math.min(w.participants, 3) }).map((_, i) => (
                          <div key={i} className="w-5 h-5 rounded-full bg-white/10 border border-white/20" />
                        ))}
                      </div>
                      <span className="text-[10px] text-white/30 ml-1">{w.participants}/{w.max}명</span>
                    </div>
                    <button className="bg-lime text-fig text-[10px] font-bold px-3 py-1 rounded-full">참여하기</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
