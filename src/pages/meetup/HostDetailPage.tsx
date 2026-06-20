import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ParticipantProfile } from '../../components/ParticipantProfileSheet'
import lv1Img from '../../assets/lv1.png'
import lv2Img from '../../assets/lv2.png'
import lv3Img from '../../assets/lv3.png'

function getLevelImage(levelLabel: string): string {
  if (levelLabel === '숙련자') return lv3Img
  if (levelLabel === '중급자') return lv2Img
  return lv1Img
}

const meetup = {
  title: '퇴근 후 산책 하실 분',
  location: '안양천',
  time: '20:00~21:00',
  date: '오늘',
  participants: '3/6',
  tags: ['전체 레벨 가능', '전체 성별 가능', '20~40세'],
}

type ApplicantStatus = '대기중' | '승인됨' | '거절됨'

interface Applicant extends ParticipantProfile {
  id: number
  appStatus: ApplicantStatus
}

const initialApplicants: Applicant[] = [
  {
    id: 1, appStatus: '대기중',
    name: '고양이', age: 28, gender: '여', level: 22, avatar: '고',
    hashtags: ['#산책', '#초보자'],
    bio: '퇴근 후 가볍게 걷고 싶어서 신청했어요. 잘 부탁드려요!',
    tendency: '빠르지 않게 천천히 걷는 걸 좋아해요.',
    levelLabel: '초보자',
    trust: { workoutCount: 5, meetupCount: 2, recommend: 1, levelAccurate: 0, meetAgain: 1, punctual: 2 },
  },
  {
    id: 2, appStatus: '대기중',
    name: '오리', age: 32, gender: '남', level: 15, avatar: '오',
    hashtags: ['#걷기', '#입문자'],
    bio: '운동을 새로 시작하려고 합니다. 함께 걸으면 좋겠어요.',
    tendency: '입문자라 페이스 조절이 어렵지만 열심히 따라가겠습니다.',
    levelLabel: '초보자',
    trust: { workoutCount: 2, meetupCount: 0, recommend: 0, levelAccurate: 0, meetAgain: 0, punctual: 0 },
  },
]

const initialMembers: ParticipantProfile[] = [
  {
    name: '강아지', age: 25, gender: '남', level: 30, avatar: '강',
    hashtags: ['#산책', '#중급자'],
    bio: '운동을 꾸준히 하고 싶은 평범한 직장인이에요.',
    tendency: '무리하지 않고 꾸준히 하는 걸 목표로 합니다.',
    levelLabel: '중급자', isHost: true,
    trust: { workoutCount: 15, meetupCount: 5, recommend: 3, levelAccurate: 2, meetAgain: 2, punctual: 4 },
  },
  {
    name: '개나리', age: 22, gender: '여', level: 18, avatar: '개',
    hashtags: ['#산책', '#입문자'],
    bio: '운동을 막 시작한 초보예요.',
    tendency: '천천히 함께 걷고 싶습니다.',
    levelLabel: '초보자',
    trust: { workoutCount: 3, meetupCount: 1, recommend: 1, levelAccurate: 0, meetAgain: 0, punctual: 1 },
  },
  {
    name: '문어', age: 24, gender: '여', level: 15, avatar: '문',
    hashtags: ['#런닝', '#입문자'],
    bio: '집에서 나오기 위해 가입했습니다.',
    tendency: '입문자지만 점차 숙련된 러너를 목표로 하고 있어요.',
    levelLabel: '초보자',
    trust: { workoutCount: 10, meetupCount: 2, recommend: 1, levelAccurate: 0, meetAgain: 1, punctual: 2 },
  },
]

const statusStyle: Record<ApplicantStatus, { bg: string; color: string }> = {
  '대기중': { bg: 'rgba(180,240,74,0.10)', color: '#B4F04A' },
  '승인됨': { bg: 'rgba(120,180,255,0.12)', color: '#78B4FF' },
  '거절됨': { bg: 'rgba(255,80,80,0.10)', color: '#FF5050' },
}

