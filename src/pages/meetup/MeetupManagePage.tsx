import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const INITIAL_APPLICANTS = [
  { id: 1, name: '달빛토끼', initial: '달', color: '#9D5CF4', time: '10분 전', msg: '같이 운동 해요!' },
  { id: 2, name: '바람개비', initial: '바', color: '#29B6F6', time: '32분 전', msg: '열심히 할게요 🙏' },
]

const INITIAL_CONFIRMED = [
  { id: 3, name: '강아지', initial: '강', color: '#B4F04A', isHost: true },
  { id: 4, name: '개나리', initial: '개', color: '#FF7043', isHost: false },
]

export default function MeetupManagePage() {
  const navigate = useNavigate()
  const [applicants, setApplicants] = useState(INITIAL_APPLICANTS)
  const [confirmed, setConfirmed] = useState(INITIAL_CONFIRMED)

  const approve = (id: number) => {
    const found = applicants.find((a) => a.id === id)
    if (!found) return
    setApplicants(applicants.filter((a) => a.id !== id))
    setConfirmed([...confirmed, { id: found.id, name: found.name, initial: found.initial, color: found.color, isHost: false }])
  }

  const reject = (id: number) => {
    setApplicants(applicants.filter((a) => a.id !== id))
  }

  return (
    <div className="min-h-screen pb-10" style={{ backgroundColor: '#1C1C2E' }}>
      {/* 헤더 */}
      <div className="flex items-center gap-3 px-5 pt-14 pb-4">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <p className="text-white font-bold text-base">참여 신청 관리</p>
      </div>

      <div className="px-5 space-y-6">
        {/* 신청 대기 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-white font-bold text-sm">신청 대기</p>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: 'rgba(255,160,60,0.15)', color: '#FFA03C' }}
            >
              {applicants.length}명
            </span>
          </div>

          {applicants.length === 0 ? (
            <div
              className="rounded-2xl py-8 flex items-center justify-center border border-white/8"
              style={{ backgroundColor: '#2C2C3E' }}
            >
              <p className="text-white/30 text-sm">대기 중인 신청자가 없습니다</p>
            </div>
          ) : (
            <div className="space-y-3">
              {applicants.map((a) => (
                <div
                  key={a.id}
                  className="rounded-2xl p-4 border border-white/8"
                  style={{ backgroundColor: '#2C2C3E' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                      style={{ backgroundColor: `${a.color}20`, border: `1.5px solid ${a.color}`, color: a.color }}
                    >
                      {a.initial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-bold">{a.name}</p>
                      {a.msg && (
                        <p className="text-white/40 text-xs mt-0.5 truncate">"{a.msg}"</p>
                      )}
                    </div>
                    <p className="text-white/30 text-[11px] flex-shrink-0">{a.time}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => reject(a.id)}
                      className="flex-1 py-2.5 rounded-xl text-sm font-medium"
                      style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)' }}
                    >
                      거절
                    </button>
                    <button
                      onClick={() => approve(a.id)}
                      className="flex-1 py-2.5 rounded-xl text-sm font-bold"
                      style={{ backgroundColor: 'rgba(180,240,74,0.15)', color: '#B4F04A' }}
                    >
                      승인
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 참여 확정 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-white font-bold text-sm">참여 확정</p>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: 'rgba(180,240,74,0.1)', color: '#B4F04A' }}
            >
              {confirmed.length}명
            </span>
          </div>
          <div className="rounded-2xl border border-white/8 overflow-hidden" style={{ backgroundColor: '#2C2C3E' }}>
            {confirmed.map((m, i) => (
              <div
                key={m.id}
                className="flex items-center gap-3 px-4 py-3"
                style={{ borderBottom: i < confirmed.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{ backgroundColor: `${m.color}20`, border: `1.5px solid ${m.color}`, color: m.color }}
                >
                  {m.initial}
                </div>
                <p className="text-white text-sm font-medium flex-1">{m.name}</p>
                {m.isHost && (
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: '#B4F04A', color: '#1C1C2E' }}
                  >
                    모임장
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
