import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import runImg from '../../assets/run.png'

declare global {
  interface Window { kakao: any }
}

const MEETUP = {
  title: '퇴근 후 산책 하실 분',
  startTime: '20:00',
  endTime: '21:00',
  location: '안양천',
}

const MEMBERS = [
  { id: 1, name: '강아지', initial: '강', isMe: true,  isHost: true,  connected: true,  color: '#B4F04A', lat: 37.5595, lng: 126.9792 },
  { id: 2, name: '개나리', initial: '개', isMe: false, isHost: false, connected: true,  color: '#9D5CF4', lat: 37.5590, lng: 126.9798 },
  { id: 3, name: '문어',   initial: '문', isMe: false, isHost: false, connected: false, color: '#FF7043', lat: 37.5602, lng: 126.9784 },
  { id: 4, name: '하늘',   initial: '하', isMe: false, isHost: false, connected: false, color: '#29B6F6', lat: 37.5586, lng: 126.9803 },
]

function fmtTime(s: number) {
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

export default function WorkoutTogetherSessionPage() {
  const navigate = useNavigate()
  const [running, setRunning] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [showEndModal, setShowEndModal] = useState(false)
  const mapRef = useRef<any>(null)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [running])

  useEffect(() => {
    const key = import.meta.env.VITE_KAKAO_MAP_KEY
    const container = document.getElementById('together-map')
    if (!container || !key) return

    const initMap = () => {
      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(37.5592, 126.9793),
          level: 4,
        }
        const map = new window.kakao.maps.Map(container, options)
        mapRef.current = map

        MEMBERS.filter((m) => m.connected).forEach((m) => {
          const pos = new window.kakao.maps.LatLng(m.lat, m.lng)
          const content = `
            <div style="
              width:36px;height:36px;border-radius:50%;
              background:${m.color}22;
              border:2.5px solid ${m.color};
              display:flex;align-items:center;justify-content:center;
              font-weight:bold;font-size:14px;color:${m.color};
              box-shadow:0 0 12px ${m.color}60;
            ">${m.initial}</div>
          `
          const overlay = new window.kakao.maps.CustomOverlay({ map, position: pos, content, yAnchor: 1 })
          overlay.setMap(map)
        })
      })
    }

    if (window.kakao?.maps) {
      initMap()
    } else {
      const script = document.createElement('script')
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false`
      script.onload = initMap
      script.onerror = () => {
        const el = document.getElementById('together-map')
        if (el) el.innerHTML = `<div style="color:#ff6b6b;padding:16px;font-size:12px">지도 로드 실패<br/>키: ${key?.slice(0,8)}...</div>`
      }
      document.head.appendChild(script)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#1C1C2E' }}>
      {/* 헤더: 운동 종목 + 타이머 */}
      <div className="flex items-center justify-between px-5 pt-14 pb-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <img src={runImg} alt="sport" className="w-5 h-5 object-contain" />
          <p className="text-white font-bold text-sm">{MEETUP.title}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: running ? '#B4F04A' : '#FF7043', boxShadow: running ? '0 0 6px #B4F04A' : 'none' }} />
          <p className="font-mono font-bold text-white text-base">{fmtTime(seconds)}</p>
        </div>
      </div>

      {/* 지도 */}
      <div className="relative mx-5 mb-4 rounded-2xl overflow-hidden flex-shrink-0" style={{ height: 260 }}>
        <div id="together-map" className="w-full h-full" />
        <div className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)' }} />
        {!running && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl"
            style={{ backgroundColor: 'rgba(28,28,46,0.55)', backdropFilter: 'blur(2px)' }}>
            <p className="text-white/60 text-sm font-medium">운동 시작 전</p>
          </div>
        )}
      </div>

      {/* 모임 기본 정보 */}
      <div className="mx-5 rounded-2xl px-4 py-3 mb-4 border border-white/8 flex-shrink-0" style={{ backgroundColor: '#2C2C3E' }}>
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-white text-xs font-bold mb-0.5">{MEETUP.title}</p>
            <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {MEETUP.startTime} ~ {MEETUP.endTime} · {MEETUP.location}
            </p>
          </div>
          <span className="text-[10px] font-bold px-2 py-1 rounded-full"
            style={{ backgroundColor: 'rgba(180,240,74,0.1)', color: '#B4F04A' }}>
            {MEMBERS.filter((m) => m.connected).length}/{MEMBERS.length}명
          </span>
        </div>

        {/* 멤버 아이콘 strip */}
        <div className="flex items-center gap-2">
          {MEMBERS.map((m) => (
            <div key={m.id} className="flex flex-col items-center gap-1">
              <div className="relative">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    backgroundColor: `${m.color}18`,
                    border: m.connected ? `1.5px solid ${m.color}` : '1.5px solid rgba(255,255,255,0.1)',
                    color: m.connected ? m.color : 'rgba(255,255,255,0.25)',
                    boxShadow: m.connected ? `0 0 8px ${m.color}45` : 'none',
                  }}
                >
                  {m.initial}
                </div>
                {m.connected && (
                  <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-fig"
                    style={{ backgroundColor: '#B4F04A' }} />
                )}
              </div>
              <p className="text-[9px]" style={{ color: 'rgba(255,255,255,0.3)' }}>{m.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1" />

      {/* 컨트롤 */}
      <div className="flex items-center justify-center gap-12 pb-12 flex-shrink-0">
        <button
          onClick={() => setRunning((r) => !r)}
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ border: '2px solid rgba(255,255,255,0.2)' }}
        >
          {running ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="6" y="4" width="4" height="16" rx="1" fill="white" />
              <rect x="14" y="4" width="4" height="16" rx="1" fill="white" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 3L19 12L5 21V3Z" fill="white" />
            </svg>
          )}
        </button>
        <button
          onClick={() => setShowEndModal(true)}
          className="flex items-center justify-center rounded-full shadow-lg"
          style={{ width: 72, height: 72, backgroundColor: '#B4F04A', boxShadow: '0 0 24px rgba(180,240,74,0.35)' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="5" y="5" width="14" height="14" rx="2" fill="#1C1C2E" />
          </svg>
        </button>
      </div>

      {/* 번개 종료 모달 */}
      {showEndModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
          style={{ backgroundColor: 'rgba(0,0,0,0.65)' }}
          onClick={() => setShowEndModal(false)}
        >
          <div className="w-full rounded-2xl p-5" style={{ backgroundColor: '#2C2C3E', maxWidth: 320 }}
            onClick={(e) => e.stopPropagation()}>
            <p className="text-white font-bold text-base mb-1">번개 운동을 종료할까요?</p>
            <p className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
              모든 모임원에게 운동 종료 알림이 발송됩니다.
            </p>
            <div className="rounded-xl px-3 py-2.5 mb-5"
              style={{ backgroundColor: 'rgba(180,240,74,0.06)', border: '1px solid rgba(180,240,74,0.15)' }}>
              <p className="text-xs font-medium" style={{ color: '#B4F04A' }}>
                운동 시간: {fmtTime(seconds)}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowEndModal(false)}
                className="flex-1 py-3 rounded-xl text-sm font-medium"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}
              >계속하기</button>
              <button
                onClick={() => navigate('/meetup/finish')}
                className="flex-1 py-3 rounded-xl text-sm font-bold"
                style={{ backgroundColor: 'rgba(180,240,74,0.15)', color: '#B4F04A' }}
              >종료하기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
