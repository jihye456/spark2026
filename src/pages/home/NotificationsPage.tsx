import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Tab = 'all' | 'unread'

const notifications = [
  {
    id: 1,
    type: 'meetup_invite',
    icon: '⚽',
    title: '번개 모임 초대',
    body: '김민수님이 당신을 센트럴 파크 축구 모임에 초대했습니다.',
    time: '방금 전',
    unread: true,
    actions: ['참가하기', '거절'],
    priority: true,
  },
  {
    id: 2,
    type: 'challenge',
    icon: '🏆',
    title: '챌린지 달성',
    body: '50km 스프린트 챌린지의 80%를 달성하셨습니다! 조금만 더 힘내세요!',
    time: '2시간 전',
    unread: false,
    progress: 80,
    priority: true,
  },
  {
    id: 3,
    type: 'meetup',
    icon: '⚡',
    title: '번개 모임 알림',
    body: '한강 러닝 모임이 1시간 후 시작됩니다.',
    time: '10분 전',
    unread: true,
  },
  {
    id: 4,
    type: 'challenge',
    icon: '🏅',
    title: '챌린지 알림',
    body: "'30일 러닝 챌린지'에 새로운 참가자가 합류했습니다.",
    time: '1시간 전',
    unread: true,
  },
  {
    id: 5,
    type: 'message',
    icon: '💬',
    title: '메시지',
    body: '김운동님이 회원님에게 메시지를 보냈습니다.',
    time: '2시간 전',
    unread: true,
  },
  {
    id: 6,
    type: 'workout',
    icon: '⚙️',
    title: '운동 알림',
    body: '오늘 운동 기록을 아직 등록하지 않으셨어요!',
    time: '5시간 전',
    unread: false,
  },
  {
    id: 7,
    type: 'system',
    icon: '⚙️',
    title: '시스템 알림',
    body: '새로운 업데이트가 있습니다. 앱을 업데이트해주세요.',
    time: '1일 전',
    unread: false,
  },
]

export default function NotificationsPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('all')
  const [dismissed, setDismissed] = useState<number[]>([])
  const [allRead, setAllRead] = useState(false)

  const allCount = allRead ? 0 : notifications.filter((n) => !dismissed.includes(n.id)).length
  const unreadCount = allRead ? 0 : notifications.filter((n) => n.unread && !dismissed.includes(n.id)).length

  const visible = allRead ? [] : notifications.filter((n) => {
    if (dismissed.includes(n.id)) return false
    if (tab === 'unread') return n.unread
    return true
  })

  const priorityItems = visible.filter((n) => n.priority)
  const listItems = visible.filter((n) => !n.priority)

  const dismiss = (id: number) => setDismissed((prev) => [...prev, id])

  return (
    <div className="min-h-screen bg-fig flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4 flex-shrink-0">
        <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <p className="text-base font-bold text-white">알림</p>
        <button onClick={() => setAllRead(true)} className="text-xs" style={{ color: '#B4F04A' }}>모두 읽음</button>
      </div>

      {/* 탭 */}
      <div className="flex px-5 gap-5 border-b border-white/8 flex-shrink-0">
        <button
          onClick={() => setTab('all')}
          className="pb-3 text-sm font-medium relative"
          style={{ color: tab === 'all' ? '#ffffff' : 'rgba(255,255,255,0.35)' }}
        >
          전체 ({allCount})
          {tab === 'all' && <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ backgroundColor: '#B4F04A' }} />}
        </button>
        <button
          onClick={() => setTab('unread')}
          className="pb-3 text-sm font-medium relative"
          style={{ color: tab === 'unread' ? '#ffffff' : 'rgba(255,255,255,0.35)' }}
        >
          읽지 않음 ({unreadCount})
          {tab === 'unread' && <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ backgroundColor: '#B4F04A' }} />}
        </button>
      </div>

      {/* 내용 */}
      <div className="flex-1 overflow-y-auto pb-10 scrollbar-none">

        {/* 주요 알람 */}
        {priorityItems.length > 0 && (
          <div className="px-5 pt-4">
            <p className="text-xs font-bold text-white/40 mb-3">주요 알람</p>
            <div className="space-y-3">
              {priorityItems.map((n) => (
                <div key={n.id} className="bg-card rounded-2xl p-4 border border-white/8">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white/8 flex items-center justify-center text-xl flex-shrink-0">
                      {n.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="text-white text-sm font-bold">{n.title}</p>
                        <p className="text-white/30 text-[10px]">{n.time}</p>
                      </div>
                      <p className="text-white/60 text-xs leading-relaxed">{n.body}</p>
                    </div>
                  </div>

                  {/* 진행 바 (챌린지용) */}
                  {typeof n.progress === 'number' && (
                    <div className="mb-3">
                      <div className="h-1.5 rounded-full bg-white/10">
                        <div
                          className="h-1.5 rounded-full"
                          style={{ width: `${n.progress}%`, backgroundColor: '#B4F04A' }}
                        />
                      </div>
                    </div>
                  )}

                  {/* 액션 버튼 (초대용) */}
                  {n.actions && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => dismiss(n.id)}
                        className="flex-1 py-2.5 rounded-xl text-xs font-bold"
                        style={{ backgroundColor: '#B4F04A', color: '#1C1C2E' }}
                      >
                        {n.actions[0]}
                      </button>
                      <button
                        onClick={() => dismiss(n.id)}
                        className="flex-1 py-2.5 rounded-xl text-xs font-medium"
                        style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}
                      >
                        {n.actions[1]}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 알림 목록 */}
        {listItems.length > 0 && (
          <div className="px-5 pt-4">
            <p className="text-xs font-bold text-white/40 mb-3">알림 목록</p>
            <div className="space-y-0 divide-y divide-white/5">
              {listItems.map((n) => (
                <div key={n.id} className="flex items-start gap-3 py-4 relative">
                  {/* 읽지 않음 표시 */}
                  {n.unread && (
                    <span className="absolute top-4 right-0 w-2 h-2 rounded-full" style={{ backgroundColor: '#B4F04A' }} />
                  )}
                  <div className="w-9 h-9 rounded-xl bg-white/8 flex items-center justify-center text-lg flex-shrink-0">
                    {n.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{n.body}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-white/30 text-[10px]">{n.time}</p>
                      <button
                        onClick={() => dismiss(n.id)}
                        className="text-[10px]"
                        style={{ color: 'rgba(255,80,80,0.6)' }}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {visible.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-white/20">
            <p className="text-3xl mb-3">🔔</p>
            <p className="text-sm">알림이 없습니다</p>
          </div>
        )}

        {/* 보관 안내 */}
        <p className="text-center text-white/20 text-xs mt-6 pb-4">알림은 30일 동안 보관됩니다</p>
      </div>
    </div>
  )
}
