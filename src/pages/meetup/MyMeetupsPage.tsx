import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const joinedMeetups = [
  { id: 1, title: '가디단 야간 산책', location: '마루공원', time: '20:00~21:00', date: '오늘', participants: '3/6', status: '신청중' },
  { id: 2, title: '안양천 걷기 모임', location: '안양천 산책로', time: '19:00~20:00', date: '내일', participants: '5/8', status: '승인됨' },
]

const hostedMeetups = [
  { id: 1, title: '퇴근 후 산책 하실 분', location: '안양천', time: '20:00~21:00', date: '오늘', participants: '3/6', applicants: 2 },
]

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  '신청중': { bg: 'rgba(180,240,74,0.12)', color: '#B4F04A' },
  '승인됨': { bg: 'rgba(120,180,255,0.12)', color: '#78B4FF' },
}

export default function MyMeetupsPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<'joined' | 'hosted'>('joined')

  return (
    <div className="min-h-screen bg-fig flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4">
        <button onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <p className="text-sm font-bold text-white">내 모임</p>
        <div className="w-5" />
      </div>

      {/* 탭 */}
      <div className="flex px-5 mb-5 gap-1 border-b border-white/8">
        {(['joined', 'hosted'] as const).map((t) => {
          const label = t === 'joined' ? '참여한 번개' : '만든 번개'
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="flex-1 py-3 text-sm font-bold transition-all"
              style={{
                color: tab === t ? '#B4F04A' : 'rgba(255,255,255,0.35)',
                borderBottom: tab === t ? '2px solid #B4F04A' : '2px solid transparent',
                marginBottom: -1,
              }}
            >
              {label}
            </button>
          )
        })}
      </div>

      {/* 참여한 번개 탭 */}
      {tab === 'joined' && (
        <div className="flex-1 px-5 space-y-3">
          {joinedMeetups.length === 0 && (
            <p className="text-center text-white/30 text-sm mt-16">참여한 번개가 없습니다.</p>
          )}
          {joinedMeetups.map((m) => (
            <button
              key={m.id}
              onClick={() => navigate('/meetup/recruiting', { state: { status: m.status } })}
              className="w-full rounded-2xl p-4 border border-white/8 text-left"
              style={{ backgroundColor: '#2C2C3E' }}
            >
              <div className="flex items-start justify-between mb-2">
                <p className="text-white text-sm font-bold">{m.title}</p>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ml-2"
                  style={STATUS_STYLE[m.status]}
                >
                  {m.status}
                </span>
              </div>
              <div className="flex items-center gap-1 mb-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="rgba(255,255,255,0.35)" />
                </svg>
                <p className="text-white/40 text-[11px]">{m.location}</p>
                <p className="text-white/25 text-[11px]">·</p>
                <p className="text-white/40 text-[11px]">{m.date} {m.time}</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-white/30 text-[11px]">참여 {m.participants}</p>
                <p className="text-white/40 text-[11px] font-medium">상세 보기 →</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* 만든 번개 탭 */}
      {tab === 'hosted' && (
        <div className="flex-1 px-5 space-y-3">
          {hostedMeetups.length === 0 && (
            <p className="text-center text-white/30 text-sm mt-16">만든 번개가 없습니다.</p>
          )}
          {hostedMeetups.map((m) => (
            <div
              key={m.id}
              onClick={() => navigate('/meetup/host')}
              className="w-full rounded-2xl p-4 border border-white/8 text-left cursor-pointer"
              style={{ backgroundColor: '#2C2C3E' }}
            >
              <div className="flex items-start justify-between mb-2">
                <p className="text-white text-sm font-bold">{m.title}</p>
                {m.applicants > 0 && (
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ml-2"
                    style={{ backgroundColor: 'rgba(255,160,60,0.15)', color: '#FFA03C' }}
                  >
                    신청자 {m.applicants}명
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 mb-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="rgba(255,255,255,0.35)" />
                </svg>
                <p className="text-white/40 text-[11px]">{m.location}</p>
                <p className="text-white/25 text-[11px]">·</p>
                <p className="text-white/40 text-[11px]">{m.date} {m.time}</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-white/30 text-[11px]">참여 {m.participants}</p>
              </div>
            </div>
          ))}

          {/* 새 번개 만들기 */}
          <button
            onClick={() => navigate('/meetup/create')}
            className="w-full rounded-2xl py-4 border border-dashed border-white/20 flex items-center justify-center gap-2 mt-2"
            style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="text-white/40 text-sm font-medium">새 번개 만들기</span>
          </button>
        </div>
      )}
    </div>
  )
}
