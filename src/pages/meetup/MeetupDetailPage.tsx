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


const DEFAULT_MEETUP = {
  title: '퇴근 후 산책 하실 분',
  location: '안양천',
  startTime: '20:00',
  endTime: '21:00',
  current: 3,
  max: 6,
  tags: ['전체 레벨 가능', '전체 성별 가능', '22~26세'],
  desc: '비슷한 나이 대의 여성분만 들어와주세요.\n같이 산책하면서 대화도 나누고 천천히 산책하려고 합니다!!\n\n코스는 상관 없이 안양천을 따라 걷고 무리하지는 않는 산책이니 부담 없이 참여해주세요.',
}

const participants: ParticipantProfile[] = [
  {
    name: '강아지', age: 25, gender: '남', level: 30, avatar: '강',
    hashtags: ['#산책', '#중급자'],
    bio: '운동을 꾸준히 하고 싶은 평범한 직장인이에요. 같이 걸어요!',
    tendency: '무리하지 않고 꾸준히 하는 걸 목표로 합니다. 대화하면서 걷는 게 좋아요.',
    levelLabel: '중급자', isHost: true,
    trust: { workoutCount: 15, meetupCount: 5, recommend: 3, levelAccurate: 2, meetAgain: 2, punctual: 4 },
  },
  {
    name: '개나리', age: 22, gender: '여', level: 18, avatar: '개',
    hashtags: ['#산책', '#입문자'],
    bio: '운동을 막 시작한 초보예요. 잘 부탁드려요!',
    tendency: '이제 막 운동을 시작했어요. 천천히 함께 걷고 싶습니다.',
    levelLabel: '초보자', isHost: false,
    trust: { workoutCount: 3, meetupCount: 1, recommend: 1, levelAccurate: 0, meetAgain: 0, punctual: 1 },
  },
  {
    name: '문어', age: 24, gender: '여', level: 15, avatar: '문',
    hashtags: ['#런닝', '#입문자'],
    bio: '운동을 잘 하진 못하지만 집에서 나오기 위하여 가입하였습니다.',
    tendency: '지금은 입문자라서 느리지만 점차 숙련된 러너를 목표로 하고 있어요.',
    levelLabel: '초보자', isHost: false,
    trust: { workoutCount: 10, meetupCount: 2, recommend: 1, levelAccurate: 0, meetAgain: 1, punctual: 2 },
  },
]

