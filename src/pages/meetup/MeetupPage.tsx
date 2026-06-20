import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

declare global {
  interface Window { kakao: any }
}

// 가산디지털단지역 기준 현위치
const CURRENT_LOCATION = { lat: 37.4813, lng: 126.8827 }

const MAP_PINS = [
  { id: 1, lat: 37.4814, lng: 126.8830 }, // 마루공원
  { id: 2, lat: 37.4900, lng: 126.8831 }, // 독산근린공원
  { id: 3, lat: 37.4749, lng: 126.8861 }, // 안양천 산책로
  { id: 4, lat: 37.4851, lng: 126.9012 }, // 구로디지털단지역
  { id: 5, lat: 37.4758, lng: 126.8726 }, // 철산역
  { id: 6, lat: 37.4737, lng: 126.8884 }, // 광명사거리
  { id: 7, lat: 37.4822, lng: 126.8803 }, // G타워 앞 (가산역 인근)
  { id: 8, lat: 37.4797, lng: 126.8853 }, // 가산역 2번출구
  { id: 9, lat: 37.4833, lng: 126.8857 }, // IT타워 광장
]

const PIN_INFO: Record<number, { title: string; location: string; time: string; tag: string }> = {
  1: { title: '가디단 야간 산책', location: '마루공원', time: '20:00', tag: '전체 레벨 가능' },
  2: { title: '독산공원 아침 조깅', location: '독산근린공원', time: '07:00', tag: 'LV. 20 이하' },
  3: { title: '안양천 걷기 모임', location: '안양천 산책로', time: '19:00', tag: '전체 레벨 가능' },
  4: { title: '구디단 런닝 크루', location: '구로디지털단지역', time: '21:00', tag: 'LV. 30 이상' },
  5: { title: '야간 자전거 라이딩', location: '철산역', time: '20:30', tag: '전체 레벨 가능' },
  6: { title: '저녁 산책 한바퀴', location: '광명사거리', time: '19:30', tag: '여자만' },
  7: { title: '점심 런닝 크루', location: 'G타워 앞', time: '12:00', tag: '전체 레벨 가능' },
  8: { title: '퇴근길 산책', location: '가산역 2번출구', time: '19:00', tag: '전체 성별 가능' },
  9: { title: '아침 스트레칭', location: 'IT타워 광장', time: '08:00', tag: '전체 레벨 가능' },
}

const meetups = [
  { id: 1, title: '가디단 야간 산책', location: '마루공원', startTime: '20:00', endTime: '21:00', current: 2, max: 4, tags: ['전체 레벨 가능', '전체 성별 가능', '22~35세'], desc: '가산디지털단지역 마루공원에서 저녁 산책해요. 가볍게 걸으면서 이야기 나눠요.' },
  { id: 2, title: '독산공원 아침 조깅', location: '독산근린공원', startTime: '07:00', endTime: '08:00', current: 3, max: 5, tags: ['LV. 20 이하', '전체 성별 가능', '20~40세'], desc: '새벽 공기 마시며 가볍게 조깅해요. 초보 환영합니다!' },
  { id: 3, title: '안양천 걷기 모임', location: '안양천 산책로', startTime: '19:00', endTime: '20:30', current: 4, max: 8, tags: ['전체 레벨 가능', '전체 성별 가능', '25~45세'], desc: '안양천변을 따라 저녁에 걸어요. 자유롭게 대화하며 걸을 예정입니다.' },
  { id: 4, title: '구디단 런닝 크루', location: '구로디지털단지역', startTime: '21:00', endTime: '22:00', current: 2, max: 6, tags: ['LV. 30 이상', '남자', '20~35세'], desc: '구로디지털단지 주변 런닝 크루입니다. 어느 정도 달릴 수 있는 분만 오세요.' },
  { id: 5, title: '야간 자전거 라이딩', location: '철산역', startTime: '20:30', endTime: '22:00', current: 1, max: 4, tags: ['전체 레벨 가능', '전체 성별 가능', '20~40세'], desc: '안양천 자전거 도로 따라 가볍게 라이딩해요. 헬멧 필수입니다!' },
  { id: 6, title: '저녁 산책 한바퀴', location: '광명사거리', startTime: '19:30', endTime: '20:30', current: 3, max: 6, tags: ['전체 레벨 가능', '여자', '25~40세'], desc: '비슷한 나이대 여성분들과 저녁에 가볍게 산책해요.' },
  { id: 7, title: '점심 런닝 크루', location: 'G타워 앞', startTime: '12:00', endTime: '12:30', current: 2, max: 5, tags: ['전체 레벨 가능', '전체 성별 가능', '20~45세'], desc: '점심시간에 가디단 주변을 가볍게 달려요. 30분 코스로 부담 없어요!' },
  { id: 8, title: '퇴근길 산책', location: '가산역 2번출구', startTime: '19:00', endTime: '20:00', current: 3, max: 6, tags: ['전체 레벨 가능', '전체 성별 가능', '22~40세'], desc: '퇴근하고 가볍게 같이 걸어요. 대화하면서 스트레스 해소해요.' },
  { id: 9, title: '아침 스트레칭', location: 'IT타워 광장', startTime: '08:00', endTime: '08:30', current: 1, max: 6, tags: ['전체 레벨 가능', '전체 성별 가능', '20~50세'], desc: '출근 전 간단한 스트레칭으로 하루를 시작해요. 아무나 참여 가능!' },
]

