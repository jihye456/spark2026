import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import lv1Img from '../../assets/lv1.png'
import lv2Img from '../../assets/lv2.png'
import lv3Img from '../../assets/lv3.png'
import type { ParticipantProfile } from '../../components/ParticipantProfileSheet'

function getLevelImage(label: string) {
  if (label === '숙련자') return lv3Img
  if (label === '중급자') return lv2Img
  return lv1Img
}

const MEMBERS: (ParticipantProfile & { id: number; initial: string })[] = [
  {
    id: 2, initial: '개',
    name: '개나리', age: 22, gender: '여', level: 18, avatar: '개',
    levelLabel: '초보자', isHost: true,
    hashtags: ['#산책', '#입문자'],
    bio: '운동을 막 시작한 초보예요.',
    tendency: '천천히 함께 걷고 싶습니다.',
    trust: { workoutCount: 3, meetupCount: 1, recommend: 1, levelAccurate: 0, meetAgain: 0, punctual: 1 },
  },
  {
    id: 3, initial: '문',
    name: '문어', age: 24, gender: '여', level: 15, avatar: '문',
    levelLabel: '초보자', isHost: false,
    hashtags: ['#런닝', '#입문자'],
    bio: '집에서 나오기 위해 가입했습니다.',
    tendency: '입문자지만 점차 숙련된 러너를 목표로 해요.',
    trust: { workoutCount: 10, meetupCount: 2, recommend: 1, levelAccurate: 0, meetAgain: 1, punctual: 2 },
  },
  {
    id: 4, initial: '하',
    name: '하늘', age: 29, gender: '남', level: 35, avatar: '하',
    levelLabel: '중급자', isHost: false,
    hashtags: ['#걷기', '#중급자'],
    bio: '꾸준히 운동하는 걸 좋아합니다.',
    tendency: '무리하지 않고 즐겁게 함께해요.',
    trust: { workoutCount: 20, meetupCount: 8, recommend: 5, levelAccurate: 3, meetAgain: 4, punctual: 6 },
  },
]

const BASIC_KEYWORDS = ['추천', '작성한 운동 수준이 정확해요']
const DETAIL_KEYWORDS = ['친절해요', '시간을 잘 지켜요', '다시 만나고 싶어요', '운동을 잘해요', '활발해요', '매너가 좋아요', '대화가 즐거워요', '긍정 에너지가 넘쳐요']
const REPORT_REASONS = ['노쇼', '비매너', '욕설/폭언', '약속 불이행', '기타']