export default function MeetupDetailPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const isHost = location.state?.isHost === true
  const meetup = location.state?.meetup ?? DEFAULT_MEETUP

  // Participant state
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [applied, setApplied] = useState(false)

  // Host state
  const [isEditing, setIsEditing] = useState(false)
  const [editDesc, setEditDesc] = useState(meetup.desc)
  const [savedDesc, setSavedDesc] = useState(meetup.desc)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleted, setDeleted] = useState(false)

  const handleSaveDesc = () => {
    setSavedDesc(editDesc)
    setIsEditing(false)
  }

  const handleDelete = () => {
    setDeleted(true)
    setShowDeleteModal(false)
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#1C1C2E' }}>
      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4 flex-shrink-0">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="text-white font-bold text-base">번개 상세</p>
        {isHost ? (
          <button
            onClick={() => navigate('/meetup/host')}
            className="text-xs font-bold px-3 py-1.5 rounded-full"
            style={{ backgroundColor: 'rgba(180,240,74,0.12)', color: '#B4F04A' }}
          >
            신청 관리
          </button>
        ) : (
          <div className="flex items-center gap-1">
            <button className="w-9 h-9 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button className="w-9 h-9 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* 스크롤 콘텐츠 */}
      <div className="flex-1 overflow-y-auto scrollbar-none pb-44">
        <div className="px-5">
          {deleted && (
            <div className="rounded-2xl px-4 py-3 mb-4 flex items-center gap-2"
              style={{ backgroundColor: 'rgba(255,80,80,0.08)', border: '1px solid rgba(255,80,80,0.2)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="#FF5050" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <p className="text-xs font-medium" style={{ color: '#FF5050' }}>삭제된 번개입니다.</p>
            </div>
          )}

          <h1 className="text-white text-xl font-bold mb-2">{meetup.title}</h1>

          <div className="flex items-center gap-1.5 mb-4">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="rgba(255,255,255,0.4)" />
            </svg>
            <span className="text-white/50 text-sm">{meetup.location}</span>
            <span className="text-white/30 text-sm">({meetup.current}/{meetup.max})</span>
          </div>

          <p className="text-white text-3xl font-bold mb-5">{meetup.startTime} ~ {meetup.endTime}</p>

          <div className="flex flex-wrap gap-2 mb-5">
            {meetup.tags.map((tag: string) => (
              <span key={tag} className="px-3 py-1.5 rounded-full border text-xs"
                style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)' }}>
                {tag}
              </span>
            ))}
          </div>

          {/* 상세 설명 – 호스트는 인라인 편집 가능 */}
          {isEditing ? (
            <div className="mb-6">
              <textarea
                autoFocus
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                rows={6}
                className="w-full rounded-xl px-4 py-3 text-sm leading-relaxed outline-none border resize-none"
                style={{
                  backgroundColor: '#2C2C3E',
                  color: '#fff',
                  borderColor: 'rgba(180,240,74,0.35)',
                }}
              />
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => { setEditDesc(savedDesc); setIsEditing(false) }}
                  className="flex-1 py-3 rounded-xl text-sm font-medium"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}
                >
                  취소
                </button>
                <button
                  onClick={handleSaveDesc}
                  className="flex-1 py-3 rounded-xl text-sm font-bold"
                  style={{ backgroundColor: 'rgba(180,240,74,0.15)', color: '#B4F04A' }}
                >
                  저장
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-relaxed mb-6 whitespace-pre-line" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {savedDesc}
            </p>
          )}

          <div className="mb-5" style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.07)' }} />

          <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>참여자</p>
          <div className="space-y-4">
            {participants.map((p) => (
              <button
                key={p.name}
                onClick={() => navigate('/profile/view', { state: { participant: p } })}
                className="flex items-center gap-3 w-full text-left"
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
                  style={{
                    background: p.isHost
                      ? 'linear-gradient(135deg, rgba(180,240,74,0.25), rgba(157,92,244,0.25))'
                      : 'rgba(157,92,244,0.15)',
                    border: p.isHost ? '2px solid rgba(180,240,74,0.5)' : '2px solid rgba(157,92,244,0.3)',
                  }}
                >
                  <img src={getLevelImage(p.levelLabel)} alt={p.name} className="w-7 h-7 object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-white text-sm font-medium">{p.name}</span>
                    {p.isHost && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                        style={{ backgroundColor: '#B4F04A', color: '#1C1C2E' }}>
                        모임장
                      </span>
                    )}
                  </div>
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {p.age}세 / {p.gender} / LV.{p.level}
                  </span>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 바 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] px-5 pb-8 pt-3 space-y-2.5"
        style={{ backgroundColor: '#1C1C2E' }}>
        {isHost ? (
          deleted ? (
            <div className="w-full py-4 rounded-2xl text-sm font-bold text-center"
              style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.25)' }}>
              삭제된 번개
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate('/workout/together/cap-ready')}
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
              <div className="flex gap-3">
                <button
                  onClick={() => { setEditDesc(savedDesc); setIsEditing(true) }}
                  className="flex-1 py-4 rounded-2xl font-bold text-base"
                  style={{ backgroundColor: 'rgba(180,240,74,0.12)', color: '#B4F04A' }}
                >
                  수정
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="flex-1 py-4 rounded-2xl font-bold text-base"
                  style={{ backgroundColor: 'rgba(255,80,80,0.12)', color: '#FF5050' }}
                >
                  삭제
                </button>
              </div>
            </>
          )
        ) : (
          <>
            <button
              onClick={() => !applied && setShowApplyModal(true)}
              className="w-full py-4 rounded-2xl font-bold text-base transition-all"
              style={{
                backgroundColor: applied ? '#2C2C3E' : '#2563EB',
                color: applied ? 'rgba(255,255,255,0.35)' : 'white',
              }}
            >
              {applied ? '참여 신청 완료' : '참여 신청'}
            </button>
          </>
        )}
      </div>

      {/* 참여 신청 확인 모달 */}
      {showApplyModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.65)' }}
          onClick={() => setShowApplyModal(false)}
        >
          <div className="mx-6 rounded-3xl p-6 w-full" style={{ backgroundColor: '#2C2C3E', maxWidth: 320 }}
            onClick={(e) => e.stopPropagation()}>
            <p className="text-white text-center text-sm font-medium leading-relaxed mb-6">
              '{meetup.title}'<br />번개 모임에 참여 요청이 되었습니다.
            </p>
            <button
              onClick={() => { setApplied(true); setShowApplyModal(false) }}
              className="w-full py-3 rounded-2xl font-bold text-sm text-white"
              style={{ backgroundColor: '#2563EB' }}
            >
              확인
            </button>
          </div>
        </div>
      )}

      {/* 번개 삭제 확인 모달 */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
          style={{ backgroundColor: 'rgba(0,0,0,0.65)' }}
          onClick={() => setShowDeleteModal(false)}
        >
          <div className="w-full rounded-2xl p-5" style={{ backgroundColor: '#2C2C3E', maxWidth: 320 }}
            onClick={(e) => e.stopPropagation()}>
            <p className="text-white font-bold text-base mb-1">번개를 삭제할까요?</p>
            <p className="text-white/40 text-xs mb-4">삭제 후에는 복구할 수 없습니다.</p>

            {/* 경고 박스 */}
            <div className="rounded-xl p-3 mb-5 space-y-2.5"
              style={{ backgroundColor: 'rgba(255,80,80,0.06)', border: '1px solid rgba(255,80,80,0.2)' }}>
              <div className="flex items-start gap-2">
                <svg className="flex-shrink-0 mt-0.5" width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 20h20L12 2z" stroke="#FF5050" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="M12 9v4M12 16h.01" stroke="#FF5050" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <p className="text-xs font-bold" style={{ color: '#FF5050' }}>삭제 시 주의사항</p>
              </div>
              <ul className="text-xs space-y-1.5 pl-1" style={{ color: 'rgba(255,80,80,0.8)' }}>
                <li>· 승인된 참여자가 있는 경우 <span className="font-bold">모임 삭제 패널티</span>가 적용됩니다.</li>
                <li>· 패널티 적용 시 일정 기간 번개 생성이 제한될 수 있습니다.</li>
                <li>· 모든 참여자에게 <span className="font-bold">취소 알림</span>이 발송됩니다.</li>
              </ul>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 rounded-xl text-sm font-medium"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}
              >
                돌아가기
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-3 rounded-xl text-sm font-bold"
                style={{ backgroundColor: 'rgba(255,80,80,0.15)', color: '#FF5050' }}
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