const CATEGORIES = ['전체', '런닝', '걷기', '사이클']
const KO_DAYS = ['월', '화', '수', '목', '금', '토', '일']
const quickFilters = ['전체', '나이', '레벨', '성별']


function daysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate() }
function firstDayOf(y: number, m: number) { return new Date(y, m, 1).getDay() }
function getWeekDates(): Date[] {
  const today = new Date()
  const dow = today.getDay()
  const mon = new Date(today)
  mon.setDate(today.getDate() - (dow === 0 ? 6 : dow - 1))
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(mon)
    d.setDate(mon.getDate() + i)
    return d
  })
}

export default function MeetupPage() {
  const navigate = useNavigate()

  // ── Kakao Map refs ──
  const mapRef = useRef<any>(null)
  const currentLatLngRef = useRef<any>(null)
  const pinElemsRef = useRef<Map<number, HTMLElement>>(new Map())

  // ── Map / list state ──
  const [quickFilter, setQuickFilter] = useState('전체')
  const [selectedPin, setSelectedPin] = useState<number | null>(null)
  const [listExpanded, setListExpanded] = useState(false)
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false)

  // ── Swipe gesture ──
  const touchStartY = useRef<number>(0)
  const listScrollRef = useRef<HTMLDivElement>(null)
  const handleTouchStart = (e: React.TouchEvent) => { touchStartY.current = e.touches[0].clientY }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dy = touchStartY.current - e.changedTouches[0].clientY
    if (!listExpanded && dy > 50) setListExpanded(true)
    else if (listExpanded && dy < -50 && (listScrollRef.current?.scrollTop ?? 0) <= 0) setListExpanded(false)
  }

  // ── Filter modal ──
  const [showFilter, setShowFilter] = useState(false)
  const [distance, setDistance] = useState(2.5)
  const [filterCategory, setFilterCategory] = useState('전체')
  const [isCustomCat, setIsCustomCat] = useState(false)
  const [customCat, setCustomCat] = useState('')
  const [customCategories, setCustomCategories] = useState<string[]>([])
  const [filterTime, setFilterTime] = useState<string | null>(null)
  const [confirmedTime, setConfirmedTime] = useState<string | null>(null)
  const [confirmedWeek, setConfirmedWeek] = useState<string | null>(null)
  const [confirmedDate, setConfirmedDate] = useState<string | null>(null)

  // ── Pickers ──
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [pickedHour, setPickedHour] = useState(9)
  const [pickedMinute, setPickedMinute] = useState(0)
  const [showWeekPicker, setShowWeekPicker] = useState(false)
  const [weekStart, setWeekStart] = useState<number | null>(null)
  const [weekEnd, setWeekEnd] = useState<number | null>(null)
  const weekDates = getWeekDates()
  const [showCalPicker, setShowCalPicker] = useState(false)
  const [calMonth, setCalMonth] = useState(new Date())
  const [selectedCalDate, setSelectedCalDate] = useState<Date | null>(null)

  // ── 카카오 지도 초기화 ──
  useEffect(() => {
    const appKey = import.meta.env.VITE_KAKAO_MAP_APP_KEY as string

    const initMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('kakao-map')
        if (!container || mapRef.current) return

        const center = new window.kakao.maps.LatLng(CURRENT_LOCATION.lat, CURRENT_LOCATION.lng)
        currentLatLngRef.current = center

        const map = new window.kakao.maps.Map(container, { center, level: 4 })
        mapRef.current = map

        // 지도 빈 곳 클릭 → 팝업 닫기
        window.kakao.maps.event.addListener(map, 'click', () => setSelectedPin(null))

        // ── 현위치 원형 마커 ──
        const dotEl = document.createElement('div')
        dotEl.style.cssText = [
          'width:20px', 'height:20px',
          'background:#B4F04A',
          'border:3px solid white',
          'border-radius:50%',
          'box-shadow:0 0 0 8px rgba(180,240,74,0.2)',
          'pointer-events:none',
        ].join(';')
        new window.kakao.maps.CustomOverlay({
          map,
          position: center,
          content: dotEl,
          xAnchor: 0.5,
          yAnchor: 0.5,
          zIndex: 10,
        })

        // ── 번개 핀 (CustomOverlay + DOM — touchstart 전파 차단으로 지도 패닝 우선순위 역전) ──
        MAP_PINS.forEach((pin) => {
          const latLng = new window.kakao.maps.LatLng(pin.lat, pin.lng)

          const el = document.createElement('div')
          el.style.cssText = 'cursor:pointer;'
          el.innerHTML =
            '<svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M16 0C7.163 0 0 7.163 0 16c0 10 16 24 16 24S32 26 32 16C32 7.163 24.837 0 16 0z" fill="#9D5CF4"/>' +
            '<circle cx="16" cy="16" r="6" fill="white"/>' +
            '</svg>'

          // touchstart 전파 차단 → 지도가 패닝 제스처를 시작하지 못하게 함
          el.addEventListener('touchstart', (e) => e.stopPropagation(), { passive: false })
          el.addEventListener('touchend', (e) => e.stopPropagation())
          // click 전파 차단 → 지도 click 이벤트가 selectedPin을 null로 덮지 못하게 함
          el.addEventListener('click', (e) => {
            e.stopPropagation()
            setSelectedPin((prev) => (prev === pin.id ? null : pin.id))
            setListExpanded(false)
          })

          pinElemsRef.current.set(pin.id, el)

          new window.kakao.maps.CustomOverlay({
            map,
            position: latLng,
            content: el,
            xAnchor: 0.5,
            yAnchor: 1,
            zIndex: 4,
          })
        })
      })
    }

    if (window.kakao?.maps) {
      initMap()
    } else {
      const script = document.createElement('script')
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`
      script.addEventListener('load', initMap)
      script.addEventListener('error', () => {
        const el = document.getElementById('kakao-map')
        if (el) el.innerHTML = `<div style="color:#ff6b6b;padding:16px;font-size:12px">지도 로드 실패<br/>키: ${appKey?.slice(0,8)}...</div>`
      })
      document.head.appendChild(script)
    }
  }, [])

  // 선택 핀 색상 업데이트 (SVG 속성 직접 변경)
  useEffect(() => {
    pinElemsRef.current.forEach((el, id) => {
      const path = el.querySelector('path')
      const circle = el.querySelector('circle')
      if (path) path.setAttribute('fill', id === selectedPin ? '#B4F04A' : '#9D5CF4')
      if (circle) circle.setAttribute('fill', id === selectedPin ? '#1C1C2E' : 'white')
    })
  }, [selectedPin])

  const handleMoveToCurrentLocation = () => {
    if (mapRef.current && currentLatLngRef.current) {
      mapRef.current.setCenter(currentLatLngRef.current)
      mapRef.current.setLevel(4)
    }
  }

  // ── Filter helpers ──
  const resetTimeSelections = (except?: string) => {
    if (except !== '오늘') { setConfirmedTime(null); setPickedHour(9); setPickedMinute(0) }
    if (except !== '이번 주') { setConfirmedWeek(null); setWeekStart(null); setWeekEnd(null) }
    if (except !== '날짜 설정') { setConfirmedDate(null); setSelectedCalDate(null) }
  }
  const closeOtherTimePickers = (except: string) => {
    if (except !== '오늘') setShowTimePicker(false)
    if (except !== '이번 주') setShowWeekPicker(false)
    if (except !== '날짜 설정') setShowCalPicker(false)
  }
  const selectCategory = (c: string) => { setFilterCategory(c); setIsCustomCat(false); setCustomCat('') }
  const handleCustomCategoryChange = (v: string) => { setCustomCat(v); setIsCustomCat(true) }
  const confirmCustomCategory = () => {
    const v = customCat.trim()
    if (!v) return
    setCustomCategories((cs) => cs.includes(v) ? cs : [...cs, v])
    setFilterCategory(v); setIsCustomCat(false); setCustomCat('')
  }
  const resetFilters = () => {
    setDistance(2.5); setFilterCategory('전체'); setIsCustomCat(false); setCustomCat(''); setCustomCategories([])
    setFilterTime(null); setConfirmedTime(null); setConfirmedWeek(null); setConfirmedDate(null)
    setPickedHour(9); setPickedMinute(0); setWeekStart(null); setWeekEnd(null); setSelectedCalDate(null)
  }
  const handleTimeClick = (key: string, openPicker: () => void) => {
    if (filterTime === key) { setFilterTime(null); resetTimeSelections() }
    else { setFilterTime(key); resetTimeSelections(key); closeOtherTimePickers(key); openPicker() }
  }
  const handleWeekDayClick = (i: number) => {
    if (weekStart === null) { setWeekStart(i); setWeekEnd(null) }
    else if (weekEnd === null) { if (i >= weekStart) setWeekEnd(i); else { setWeekStart(i); setWeekEnd(null) } }
    else { setWeekStart(i); setWeekEnd(null) }
  }
  const isWeekInRange = (i: number) => {
    if (weekStart === null) return false
    if (weekEnd === null) return i === weekStart
    return i >= weekStart && i <= weekEnd
  }
  const confirmWeek = () => {
    if (weekStart === null) return
    const label = weekEnd !== null && weekEnd !== weekStart ? `${KO_DAYS[weekStart]} ~ ${KO_DAYS[weekEnd]}` : KO_DAYS[weekStart]
    setFilterTime('이번 주'); resetTimeSelections('이번 주'); setConfirmedWeek(label); setShowWeekPicker(false)
  }
  const confirmTime = () => {
    setFilterTime('오늘'); resetTimeSelections('오늘')
    setConfirmedTime(`${String(pickedHour).padStart(2, '0')}:${String(pickedMinute).padStart(2, '0')}`)
    setShowTimePicker(false)
  }
  const confirmDate = () => {
    if (!selectedCalDate) return
    const y = selectedCalDate.getFullYear()
    const m = String(selectedCalDate.getMonth() + 1).padStart(2, '0')
    const d = String(selectedCalDate.getDate()).padStart(2, '0')
    setFilterTime('날짜 설정'); resetTimeSelections('날짜 설정'); setConfirmedDate(`${y}.${m}.${d}`); setShowCalPicker(false)
  }
  const getTimeLabel = (key: string) => {
    if (key === '오늘' && confirmedTime) return `오늘 · ${confirmedTime}`
    if (key === '이번 주' && confirmedWeek) return `이번 주 · ${confirmedWeek}`
    if (key === '날짜 설정' && confirmedDate) return confirmedDate
    return key
  }

  const calYear = calMonth.getFullYear()
  const calMon = calMonth.getMonth()
  const totalDays = daysInMonth(calYear, calMon)
  const startDay = firstDayOf(calYear, calMon)

  return (
    <div
      className="relative overflow-hidden"
      style={{ height: 'calc(100vh - 80px)', backgroundColor: '#1a1a2e' }}
      onClick={() => { setSelectedPin(null); setShowHamburgerMenu(false) }}
    >
      {/* ── 카카오 지도 ── */}
      <div id="kakao-map" style={{ position: 'absolute', inset: 0 }} />

      {/* ── 핀 팝업 카드 (리스트 접힌 상태 + 핀 선택 시) ── */}
      {selectedPin && !listExpanded && (() => {
        const info = PIN_INFO[selectedPin]
        return (
          <div
            className="absolute left-4 right-4 rounded-2xl p-3 shadow-2xl border border-white/10"
            style={{ bottom: 152, backgroundColor: '#1C1C2E', zIndex: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-white text-xs font-bold mb-1">{info.title}</p>
            <div className="flex items-center gap-1 mb-2">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="rgba(255,255,255,0.4)" />
              </svg>
              <p className="text-white/40 text-[10px]">{info.location}</p>
              <p className="text-white/30 text-[10px]">· {info.time}</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(180,240,74,0.15)', color: '#B4F04A' }}>
                {info.tag}
              </span>
              <button
                onClick={() => {
                  const m = meetups.find((x) => x.id === selectedPin)
                  navigate('/meetup/detail', { state: { meetup: m } })
                }}
                className="text-[10px] font-bold underline"
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                자세히
              </button>
            </div>
          </div>
        )
      })()}

      {/* ── 내 위치 버튼 (왼쪽, 햄버거와 같은 높이) ── */}
      <button
        onClick={(e) => { e.stopPropagation(); handleMoveToCurrentLocation() }}
        className="absolute w-12 h-12 rounded-full flex items-center justify-center"
        style={{
          left: 16,
          bottom: listExpanded ? 'calc(62% + 8px)' : '88px',
          backgroundColor: 'white',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
          transition: 'bottom 0.35s ease',
          zIndex: 30,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3" fill="#1C1C2E" />
          <circle cx="12" cy="12" r="7" stroke="#1C1C2E" strokeWidth="1.8" fill="none" />
          <line x1="12" y1="2" x2="12" y2="5" stroke="#1C1C2E" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="19" x2="12" y2="22" stroke="#1C1C2E" strokeWidth="2" strokeLinecap="round" />
          <line x1="2" y1="12" x2="5" y2="12" stroke="#1C1C2E" strokeWidth="2" strokeLinecap="round" />
          <line x1="19" y1="12" x2="22" y2="12" stroke="#1C1C2E" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {/* ── 상단 검색 + 퀵필터 ── */}
      <div className="absolute top-0 left-0 right-0 pt-14 px-4" style={{ zIndex: 10 }}>
        <div className="flex gap-2 mb-3">
          <div className="flex-1 flex items-center gap-2 rounded-2xl px-3 py-2.5 shadow-lg" style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="#999" strokeWidth="2" />
              <path d="M21 21L16.65 16.65" stroke="#999" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input type="text" placeholder="내 주변 번개 검색..." className="flex-1 text-sm outline-none bg-transparent" style={{ color: '#555', backgroundColor: 'transparent' }} />
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); setShowFilter(true) }}
            className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
            style={{ backgroundColor: '#1C1C2E', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <line x1="4" y1="6" x2="20" y2="6" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="4" y1="12" x2="20" y2="12" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="4" y1="18" x2="20" y2="18" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="8" cy="6" r="2" fill="#1C1C2E" stroke="white" strokeWidth="1.5" />
              <circle cx="16" cy="12" r="2" fill="#1C1C2E" stroke="white" strokeWidth="1.5" />
              <circle cx="9" cy="18" r="2" fill="#1C1C2E" stroke="white" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-2">
          {quickFilters.map((f) => (
            <button key={f}
              onClick={(e) => { e.stopPropagation(); setQuickFilter(f) }}
              className="px-3 py-1.5 rounded-full text-xs font-medium shadow-sm flex-shrink-0"
              style={{ backgroundColor: quickFilter === f ? '#1C1C2E' : 'rgba(255,255,255,0.92)', color: quickFilter === f ? '#fff' : '#333', border: quickFilter === f ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent' }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ── 햄버거 + 메뉴 ── */}
      <div
        className="absolute right-4 flex flex-col items-end gap-2"
        style={{ bottom: listExpanded ? 'calc(62% + 8px)' : '88px', transition: 'bottom 0.35s ease', zIndex: 30 }}
      >
        {showHamburgerMenu && (
          <div className="flex flex-col gap-2 mb-1 items-end">
            <button
              onClick={() => { setShowHamburgerMenu(false); navigate('/meetup/create') }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl shadow-xl"
              style={{ backgroundColor: '#1C1C2E', border: '1px solid rgba(255,255,255,0.15)', whiteSpace: 'nowrap' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="text-white text-xs font-bold">모임 만들기</span>
            </button>
            <button
              onClick={() => { setShowHamburgerMenu(false); navigate('/meetup/my') }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl shadow-xl"
              style={{ backgroundColor: '#1C1C2E', border: '1px solid rgba(255,255,255,0.15)', whiteSpace: 'nowrap' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="1.8" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <span className="text-white text-xs font-bold">내 모임 확인</span>
            </button>
          </div>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); setShowHamburgerMenu(!showHamburgerMenu) }}
          className="w-12 h-12 rounded-full shadow-xl flex items-center justify-center"
          style={{ backgroundColor: showHamburgerMenu ? '#B4F04A' : '#1C1C2E', border: '1px solid rgba(255,255,255,0.15)', transform: showHamburgerMenu ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <line x1="5" y1="8" x2="19" y2="8" stroke={showHamburgerMenu ? '#1C1C2E' : 'white'} strokeWidth="1.8" strokeLinecap="round" />
            <line x1="5" y1="12" x2="19" y2="12" stroke={showHamburgerMenu ? '#1C1C2E' : 'white'} strokeWidth="1.8" strokeLinecap="round" />
            <line x1="5" y1="16" x2="19" y2="16" stroke={showHamburgerMenu ? '#1C1C2E' : 'white'} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* ── 바텀 시트 ── */}
      <div
        className="absolute left-0 right-0 rounded-t-3xl flex flex-col"
        style={{ bottom: 0, height: '68%', backgroundColor: '#1C1C2E', transition: 'transform 0.35s ease', transform: listExpanded ? 'translateY(0)' : 'translateY(calc(100% - 56px))', overflow: 'hidden', zIndex: 20 }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div onClick={() => setListExpanded(!listExpanded)} className="flex-shrink-0 flex flex-col items-center justify-center cursor-pointer py-3 gap-1.5 select-none">
          <div className="w-10 h-1 rounded-full bg-white/20" />
          <p className="text-xs text-white/50 font-medium">리스트 확인 {listExpanded ? '∨' : '∧'}</p>
        </div>
        <div ref={listScrollRef} className="flex-1 overflow-y-auto px-4 pb-4 space-y-3 scrollbar-none">
          {meetups.map((m) => (
            <div key={m.id} onClick={() => navigate('/meetup/detail', { state: { meetup: m } })}
              className="rounded-2xl p-4 cursor-pointer border border-white/5" style={{ backgroundColor: '#2C2C3E' }}>
              <div className="flex items-start justify-between mb-2">
                <p className="text-white text-sm font-bold">{m.title}</p>
                <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                  <p className="text-white font-bold text-sm">{m.startTime}</p>
                  <p className="text-white/40 text-xs">({m.current}/{m.max})</p>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-2">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="rgba(255,255,255,0.3)" />
                </svg>
                <p className="text-white/40 text-xs">{m.location}</p>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {m.tags.map((tag) => (
                  <span key={tag} className="text-[10px] px-2.5 py-0.5 rounded-full border border-white/15 text-white/50">{tag}</span>
                ))}
              </div>
              <p className="text-white/30 text-xs leading-relaxed line-clamp-2">{m.desc}</p>
            </div>
          ))}
          <div className="rounded-2xl p-4 flex items-center justify-between"
            style={{ background: 'linear-gradient(135deg, #2C2C3E 0%, #1a1a30 100%)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div>
              <p className="text-white font-bold text-sm mb-0.5">새로운 운동을 찾아</p>
              <p className="text-white/40 text-xs">연속 운동 달성하고 할인 혜택을 받으세요!</p>
            </div>
            <button className="px-3 py-2 rounded-xl text-xs font-bold flex-shrink-0 ml-3" style={{ backgroundColor: '#B4F04A', color: '#1C1C2E' }}>탐색하기</button>
          </div>
        </div>
      </div>

      {/* ══════════ 필터 모달 ══════════ */}
      {showFilter && (
        <div className="absolute inset-0 flex items-end" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 50 }}
          onClick={() => setShowFilter(false)}>
          <div className="w-full rounded-t-3xl flex flex-col" style={{ backgroundColor: '#fff', maxHeight: '85%' }}
            onClick={(e) => e.stopPropagation()}>
            <div className="flex-shrink-0 flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100">
              <p className="text-gray-900 text-lg font-bold">상세 필터</p>
              <button onClick={() => setShowFilter(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="#555" strokeWidth="2" strokeLinecap="round" /></svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-5 scrollbar-none">
              <div className="mb-7">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-900 text-sm font-bold">거리 설정</p>
                  <p className="text-gray-900 text-xl font-bold">{distance.toFixed(1)}km</p>
                </div>
                <input type="range" min="0" max="5" step="0.1" value={distance} onChange={(e) => setDistance(Number(e.target.value))}
                  className="w-full h-1 rounded-full outline-none appearance-none cursor-pointer"
                  style={{ background: `linear-gradient(to right, #1C1C2E ${distance / 5 * 100}%, #e5e7eb ${distance / 5 * 100}%)`, WebkitAppearance: 'none' }} />
                <div className="flex justify-between mt-2">
                  <p className="text-gray-400 text-[10px]">0km</p>
                  <p className="text-gray-400 text-[10px]">5km</p>
                </div>
              </div>
              <div className="mb-7">
                <p className="text-gray-900 text-sm font-bold mb-3">카테고리</p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((c) => (
                    <button key={c} onClick={() => selectCategory(c)} className="px-4 py-2 rounded-full text-sm font-medium border transition-all"
                      style={{ backgroundColor: filterCategory === c && !isCustomCat ? '#1C1C2E' : 'transparent', color: filterCategory === c && !isCustomCat ? '#fff' : '#555', borderColor: filterCategory === c && !isCustomCat ? '#1C1C2E' : '#d1d5db' }}>{c}</button>
                  ))}
                  {customCategories.map((c) => (
                    <button key={c} onClick={() => selectCategory(c)} className="px-4 py-2 rounded-full text-sm font-medium border transition-all"
                      style={{ backgroundColor: filterCategory === c && !isCustomCat ? '#1C1C2E' : 'transparent', color: filterCategory === c && !isCustomCat ? '#fff' : '#555', borderColor: filterCategory === c && !isCustomCat ? '#1C1C2E' : '#d1d5db' }}>{c}</button>
                  ))}
                  <button onClick={() => setIsCustomCat(true)} className="px-4 py-2 rounded-full text-sm font-medium border transition-all"
                    style={{ backgroundColor: isCustomCat ? '#1C1C2E' : 'transparent', color: isCustomCat ? '#fff' : '#555', borderColor: isCustomCat ? '#1C1C2E' : '#d1d5db', borderStyle: isCustomCat ? 'solid' : 'dashed' }}>직접입력</button>
                </div>
                {isCustomCat && (
                  <div className="mt-3 flex gap-2">
                    <input autoFocus value={customCat} onChange={(e) => handleCustomCategoryChange(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') confirmCustomCategory() }}
                      placeholder="카테고리를 직접 입력해주세요"
                      className="min-w-0 flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-900"
                      style={{ color: '#333', backgroundColor: '#fff' }} />
                    <button onClick={confirmCustomCategory} disabled={!customCat.trim()}
                      className="shrink-0 px-4 py-2.5 rounded-xl text-sm font-bold disabled:opacity-40"
                      style={{ backgroundColor: '#1C1C2E', color: '#fff' }}>확인</button>
                  </div>
                )}
              </div>
              <div className="mb-2">
                <p className="text-gray-900 text-sm font-bold mb-3">시간</p>
                <div className="space-y-2">
                  {[
                    { key: '오늘', icon: <><circle cx="12" cy="12" r="9" stroke="#999" strokeWidth="1.5" /><path d="M12 7v5l3 3" stroke="#999" strokeWidth="1.5" strokeLinecap="round" /></>, open: () => setShowTimePicker(true) },
                    { key: '이번 주', icon: <><rect x="3" y="4" width="18" height="18" rx="2" stroke="#999" strokeWidth="1.5" /><line x1="3" y1="9" x2="21" y2="9" stroke="#999" strokeWidth="1.5" /></>, open: () => setShowWeekPicker(true) },
                    { key: '날짜 설정', icon: <><rect x="3" y="4" width="18" height="18" rx="2" stroke="#999" strokeWidth="1.5" /><line x1="3" y1="9" x2="21" y2="9" stroke="#999" strokeWidth="1.5" /><line x1="8" y1="2" x2="8" y2="6" stroke="#999" strokeWidth="1.5" strokeLinecap="round" /><line x1="16" y1="2" x2="16" y2="6" stroke="#999" strokeWidth="1.5" strokeLinecap="round" /></>, open: () => setShowCalPicker(true) },
                  ].map(({ key, icon, open }) => (
                    <button key={key} onClick={() => handleTimeClick(key, open)}
                      className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl border transition-all"
                      style={{ borderColor: filterTime === key ? '#1C1C2E' : '#e5e7eb', backgroundColor: filterTime === key ? 'rgba(28,28,46,0.05)' : 'transparent' }}>
                      <p className="text-gray-800 text-sm font-medium">{getTimeLabel(key)}</p>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">{icon}</svg>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 px-5 pt-3 pb-8 border-t border-gray-100">
              <div className="flex gap-3">
                <button onClick={resetFilters} className="flex-1 py-4 rounded-2xl text-sm font-bold" style={{ backgroundColor: '#f3f4f6', color: '#555' }}>초기화</button>
                <button onClick={() => setShowFilter(false)} className="py-4 rounded-2xl text-sm font-bold" style={{ backgroundColor: '#1C1C2E', color: '#fff', flex: 2 }}>필터 적용하기</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 시간 피커 ── */}
      {showTimePicker && (
        <div className="fixed inset-0 flex items-center justify-center px-8" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 60 }}>
          <div className="bg-white rounded-2xl p-6 w-full" style={{ maxWidth: 300 }}>
            <p className="text-gray-900 font-bold text-base mb-6 text-center">시간 선택</p>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="flex flex-col items-center">
                <button onClick={() => setPickedHour((h) => (h + 1) % 24)} className="w-10 h-10 flex items-center justify-center text-gray-400 text-xl font-bold">▲</button>
                <p className="text-5xl font-bold text-gray-900 w-20 text-center my-1">{String(pickedHour).padStart(2, '0')}</p>
                <button onClick={() => setPickedHour((h) => (h - 1 + 24) % 24)} className="w-10 h-10 flex items-center justify-center text-gray-400 text-xl font-bold">▼</button>
              </div>
              <p className="text-4xl font-bold text-gray-700 mb-1">:</p>
              <div className="flex flex-col items-center">
                <button onClick={() => setPickedMinute((m) => (m + 10) % 60)} className="w-10 h-10 flex items-center justify-center text-gray-400 text-xl font-bold">▲</button>
                <p className="text-5xl font-bold text-gray-900 w-20 text-center my-1">{String(pickedMinute).padStart(2, '0')}</p>
                <button onClick={() => setPickedMinute((m) => (m - 10 + 60) % 60)} className="w-10 h-10 flex items-center justify-center text-gray-400 text-xl font-bold">▼</button>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowTimePicker(false)} className="flex-1 py-3 rounded-xl text-sm font-medium" style={{ backgroundColor: '#f3f4f6', color: '#555' }}>취소</button>
              <button onClick={confirmTime} className="flex-1 py-3 rounded-xl text-sm font-bold" style={{ backgroundColor: '#1C1C2E', color: '#fff' }}>확인</button>
            </div>
          </div>
        </div>
      )}

      {/* ── 주 피커 ── */}
      {showWeekPicker && (
        <div className="fixed inset-0 flex items-center justify-center px-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 60 }}>
          <div className="bg-white rounded-2xl p-5 w-full" style={{ maxWidth: 340 }}>
            <p className="text-gray-900 font-bold text-base text-center mb-1">기간 설정</p>
            <p className="text-gray-400 text-xs text-center mb-5">원하는 기간을 선택하세요</p>
            <div className="flex gap-1 mb-3">
              {KO_DAYS.map((day, i) => (
                <button key={i} onClick={() => handleWeekDayClick(i)} className="flex-1 flex flex-col items-center py-2.5 rounded-xl"
                  style={{ backgroundColor: isWeekInRange(i) ? '#1C1C2E' : '#f3f4f6', color: isWeekInRange(i) ? '#fff' : '#555' }}>
                  <span className="text-[11px] font-bold">{day}</span>
                  <span className="text-[9px] mt-0.5 opacity-60">{weekDates[i].getDate()}</span>
                </button>
              ))}
            </div>
            <div className="h-5 flex items-center justify-center mb-4">
              {weekStart !== null && (
                <p className="text-gray-500 text-xs">
                  {weekEnd !== null && weekEnd !== weekStart
                    ? `${KO_DAYS[weekStart]} (${weekDates[weekStart].getDate()}일) ~ ${KO_DAYS[weekEnd]} (${weekDates[weekEnd].getDate()}일)`
                    : `${KO_DAYS[weekStart]} (${weekDates[weekStart].getDate()}일) ~`}
                </p>
              )}
            </div>
            <div className="flex gap-3">
              <button onClick={() => { setShowWeekPicker(false); setWeekStart(null); setWeekEnd(null) }} className="flex-1 py-3 rounded-xl text-sm font-medium" style={{ backgroundColor: '#f3f4f6', color: '#555' }}>취소</button>
              <button onClick={confirmWeek} disabled={weekStart === null} className="flex-1 py-3 rounded-xl text-sm font-bold"
                style={{ backgroundColor: weekStart !== null ? '#1C1C2E' : '#e5e7eb', color: weekStart !== null ? '#fff' : '#aaa' }}>확인</button>
            </div>
          </div>
        </div>
      )}

      {/* ── 날짜 피커 ── */}
      {showCalPicker && (
        <div className="fixed inset-0 flex items-center justify-center px-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 60 }}>
          <div className="bg-white rounded-2xl p-5 w-full" style={{ maxWidth: 340 }}>
            <p className="text-gray-900 font-bold text-base text-center mb-4">날짜 선택</p>
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setCalMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1))} className="w-8 h-8 flex items-center justify-center text-gray-400 rounded-lg text-sm">◀</button>
              <p className="text-gray-900 font-bold text-sm">{calYear}년 {calMon + 1}월</p>
              <button onClick={() => setCalMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1))} className="w-8 h-8 flex items-center justify-center text-gray-400 rounded-lg text-sm">▶</button>
            </div>
            <div className="grid grid-cols-7 mb-2">
              {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
                <div key={d} className="text-center text-[11px] text-gray-400 font-medium py-1">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-y-0.5">
              {Array.from({ length: startDay }, (_, i) => <div key={`e${i}`} />)}
              {Array.from({ length: totalDays }, (_, i) => {
                const day = i + 1
                const isSel = selectedCalDate?.getDate() === day && selectedCalDate?.getMonth() === calMon && selectedCalDate?.getFullYear() === calYear
                const isToday = new Date().getDate() === day && new Date().getMonth() === calMon && new Date().getFullYear() === calYear
                return (
                  <button key={day} onClick={() => setSelectedCalDate(new Date(calYear, calMon, day))}
                    className="h-9 w-full flex items-center justify-center rounded-full text-xs"
                    style={{ backgroundColor: isSel ? '#1C1C2E' : 'transparent', color: isSel ? '#fff' : isToday ? '#B4F04A' : '#333', fontWeight: isToday || isSel ? 'bold' : 'normal' }}>
                    {day}
                  </button>
                )
              })}
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => setShowCalPicker(false)} className="flex-1 py-3 rounded-xl text-sm font-medium" style={{ backgroundColor: '#f3f4f6', color: '#555' }}>취소</button>
              <button onClick={confirmDate} disabled={!selectedCalDate} className="flex-1 py-3 rounded-xl text-sm font-bold"
                style={{ backgroundColor: selectedCalDate ? '#1C1C2E' : '#e5e7eb', color: selectedCalDate ? '#fff' : '#aaa' }}>확인</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