export default function MeetupFinishPage() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<number | null>(null)
  const [reviews, setReviews] = useState<Record<number, string[]>>({})
  const [reported, setReported] = useState<number[]>([])
  const [searches, setSearches] = useState<Record<number, string>>({})
  const [reportTarget, setReportTarget] = useState<number | null>(null)
  const [reportReason, setReportReason] = useState('')
  const [reportDetail, setReportDetail] = useState('')
  const [done, setDone] = useState(false)

  const toggleMember = (id: number) => {
    setSelected((prev) => (prev === id ? null : id))
  }

  const toggleKeyword = (memberId: number, kw: string) => {
    setReviews((prev) => {
      const curr = prev[memberId] ?? []
      if (curr.includes(kw)) return { ...prev, [memberId]: curr.filter((k) => k !== kw) }
      return { ...prev, [memberId]: [...curr, kw] }
    })
  }

  const openReport = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    if (reported.includes(id)) return
    setReportTarget(id)
    setReportReason('')
    setReportDetail('')
  }

  const confirmReport = () => {
    if (!reportReason) return
    if (reportReason === '기타' && !reportDetail.trim()) return
    setReported((prev) => [...prev, reportTarget!])
    if (selected === reportTarget) setSelected(null)
    setReportTarget(null)
  }

  const handleDone = () => {
    setDone(true)
    setTimeout(() => navigate('/meetup'), 1500)
  }

  if (done) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: '#1C1C2E' }}>
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
          style={{ backgroundColor: 'rgba(180,240,74,0.12)', border: '2px solid rgba(180,240,74,0.3)' }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17L4 12" stroke="#B4F04A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-white font-bold text-xl mb-2">수고하셨습니다!</p>
        <p className="text-white/40 text-sm">후기가 저장되었습니다</p>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col relative" style={{ backgroundColor: '#1C1C2E' }}>
      {/* 헤더 */}
      <div className="px-5 pt-14 pb-2 flex-shrink-0">
        <p className="text-white font-bold text-xl">운동 종료</p>
        <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
          함께한 모임원에게 후기를 남겨보세요
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-4 space-y-2 pb-4 scrollbar-none">
        {MEMBERS.map((m) => {
          const isSelected = selected === m.id
          const isReported = reported.includes(m.id)
          const memberKws = reviews[m.id] ?? []
          const search = searches[m.id] ?? ''
          const filteredDetail = DETAIL_KEYWORDS.filter((kw) =>
            search.trim() === '' || kw.includes(search.trim())
          )

          return (
            <div key={m.id}>
              <button
                onClick={() => !isReported && toggleMember(m.id)}
                className="w-full rounded-2xl p-4 border text-left transition-all"
                style={{
                  backgroundColor: '#2C2C3E',
                  borderColor: isSelected
                    ? 'rgba(180,240,74,0.4)'
                    : isReported
                    ? 'rgba(255,100,100,0.2)'
                    : 'rgba(255,255,255,0.08)',
                }}
              >
                <div className="flex items-center gap-3">
                  {/* 프로필 이미지 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate('/profile/view', { state: { participant: m } })
                    }}
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
                    style={{
                      background: m.isHost
                        ? 'linear-gradient(135deg, rgba(180,240,74,0.25), rgba(157,92,244,0.25))'
                        : 'rgba(157,92,244,0.15)',
                      border: m.isHost
                        ? '2px solid rgba(180,240,74,0.5)'
                        : isReported
                        ? '2px solid rgba(255,100,100,0.3)'
                        : '2px solid rgba(157,92,244,0.3)',
                    }}
                  >
                    <img src={getLevelImage(m.levelLabel)} alt={m.name} className="w-7 h-7 object-contain" />
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <p className="text-white text-sm font-bold">{m.name}</p>
                      {m.isHost && (
                        <span
                          className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                          style={{ backgroundColor: 'rgba(180,240,74,0.15)', color: '#B4F04A' }}
                        >
                          모임장
                        </span>
                      )}
                      <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                        LV.{m.level} · {m.gender} · {m.age}세
                      </span>
                    </div>
                    {memberKws.length > 0 && !isReported && (
                      <p className="text-xs mt-0.5 truncate" style={{ color: '#B4F04A' }}>
                        {memberKws.join(' · ')}
                      </p>
                    )}
                    {isReported && (
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(255,100,100,0.7)' }}>신고 접수됨</p>
                    )}
                  </div>

                  <button
                    onClick={(e) => openReport(m.id, e)}
                    className="text-[11px] px-2.5 py-1.5 rounded-lg flex-shrink-0 transition-all"
                    style={{
                      backgroundColor: isReported ? 'rgba(255,100,100,0.15)' : 'rgba(255,255,255,0.06)',
                      color: isReported ? '#FF6464' : 'rgba(255,255,255,0.3)',
                      pointerEvents: isReported ? 'none' : 'auto',
                    }}
                  >
                    {isReported ? '신고됨' : '신고'}
                  </button>
                </div>
              </button>

              {/* 키워드 패널 */}
              {isSelected && !isReported && (
                <div
                  className="mt-1.5 mx-1 rounded-2xl overflow-hidden"
                  style={{ backgroundColor: '#252535', border: '1px solid rgba(180,240,74,0.15)' }}
                >
                  {/* 기본 키워드 */}
                  <div className="px-4 pt-4 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <p className="text-[11px] font-bold mb-2.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      기본 키워드
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {BASIC_KEYWORDS.map((kw) => {
                        const active = memberKws.includes(kw)
                        return (
                          <button
                            key={kw}
                            onClick={() => toggleKeyword(m.id, kw)}
                            className="text-xs px-3 py-1.5 rounded-full font-medium transition-all"
                            style={{
                              backgroundColor: active ? 'rgba(180,240,74,0.15)' : 'rgba(255,255,255,0.06)',
                              color: active ? '#B4F04A' : 'rgba(255,255,255,0.4)',
                              border: `1px solid ${active ? 'rgba(180,240,74,0.4)' : 'transparent'}`,
                            }}
                          >
                            {kw}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* 상세 키워드 */}
                  <div className="px-4 pt-3 pb-4">
                    <p className="text-[11px] font-bold mb-2.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      상세 키워드
                    </p>
                    <div
                      className="flex items-center gap-2 rounded-xl px-3 py-2 mb-3"
                      style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <circle cx="11" cy="11" r="8" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                        <path d="M21 21l-4.35-4.35" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      <input
                        value={search}
                        onChange={(e) => setSearches((prev) => ({ ...prev, [m.id]: e.target.value }))}
                        onClick={(e) => e.stopPropagation()}
                        placeholder="키워드 검색"
                        className="flex-1 bg-transparent text-xs outline-none"
                        style={{ color: '#fff' }}
                      />
                      {search && (
                        <button
                          onClick={(e) => { e.stopPropagation(); setSearches((prev) => ({ ...prev, [m.id]: '' })) }}
                          style={{ color: 'rgba(255,255,255,0.3)' }}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {filteredDetail.length === 0 ? (
                        <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.25)' }}>검색 결과 없음</p>
                      ) : (
                        filteredDetail.map((kw) => {
                          const active = memberKws.includes(kw)
                          return (
                            <button
                              key={kw}
                              onClick={() => toggleKeyword(m.id, kw)}
                              className="text-xs px-3 py-1.5 rounded-full font-medium transition-all"
                              style={{
                                backgroundColor: active ? 'rgba(180,240,74,0.15)' : 'rgba(255,255,255,0.06)',
                                color: active ? '#B4F04A' : 'rgba(255,255,255,0.4)',
                                border: `1px solid ${active ? 'rgba(180,240,74,0.4)' : 'transparent'}`,
                              }}
                            >
                              {kw}
                            </button>
                          )
                        })
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}

      </div>

      {/* 버튼 - 프레임 하단 고정 */}
      <div className="px-5 py-4 flex-shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <button
          onClick={handleDone}
          className="w-full py-3.5 rounded-2xl font-bold text-sm"
          style={{ backgroundColor: '#B4F04A', color: '#1C1C2E' }}
        >
          후기 저장하기
        </button>
      </div>

      {/* 신고 사유 모달 */}
      {reportTarget !== null && (
        <div
          className="absolute inset-0 z-50 flex items-end justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.65)' }}
          onClick={() => setReportTarget(null)}
        >
          <div
            className="w-full rounded-t-3xl p-5 pb-10"
            style={{ backgroundColor: '#2C2C3E' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />
            <p className="text-white font-bold text-base mb-1">신고 사유를 선택해 주세요</p>
            <p className="text-xs mb-5" style={{ color: 'rgba(255,255,255,0.4)' }}>
              사유는 검토 후 처리됩니다
            </p>

            <div className="space-y-2 mb-4">
              {REPORT_REASONS.map((r) => (
                <button
                  key={r}
                  onClick={() => { setReportReason(r); if (r !== '기타') setReportDetail('') }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all"
                  style={{
                    backgroundColor: reportReason === r ? 'rgba(255,100,100,0.12)' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${reportReason === r ? 'rgba(255,100,100,0.3)' : 'transparent'}`,
                  }}
                >
                  <span className="text-sm font-medium" style={{ color: reportReason === r ? '#FF6464' : 'rgba(255,255,255,0.7)' }}>
                    {r}
                  </span>
                  {reportReason === r && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17L4 12" stroke="#FF6464" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            {reportReason === '기타' && (
              <textarea
                autoFocus
                value={reportDetail}
                onChange={(e) => setReportDetail(e.target.value.slice(0, 100))}
                placeholder="상세 내용을 입력해 주세요"
                rows={3}
                className="w-full rounded-xl px-4 py-3 text-sm outline-none border border-white/10 mb-1 resize-none"
                style={{ backgroundColor: '#1C1C2E', color: '#fff' }}
              />
            )}
            {reportReason === '기타' && (
              <p className="text-[10px] text-right mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {reportDetail.length}/100
              </p>
            )}

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setReportTarget(null)}
                className="flex-1 py-3 rounded-xl text-sm font-medium"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}
              >
                취소
              </button>
              <button
                onClick={confirmReport}
                className="flex-1 py-3 rounded-xl text-sm font-bold"
                style={{
                  backgroundColor: reportReason && (reportReason !== '기타' || reportDetail.trim())
                    ? 'rgba(255,80,80,0.18)'
                    : 'rgba(255,255,255,0.05)',
                  color: reportReason && (reportReason !== '기타' || reportDetail.trim())
                    ? '#FF6464'
                    : 'rgba(255,255,255,0.2)',
                }}
              >
                신고하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
