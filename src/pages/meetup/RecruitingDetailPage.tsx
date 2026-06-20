import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ParticipantProfile } from '../../components/ParticipantProfileSheet'
import lv1Img from '../../assets/lv1.png'
import lv2Img from '../../assets/lv2.png'
import lv3Img from '../../assets/lv3.png'

function getLevelImage(levelLabel: string): string {
  if (levelLabel === '숙련자') return lv3Img
  if (levelLabel === '중급자') return lv2Img
  return lv1Img
}

function minutesUntil(timeStr: string): number {
  const now = new Date()
  const [h, m] = timeStr.split(':').map(Number)
  const target = new Date()
  target.setHours(h, m, 0, 0)
  return (target.getTime() - now.getTime()) / 60000
}

const meetup = {
  title: '가디단 야간 산책',
  location: '마루공원',
  startTime: '20:00',
  endTime: '21:00',
  date: '오늘',
  participants: '3/6',
  tags: ['전체 레벨 가능', '전체 성별 가능', '22~35세'],
}

const MY_CANCEL_COUNT = 2

const participants: ParticipantProfile[] = [
  {
    name: '강아지', age: 25, gender: '남', level: 30, avatar: '강',
    hashtags: ['#산책', '#중급자'],
    bio: '운동을 꾸준히 하고 싶은 평범한 직장인이에요. 같이 걸어요!',
    tendency: '무리하지 않고 꾸준히 하는 걸 목표로 합니다.',
    levelLabel: '중급자', isHost: true,
    trust: { workoutCount: 15, meetupCount: 5, recommend: 3, levelAccurate: 2, meetAgain: 2, punctual: 4 },
  },
  {
    name: '개나리', age: 22, gender: '여', level: 18, avatar: '개',
    hashtags: ['#산책', '#입문자'],
    bio: '운동을 막 시작한 초보예요. 잘 부탁드려요!',
    tendency: '천천히 함께 걷고 싶습니다.',
    levelLabel: '초보자',
    trust: { workoutCount: 3, meetupCount: 1, recommend: 1, levelAccurate: 0, meetAgain: 0, punctual: 1 },
  },
  {
    name: '문어', age: 24, gender: '여', level: 15, avatar: '문',
    hashtags: ['#런닝', '#입문자'],
    bio: '집에서 나오기 위해 가입했습니다. 천천히 같이 걸어요!',
    tendency: '입문자지만 점차 숙련된 러너를 목표로 하고 있어요.',
    levelLabel: '초보자',
    trust: { workoutCount: 10, meetupCount: 2, recommend: 1, levelAccurate: 0, meetAgain: 1, punctual: 2 },
  },
]