export default function HostDetailPage() {
  const navigate = useNavigate()
  const [applicants, setApplicants] = useState<Applicant[]>(initialApplicants)
  const [currentMembers, setCurrentMembers] = useState<ParticipantProfile[]>(initialMembers)
  const [rejectTarget, setRejectTarget] = useState<number | null>(null)
  const [rejectReason, setRejectReason] = useState('')

  const approve = (id: number) => {
    const found = applicants.find((a) => a.id === id)
    if (!found) return
    setApplicants(applicants.filter((a) => a.id !== id))
    setCurrentMembers([...currentMembers, { ...found, isHost: false }])
  }

  const confirmReject = () => {
    if (!rejectReason.trim() || rejectTarget === null) return
    setApplicants((prev) => prev.map((a) => a.id === rejectTarget ? { ...a, appStatus: '거절됨' } : a))
    setRejectTarget(null)
    setRejectReason('')
  }

  const pendingCount = applicants.filter((a) => a.appStatus === '대기중').length

  return (
    <div className="min-h-screen bg-fig flex flex-col pb-10">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4">
        <button onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <p className="text-sm font-bold text-white">번개 관리</p>
        <div className="w-5" />
      </div>

      <div className="px-5 space-y-4">
        {/* 모임 정보 카드 */}
        <div className="rounded-2xl p-4 border border-white/8" style={{ backgroundColor: '#2C2C3E' }}>
          <div className="flex items-start justify-between mb-3">
            <p className="text-white font-bold text-base">{meetup.title}</p>
            <button onClick={() => navigate('/meetup/detail', { state: { isHost: true } })}
              className="text-[11px] font-medium flex-shrink-0 ml-2" style={{ color: '#B4F04A' }}>
              상세 보기
            </button>
          </div>
          <div className="space-y-2 mb-3">
            {[
              { icon: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z', fill: true, text: meetup.location },
              { icon: 'circle', fill: false, text: `${meetup.date} ${meetup.time}` },
            ].map((row, i) => (
              <div key={i} className="flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  {i === 0
                    ? <path d={row.icon} fill="rgba(255,255,255,0.4)" />
                    : <><circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.4)" strokeWidth="1.8" /><path d="M12 7v5l3 3" stroke="rgba(255,255,255,0.4)" strokeWidth="1.8" strokeLinecap="round" /></>
                  }
                </svg>
                <p className="text-white/50 text-xs">{row.text}</p>
              </div>
            ))}
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

        {/* 참여 신청자 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-white text-sm font-bold">참여 신청자</p>
            <span className="text-white/40 text-xs">{pendingCount}명 대기중</span>
          </div>
          <div className="space-y-2">
            {applicants.map((a) => (
              <div key={a.id} className="rounded-2xl px-4 py-3 border border-white/8" style={{ backgroundColor: '#2C2C3E' }}>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigate('/profile/view', { state: { participant: a } })}
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
                    style={{ background: 'rgba(157,92,244,0.15)', border: '2px solid rgba(157,92,244,0.3)' }}
                  >
                    <img src={getLevelImage(a.levelLabel)} alt={a.name} className="w-6 h-6 object-contain" />
                  </button>
                  <button className="flex-1 min-w-0 text-left"
                    onClick={() => navigate('/profile/view', { state: { participant: a } })}>
                    <div className="flex items-center gap-1.5">
                      <p className="text-white text-xs font-bold">{a.name}</p>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold" style={statusStyle[a.appStatus]}>
                        {a.appStatus}
                      </span>
                    </div>
                    <p className="text-white/40 text-[10px] mt-0.5">LV.{a.level} · {a.gender} · {a.age}세</p>
                  </button>
                  {a.appStatus === '대기중' && (
                    <div className="flex gap-1.5 flex-shrink-0">
                      <button onClick={() => approve(a.id)}
                        className="px-3 py-1.5 rounded-xl text-[11px] font-bold"
                        style={{ backgroundColor: 'rgba(180,240,74,0.12)', color: '#B4F04A' }}>
                        승인
                      </button>
                      <button onClick={() => { setRejectTarget(a.id); setRejectReason('') }}
                        className="px-3 py-1.5 rounded-xl text-[11px] font-bold"
                        style={{ backgroundColor: 'rgba(255,80,80,0.10)', color: '#FF5050' }}>
                        거절
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 참여 확정 멤버 */}
        <div>
          <p className="text-white text-sm font-bold mb-3">참여 확정 멤버</p>
          <div className="space-y-2">
            {currentMembers.map((m) => (
              <button
                key={m.name}
                onClick={() => navigate('/profile/view', { state: { participant: m } })}
                className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 border border-white/8 text-left"
                style={{ backgroundColor: '#2C2C3E' }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
                  style={{
                    background: m.isHost
                      ? 'linear-gradient(135deg, rgba(180,240,74,0.25), rgba(157,92,244,0.25))'
                      : 'rgba(157,92,244,0.15)',
                    border: m.isHost ? '2px solid rgba(180,240,74,0.5)' : '2px solid rgba(157,92,244,0.3)',
                  }}>
                  <img src={getLevelImage(m.levelLabel)} alt={m.name} className="w-6 h-6 object-contain" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="text-white text-xs font-bold">{m.name}</p>
                    {m.isHost && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold"
                        style={{ backgroundColor: 'rgba(180,240,74,0.15)', color: '#B4F04A' }}>
                        운영자
                      </span>
                    )}
                  </div>
                  <p className="text-white/40 text-[10px] mt-0.5">{m.age}세 / {m.gender} / LV.{m.level}</p>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* 새 번개 만들기 */}
        <button onClick={() => navigate('/meetup/create')}
          className="w-full rounded-2xl py-4 border border-dashed border-white/20 flex items-center justify-center gap-2"
          style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="text-white/40 text-sm font-medium">새 번개 만들기</span>
        </button>
      </div>

      {/* 거절 사유 모달 */}
      {rejectTarget !== null && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-6"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
          onClick={() => setRejectTarget(null)}>
          <div className="w-full rounded-2xl p-5" style={{ backgroundColor: '#2C2C3E', maxWidth: 320 }}
            onClick={(e) => e.stopPropagation()}>
            <p className="text-white font-bold text-base mb-1">거절 사유를 입력해 주세요</p>
            <p className="text-white/40 text-xs mb-4">사유는 신청자에게 전달됩니다.</p>
            <textarea
              autoFocus
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value.slice(0, 100))}
              placeholder="거절 사유를 입력해 주세요"
              rows={3}
              className="w-full rounded-xl px-4 py-3 text-sm outline-none border border-white/10 mb-1 resize-none"
              style={{ backgroundColor: '#1C1C2E', color: '#fff' }}
            />
            <p className="text-[10px] text-white/30 text-right mb-4">{rejectReason.length}/100</p>
            <div className="flex gap-2">
              <button onClick={() => setRejectTarget(null)}
                className="flex-1 py-3 rounded-xl text-sm font-medium"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}>
                취소
              </button>
              <button onClick={confirmReject}
                className="flex-1 py-3 rounded-xl text-sm font-bold"
                style={{
                  backgroundColor: rejectReason.trim() ? 'rgba(255,80,80,0.15)' : 'rgba(255,255,255,0.05)',
                  color: rejectReason.trim() ? '#FF5050' : 'rgba(255,255,255,0.2)',
                }}>
                거절하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