export default function RecruitingDetailPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const status = (location.state?.status as '신청중' | '승인됨') ?? '신청중'

  const [cancelled, setCancelled] = useState(false)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)

  const minsLeft = minutesUntil(meetup.startTime)
  const within30Min = minsLeft >= 0 && minsLeft <= 30
  const meetupPassed = minsLeft < 0

  const statusColor = cancelled
    ? { bg: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }
    : status === '승인됨'
      ? { bg: 'rgba(120,180,255,0.12)', color: '#78B4FF' }
      : { bg: 'rgba(180,240,74,0.12)', color: '#B4F04A' }

  return (
    <div className="min-h-screen bg-fig flex flex-col pb-10">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4">
        <button onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <p className="text-sm font-bold text-white">번개 상세</p>
        <div className="w-5" />
      </div>

      <div className="px-5 space-y-4">
        {/* 상태 뱃지 */}
        <div>
          <span className="text-xs font-bold px-3 py-1 rounded-full" style={statusColor}>
            {cancelled ? '취소됨' : status}
          </span>
        </div>

        {/* 모임 정보 카드 */}
        <div className="rounded-2xl p-4 border border-white/8" style={{ backgroundColor: '#2C2C3E' }}>
          <p className="text-white font-bold text-base mb-3">{meetup.title}</p>
          <div className="space-y-2 mb-3">
            <div className="flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="rgba(255,255,255,0.4)" />
              </svg>
              <p className="text-white/50 text-xs">{meetup.location}</p>
            </div>
            <div className="flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.4)" strokeWidth="1.8" />
                <path d="M12 7v5l3 3" stroke="rgba(255,255,255,0.4)" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <p className="text-white/50 text-xs">{meetup.date} {meetup.startTime}~{meetup.endTime}</p>
            </div>
            <div className="flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="rgba(255,255,255,0.4)" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="9" cy="7" r="4" stroke="rgba(255,255,255,0.4)" strokeWidth="1.8" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="rgba(255,255,255,0.4)" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <p className="text-white/50 text-xs">{meetup.participants} 참여</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {meetup.tags.map((t) => (
              <span key={t} className="text-[10px] px-2 py-0.5 rounded-full"
                style={{ backgroundColor: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.45)' }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* 취소 섹션 */}
        {!cancelled && !meetupPassed && (
          status === '신청중' ? (
            <div className="rounded-2xl p-4 border border-white/8" style={{ backgroundColor: '#2C2C3E' }}>
              <p className="text-white text-sm font-bold mb-3">참여 신청 취소</p>
              <div className="flex items-start gap-2 mb-4">
                <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: 'rgba(180,240,74,0.2)' }}>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
                    <path d="M12 8v4M12 16h.01" stroke="#B4F04A" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="space-y-0.5">
                  <p className="text-white/60 text-xs">운영자 승인 전이므로 자유롭게 취소할 수 있습니다.</p>
                  <p className="text-white/35 text-xs">취소 패널티 없음</p>
                </div>
              </div>
              <button onClick={() => setShowCancelConfirm(true)}
                className="w-full py-3 rounded-xl text-sm font-bold"
                style={{ backgroundColor: 'rgba(255,80,80,0.12)', color: '#FF5050' }}>
                참여 신청 취소
              </button>
            </div>
          ) : within30Min ? (
            <div className="rounded-2xl p-4 border" style={{ backgroundColor: 'rgba(255,80,80,0.06)', borderColor: 'rgba(255,80,80,0.25)' }}>
              <div className="flex items-start gap-2">
                <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: 'rgba(255,80,80,0.3)' }}>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6L18 18" stroke="#FF5050" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold mb-0.5" style={{ color: '#FF5050' }}>취소 불가</p>
                  <p className="text-xs" style={{ color: 'rgba(255,80,80,0.75)' }}>
                    모임 시작 30분 이내에는 참여 취소가 불가능합니다.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl p-4 border border-white/8" style={{ backgroundColor: '#2C2C3E' }}>
              <p className="text-white text-sm font-bold mb-3">참여 취소</p>
              <div className="rounded-xl p-3 mb-4" style={{ backgroundColor: 'rgba(255,160,60,0.08)', border: '1px solid rgba(255,160,60,0.25)' }}>
                <div className="flex items-start gap-2 mb-2">
                  <svg className="flex-shrink-0 mt-0.5" width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 20h20L12 2z" stroke="#FFA03C" strokeWidth="1.8" strokeLinejoin="round" />
                    <path d="M12 9v4M12 16h.01" stroke="#FFA03C" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  <p className="text-xs font-bold" style={{ color: '#FFA03C' }}>취소 시 주의사항</p>
                </div>
                <ul className="text-xs space-y-1 pl-1" style={{ color: 'rgba(255,160,60,0.8)' }}>
                  <li>· 승인된 번개를 취소하면 취소 횟수에 반영됩니다.</li>
                  <li>· 이번 달 취소 횟수: <span className="font-bold">{MY_CANCEL_COUNT}회</span> (3회 이상 시 1일 참여 정지)</li>
                  {MY_CANCEL_COUNT >= 2 && (
                    <li className="font-bold" style={{ color: '#FF5050' }}>· 이번 취소 시 패널티가 적용될 수 있습니다.</li>
                  )}
                </ul>
              </div>
              <button onClick={() => setShowCancelConfirm(true)}
                className="w-full py-3 rounded-xl text-sm font-bold"
                style={{ backgroundColor: 'rgba(255,80,80,0.12)', color: '#FF5050' }}>
                참여 취소
              </button>
            </div>
          )
        )}

        {/* 함께 운동하기 (승인됨일 때만) */}
        {status === '승인됨' && !cancelled && (
          <button
            onClick={() => navigate('/workout/together/mem-ready')}
            className="w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2"
            style={{ backgroundColor: 'rgba(157,92,244,0.12)', color: '#9D5CF4', border: '1px solid rgba(157,92,244,0.25)' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#9D5CF4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9" cy="7" r="4" stroke="#9D5CF4" strokeWidth="2" />
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#9D5CF4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            함께 운동하기
          </button>
        )}

        {/* 참여자 목록 */}
        <div>
          <p className="text-white text-sm font-bold mb-3">번개 참여자 목록</p>
          <div className="space-y-2">
            {participants.map((p) => (
              <button
                key={p.name}
                onClick={() => navigate('/profile/view', { state: { participant: p } })}
                className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 border border-white/8 text-left"
                style={{ backgroundColor: '#2C2C3E' }}
              >
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
                  style={{
                    background: p.isHost
                      ? 'linear-gradient(135deg, rgba(180,240,74,0.25), rgba(157,92,244,0.25))'
                      : 'rgba(157,92,244,0.15)',
                    border: p.isHost ? '2px solid rgba(180,240,74,0.5)' : '2px solid rgba(157,92,244,0.3)',
                  }}>
                  <img src={getLevelImage(p.levelLabel)} alt={p.name} className="w-5 h-5 object-contain" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="text-white text-xs font-bold">{p.name}</p>
                    {p.isHost && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold"
                        style={{ backgroundColor: 'rgba(180,240,74,0.15)', color: '#B4F04A' }}>
                        운영자
                      </span>
                    )}
                  </div>
                  <p className="text-white/40 text-[10px] mt-0.5">{p.age}세 / {p.gender} / LV.{p.level}</p>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 취소 확인 모달 */}
      {showCancelConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-6"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
          onClick={() => setShowCancelConfirm(false)}>
          <div className="w-full rounded-2xl p-5" style={{ backgroundColor: '#2C2C3E', maxWidth: 320 }}
            onClick={(e) => e.stopPropagation()}>
            <p className="text-white font-bold text-base mb-2">
              {status === '신청중' ? '참여 신청을 취소할까요?' : '정말 취소하시겠어요?'}
            </p>
            <p className="text-white/40 text-sm mb-5">
              {status === '신청중'
                ? '운영자 승인 전 취소이므로 패널티가 적용되지 않습니다.'
                : `취소 시 이번 달 취소 횟수가 ${MY_CANCEL_COUNT + 1}회가 됩니다. 3회 이상 시 1일 참여 정지 패널티가 적용됩니다.`}
            </p>
            <div className="flex gap-2">
              <button onClick={() => setShowCancelConfirm(false)}
                className="flex-1 py-3 rounded-xl text-sm font-medium"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}>
                돌아가기
              </button>
              <button onClick={() => { setCancelled(true); setShowCancelConfirm(false) }}
                className="flex-1 py-3 rounded-xl text-sm font-bold"
                style={{ backgroundColor: 'rgba(255,80,80,0.15)', color: '#FF5050' }}>
                {status === '신청중' ? '신청 취소' : '취소하기'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
