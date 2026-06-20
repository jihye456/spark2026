import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StepBar from '../../components/StepBar'

const TOTAL_STEPS = 4
const sportTypes = ['러닝', 'GYM', '자전거', '수영', '테니스', '축구', '배드민턴', '직접입력']
const genderOptions = ['남자', '여자', '성별 무관']
const visibilityOptions = ['공개', '비공개'] as const
const shareOptions = ['허용', '비허용'] as const

type VisibilityOption = typeof visibilityOptions[number]
type ShareOption = typeof shareOptions[number]

function daysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate() }
function firstDayOf(y: number, m: number) { return new Date(y, m, 1).getDay() }

function DualRangeSlider({
  min,
  max,
  minVal,
  maxVal,
  onMinChange,
  onMaxChange,
}: {
  min: number
  max: number
  minVal: number
  maxVal: number
  onMinChange: (v: number) => void
  onMaxChange: (v: number) => void
}) {
  const range = max - min
  const minPct = ((minVal - min) / range) * 100
  const maxPct = ((maxVal - min) / range) * 100
  const nearMax = minVal >= max - Math.max(1, Math.floor(range * 0.05))

  return (
    <div className="relative flex items-center" style={{ height: 28 }}>
      <div className="absolute w-full h-1 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
      <div
        className="absolute h-1 rounded-full"
        style={{ backgroundColor: '#B4F04A', left: `${minPct}%`, width: `${maxPct - minPct}%` }}
      />
      <input
        type="range"
        min={min}
        max={max}
        step="1"
        value={minVal}
        onChange={(e) => onMinChange(Math.min(Number(e.target.value), maxVal - 1))}
        className="dual-range"
        style={{ zIndex: nearMax ? 5 : 3 }}
      />
      <input
        type="range"
        min={min}
        max={max}
        step="1"
        value={maxVal}
        onChange={(e) => onMaxChange(Math.max(Number(e.target.value), minVal + 1))}
        className="dual-range"
        style={{ zIndex: 4 }}
      />
    </div>
  )
}

export default function MeetupCreatePage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)

  // Step 1
  const [title, setTitle] = useState('')
  const [sport, setSport] = useState('')
  const [customSport, setCustomSport] = useState<string | null>(null)
  const [customSportInput, setCustomSportInput] = useState('')
  const [showSportModal, setShowSportModal] = useState(false)

  // Step 2
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('20:00')
  const [endTime, setEndTime] = useState('21:00')
  const [showCalPicker, setShowCalPicker] = useState(false)
  const [calMonth, setCalMonth] = useState(new Date())
  const [selectedCalDate, setSelectedCalDate] = useState<Date | null>(null)
  const [dateError, setDateError] = useState('')
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [timeTarget, setTimeTarget] = useState<'start' | 'end'>('start')
  const [pickedHour, setPickedHour] = useState(20)
  const [pickedMinute, setPickedMinute] = useState(0)
  const [timeError, setTimeError] = useState('')
  const [location, setLocation] = useState('')

  // Step 3
  const [maxPeople, setMaxPeople] = useState(4)
  const [minLevel, setMinLevel] = useState(20)
  const [maxLevel, setMaxLevel] = useState(60)
  const [minAge, setMinAge] = useState(20)
  const [maxAge, setMaxAge] = useState(40)
  const [gender, setGender] = useState('')

  // Step 4
  const [visibility, setVisibility] = useState<VisibilityOption>('공개')
  const [shareAllowed, setShareAllowed] = useState<ShareOption>('허용')
  const [desc, setDesc] = useState('')

  // Review / success
  const [showReview, setShowReview] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const calYear = calMonth.getFullYear()
  const calMon = calMonth.getMonth()
  const totalDays = daysInMonth(calYear, calMon)
  const startDay = firstDayOf(calYear, calMon)

  const todayMidnight = new Date()
  todayMidnight.setHours(0, 0, 0, 0)

  const isStepValid =
    step === 1 ? Boolean(title.trim() && sport) :
    step === 2 ? Boolean(date && startTime && endTime && location.trim()) :
    step === 3 ? Boolean(maxPeople >= 2 && gender) :
    true

  const handleBack = () => {
    if (showReview) { setShowReview(false); return }
    if (step === 1) navigate(-1)
    else setStep((current) => current - 1)
  }

  const handleNext = () => {
    if (!isStepValid) return
    if (step === TOTAL_STEPS) setShowReview(true)
    else setStep((current) => current + 1)
  }

  const handleSportClick = (nextSport: string) => {
    if (nextSport === '직접입력') {
      setCustomSportInput(customSport ?? '')
      setShowSportModal(true)
      return
    }
    setSport(nextSport)
  }

  const handleCustomSportAdd = () => {
    const trimmed = customSportInput.trim()
    if (!trimmed) return
    setCustomSport(trimmed)
    setSport(trimmed)
    setCustomSportInput('')
    setShowSportModal(false)
  }

  const openTimePicker = (target: 'start' | 'end') => {
    const currentTime = target === 'start' ? startTime : endTime
    const [hour, minute] = currentTime.split(':').map(Number)
    setTimeTarget(target)
    setPickedHour(Number.isFinite(hour) ? hour : 20)
    setPickedMinute(Number.isFinite(minute) ? minute : 0)
    setTimeError('')
    setShowTimePicker(true)
  }

  const toMinutes = (t: string) => {
    const [h, m] = t.split(':').map(Number)
    return h * 60 + m
  }

  const confirmTime = () => {
    if (date) {
      const [y, m, d] = date.split('.').map(Number)
      const selectedDt = new Date(y, m - 1, d, pickedHour, pickedMinute)
      if (selectedDt <= new Date()) {
        setTimeError('현재 시간 이후로 선택해주세요')
        return
      }
    }
    const pickedMins = pickedHour * 60 + pickedMinute
    if (timeTarget === 'end' && pickedMins <= toMinutes(startTime)) {
      setTimeError('종료 시간은 시작 시간보다 늦어야 해요')
      return
    }
    if (timeTarget === 'start' && pickedMins >= toMinutes(endTime)) {
      setTimeError('시작 시간은 종료 시간보다 빨라야 해요')
      return
    }
    const nextTime = `${String(pickedHour).padStart(2, '0')}:${String(pickedMinute).padStart(2, '0')}`
    if (timeTarget === 'start') setStartTime(nextTime)
    else setEndTime(nextTime)
    setTimeError('')
    setShowTimePicker(false)
  }

  const handleCalDayClick = (day: number) => {
    const clicked = new Date(calYear, calMon, day)
    if (clicked < todayMidnight) {
      setDateError('오늘 이후 날짜만 선택할 수 있어요')
      return
    }
    setDateError('')
    setSelectedCalDate(clicked)
  }

  const confirmDate = () => {
    if (!selectedCalDate) return
    const y = selectedCalDate.getFullYear()
    const m = String(selectedCalDate.getMonth() + 1).padStart(2, '0')
    const d = String(selectedCalDate.getDate()).padStart(2, '0')
    setDate(`${y}.${m}.${d}`)
    setShowCalPicker(false)
  }

  const renderTagButton = (label: string, selected: boolean, onClick: () => void) => (
    <button
      key={label}
      onClick={onClick}
      className={`px-3 py-2 rounded-full text-xs font-medium transition-colors border ${
        selected ? 'bg-lime text-fig border-lime' : 'bg-transparent border-white/10 text-white/40'
      }`}
    >
      {label}
    </button>
  )

  const renderStep = () => {
    if (step === 1) {
      return (
        <div className="space-y-6">
          <div>
            <p className="text-white text-xl font-bold mb-1">모임 제목</p>
            <p className="text-white/40 text-sm mb-6">어떤 모임인지 한눈에 알 수 있게 작성해주세요</p>
            <label className="text-xs text-white/40 mb-1.5 block">모임 제목 <span className="text-lime">*</span></label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예) 퇴근 후 한강 러닝"
              className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-lime/50 transition-colors"
            />
          </div>
          <div>
            <label className="text-xs text-white/40 mb-2 block">운동 종류 <span className="text-lime">*</span></label>
            <div className="flex flex-wrap gap-2">
              {sportTypes.map((s) => renderTagButton(
                s === '직접입력' && customSport ? customSport : s,
                s === '직접입력' ? customSport !== null && sport === customSport : sport === s,
                () => handleSportClick(s),
              ))}
            </div>
          </div>
        </div>
      )
    }

    if (step === 2) {
      return (
        <div className="space-y-6">
          <div>
            <p className="text-white text-xl font-bold mb-1">날짜, 시간, 장소</p>
            <p className="text-white/40 text-sm mb-6">모임 날짜와 시간, 장소를 설정해주세요</p>
          </div>
          <div>
            <label className="text-xs text-white/40 mb-1.5 block">날짜 <span className="text-lime">*</span></label>
            <button
              onClick={() => setShowCalPicker(true)}
              className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-sm text-left outline-none transition-colors flex items-center justify-between"
            >
              <span className={date ? 'text-white' : 'text-white/20'}>{date || '날짜를 선택하세요'}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="#6B7280" strokeWidth="1.5" />
                <line x1="3" y1="9" x2="21" y2="9" stroke="#6B7280" strokeWidth="1.5" />
                <line x1="8" y1="2" x2="8" y2="6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="16" y1="2" x2="16" y2="6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div>
            <label className="text-xs text-white/40 mb-1.5 block">시간 <span className="text-lime">*</span></label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => openTimePicker('start')}
                className="flex-1 bg-card border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors flex items-center justify-between"
              >
                <span>{startTime}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="#6B7280" strokeWidth="1.5" />
                  <path d="M12 7v5l3 3" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              <span className="text-white/30 text-sm">-</span>
              <button
                onClick={() => openTimePicker('end')}
                className="flex-1 bg-card border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors flex items-center justify-between"
              >
                <span>{endTime}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="#6B7280" strokeWidth="1.5" />
                  <path d="M12 7v5l3 3" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
          <div>
            <label className="text-xs text-white/40 mb-1.5 block">장소 <span className="text-lime">*</span></label>
            <div className="relative">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="장소를 입력하세요"
                className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-lime/50 transition-colors pr-10"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="#6B7280" strokeWidth="2" />
                  <circle cx="12" cy="10" r="3" stroke="#6B7280" strokeWidth="2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )
    }

    if (step === 3) {
      return (
        <div className="space-y-7">
          <div>
            <p className="text-white text-xl font-bold mb-1">인원 및 참여 조건</p>
            <p className="text-white/40 text-sm mb-6">모집 인원과 참여 조건을 설정해주세요</p>
          </div>

          {/* 모집 인원 */}
          <div>
            <label className="text-xs text-white/40 mb-3 block">모집 인원</label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMaxPeople(Math.max(2, maxPeople - 1))}
                className="w-10 h-10 bg-card rounded-xl border border-white/10 flex items-center justify-center text-white font-bold"
              >-</button>
              <div className="flex-1 text-center">
                <span className="text-2xl font-bold text-white">{maxPeople}</span>
                <span className="text-white/40 text-sm ml-1">명</span>
              </div>
              <button
                onClick={() => setMaxPeople(Math.min(20, maxPeople + 1))}
                className="w-10 h-10 bg-card rounded-xl border border-white/10 flex items-center justify-center text-lime font-bold"
              >+</button>
            </div>
          </div>

          {/* 운동 레벨 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-xs text-white/40">운동 레벨</label>
              <p className="text-white font-bold">LV. {minLevel} ~ {maxLevel}</p>
            </div>
            <DualRangeSlider
              min={1}
              max={100}
              minVal={minLevel}
              maxVal={maxLevel}
              onMinChange={setMinLevel}
              onMaxChange={setMaxLevel}
            />
            <div className="flex justify-between mt-2">
              <p className="text-white/30 text-[10px]">LV. 1</p>
              <p className="text-white/30 text-[10px]">LV. 100</p>
            </div>
          </div>

          {/* 나이 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-xs text-white/40">나이</label>
              <p className="text-white font-bold">{minAge}~{maxAge}세</p>
            </div>
            <DualRangeSlider
              min={15}
              max={70}
              minVal={minAge}
              maxVal={maxAge}
              onMinChange={setMinAge}
              onMaxChange={setMaxAge}
            />
            <div className="flex justify-between mt-2">
              <p className="text-white/30 text-[10px]">15세</p>
              <p className="text-white/30 text-[10px]">70세</p>
            </div>
          </div>

          {/* 성별 */}
          <div>
            <label className="text-xs text-white/40 mb-2 block">성별 <span className="text-lime">*</span></label>
            <div className="flex flex-wrap gap-2">
              {genderOptions.map((option) => renderTagButton(option, gender === option, () => setGender(option)))}
            </div>
          </div>
        </div>
      )
    }

    // Step 4
    return (
      <div className="space-y-6">
        <div>
          <p className="text-white text-xl font-bold mb-1">공개 범위와 설명</p>
          <p className="text-white/40 text-sm mb-6">모임 공개 범위와 공유 설정을 해주세요</p>
        </div>
        <div>
          <label className="text-xs text-white/40 mb-2 block">공개 범위</label>
          <div className="flex gap-2">
            {visibilityOptions.map((option) => renderTagButton(option, visibility === option, () => setVisibility(option)))}
          </div>
        </div>
        <div>
          <label className="text-xs text-white/40 mb-2 block">공유 허용</label>
          <div className="flex gap-2">
            {shareOptions.map((option) => renderTagButton(option, shareAllowed === option, () => setShareAllowed(option)))}
          </div>
        </div>
        <div>
          <label className="text-xs text-white/40 mb-1.5 block">모임 설명 (선택)</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="모임에 대해 자유롭게 소개해주세요"
            rows={5}
            className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-lime/50 transition-colors resize-none"
          />
        </div>
      </div>
    )
  }

  if (showReview) {
    const SectionHeader = ({ label }: { label: string }) => (
      <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-3 mt-6 first:mt-0">{label}</p>
    )

    return (
      <div className="min-h-screen bg-fig flex flex-col">
        <div className="flex items-center justify-between px-5 pt-14 pb-4">
          <button onClick={handleBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <p className="text-sm font-bold text-white">모임 확인 · 수정</p>
          <div className="w-5" />
        </div>

        <div className="px-5 flex-1 overflow-y-auto pb-4 scrollbar-none">
          <p className="text-white text-xl font-bold mb-1">내용을 확인하고 수정하세요</p>
          <p className="text-white/40 text-sm mb-6">각 항목을 바로 수정할 수 있어요</p>

          {/* ── 기본 정보 ── */}
          <SectionHeader label="기본 정보" />
          <div className="rounded-2xl p-4 mb-1 space-y-4" style={{ backgroundColor: '#2C2C3E' }}>
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">모임 제목</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-fig border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-lime/50 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-2 block">운동 종류</label>
              <div className="flex flex-wrap gap-2">
                {sportTypes.map((s) => renderTagButton(
                  s === '직접입력' && customSport ? customSport : s,
                  s === '직접입력' ? customSport !== null && sport === customSport : sport === s,
                  () => handleSportClick(s),
                ))}
              </div>
            </div>
          </div>

          {/* ── 날짜 · 시간 · 장소 ── */}
          <SectionHeader label="날짜 · 시간 · 장소" />
          <div className="rounded-2xl p-4 mb-1 space-y-4" style={{ backgroundColor: '#2C2C3E' }}>
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">날짜</label>
              <button
                onClick={() => setShowCalPicker(true)}
                className="w-full bg-fig border border-white/10 rounded-xl px-4 py-3 text-sm text-left outline-none transition-colors flex items-center justify-between"
              >
                <span className={date ? 'text-white' : 'text-white/20'}>{date || '날짜를 선택하세요'}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="#6B7280" strokeWidth="1.5" />
                  <line x1="3" y1="9" x2="21" y2="9" stroke="#6B7280" strokeWidth="1.5" />
                  <line x1="8" y1="2" x2="8" y2="6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="16" y1="2" x2="16" y2="6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">시간</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => openTimePicker('start')}
                  className="flex-1 bg-fig border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors flex items-center justify-between"
                >
                  <span>{startTime}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="#6B7280" strokeWidth="1.5" />
                    <path d="M12 7v5l3 3" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                <span className="text-white/30 text-sm">-</span>
                <button
                  onClick={() => openTimePicker('end')}
                  className="flex-1 bg-fig border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors flex items-center justify-between"
                >
                  <span>{endTime}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="#6B7280" strokeWidth="1.5" />
                    <path d="M12 7v5l3 3" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">장소</label>
              <div className="relative">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="장소를 입력하세요"
                  className="w-full bg-fig border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-lime/50 transition-colors pr-10"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="#6B7280" strokeWidth="2" />
                    <circle cx="12" cy="10" r="3" stroke="#6B7280" strokeWidth="2" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* ── 참여 조건 ── */}
          <SectionHeader label="참여 조건" />
          <div className="rounded-2xl p-4 mb-1 space-y-5" style={{ backgroundColor: '#2C2C3E' }}>
            <div>
              <label className="text-xs text-white/40 mb-3 block">모집 인원</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setMaxPeople(Math.max(2, maxPeople - 1))}
                  className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: '#1C1C2E' }}
                >-</button>
                <div className="flex-1 text-center">
                  <span className="text-2xl font-bold text-white">{maxPeople}</span>
                  <span className="text-white/40 text-sm ml-1">명</span>
                </div>
                <button
                  onClick={() => setMaxPeople(Math.min(20, maxPeople + 1))}
                  className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-lime font-bold"
                  style={{ backgroundColor: '#1C1C2E' }}
                >+</button>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-xs text-white/40">운동 레벨</label>
                <p className="text-white font-bold">LV. {minLevel} ~ {maxLevel}</p>
              </div>
              <DualRangeSlider min={1} max={100} minVal={minLevel} maxVal={maxLevel} onMinChange={setMinLevel} onMaxChange={setMaxLevel} />
              <div className="flex justify-between mt-2">
                <p className="text-white/30 text-[10px]">LV. 1</p>
                <p className="text-white/30 text-[10px]">LV. 100</p>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-xs text-white/40">나이</label>
                <p className="text-white font-bold">{minAge}~{maxAge}세</p>
              </div>
              <DualRangeSlider min={15} max={70} minVal={minAge} maxVal={maxAge} onMinChange={setMinAge} onMaxChange={setMaxAge} />
              <div className="flex justify-between mt-2">
                <p className="text-white/30 text-[10px]">15세</p>
                <p className="text-white/30 text-[10px]">70세</p>
              </div>
            </div>
            <div>
              <label className="text-xs text-white/40 mb-2 block">성별</label>
              <div className="flex flex-wrap gap-2">
                {genderOptions.map((option) => renderTagButton(option, gender === option, () => setGender(option)))}
              </div>
            </div>
          </div>

          {/* ── 공개 설정 ── */}
          <SectionHeader label="공개 설정" />
          <div className="rounded-2xl p-4 mb-1 space-y-4" style={{ backgroundColor: '#2C2C3E' }}>
            <div>
              <label className="text-xs text-white/40 mb-2 block">공개 범위</label>
              <div className="flex gap-2">
                {visibilityOptions.map((option) => renderTagButton(option, visibility === option, () => setVisibility(option)))}
              </div>
            </div>
            <div>
              <label className="text-xs text-white/40 mb-2 block">공유 허용</label>
              <div className="flex gap-2">
                {shareOptions.map((option) => renderTagButton(option, shareAllowed === option, () => setShareAllowed(option)))}
              </div>
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">모임 설명 (선택)</label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="모임에 대해 자유롭게 소개해주세요"
                rows={4}
                className="w-full border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-lime/50 transition-colors resize-none"
                style={{ backgroundColor: '#1C1C2E' }}
              />
            </div>
          </div>
        </div>

        <div className="px-5 pb-10 pt-4">
          <button
            onClick={() => setShowSuccessModal(true)}
            className="w-full py-4 font-bold text-sm rounded-2xl bg-lime text-fig"
          >생성</button>
        </div>

        {/* 성공 알림 */}
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-8" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
            <div className="w-full rounded-3xl p-7 flex flex-col items-center" style={{ backgroundColor: '#2C2C3E', maxWidth: 320 }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(180,240,74,0.15)' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="#B4F04A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-white text-lg font-bold mb-1">모임이 생성되었어요!</p>
              <p className="text-white/40 text-sm text-center mb-6">'{title}' 모임이 성공적으로 만들어졌습니다</p>
              <button onClick={() => navigate('/meetup')} className="w-full py-4 rounded-2xl font-bold text-sm bg-lime text-fig">확인</button>
            </div>
          </div>
        )}

        {/* 날짜 선택 모달 */}
        {showCalPicker && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="bg-white rounded-2xl p-5 w-full" style={{ maxWidth: 340 }}>
              <p className="text-gray-900 font-bold text-base text-center mb-4">날짜 선택</p>
              {dateError && (
                <div className="mb-3 px-3 py-2 rounded-xl flex items-center gap-2" style={{ backgroundColor: '#FEE2E2' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#EF4444" /><path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
                  <p className="text-red-600 text-xs font-medium">{dateError}</p>
                </div>
              )}
              <div className="flex items-center justify-between mb-4">
                <button onClick={() => { setCalMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1)); setDateError('') }} className="w-8 h-8 flex items-center justify-center text-gray-400 rounded-lg text-sm">◀</button>
                <p className="text-gray-900 font-bold text-sm">{calYear}년 {calMon + 1}월</p>
                <button onClick={() => setCalMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1))} className="w-8 h-8 flex items-center justify-center text-gray-400 rounded-lg text-sm">▶</button>
              </div>
              <div className="grid grid-cols-7 mb-2">
                {['일', '월', '화', '수', '목', '금', '토'].map((d) => (<div key={d} className="text-center text-[11px] text-gray-400 font-medium py-1">{d}</div>))}
              </div>
              <div className="grid grid-cols-7 gap-y-0.5">
                {Array.from({ length: startDay }, (_, i) => <div key={`e${i}`} />)}
                {Array.from({ length: totalDays }, (_, i) => {
                  const day = i + 1
                  const dayDate = new Date(calYear, calMon, day)
                  const isPast = dayDate < todayMidnight
                  const isSelected = selectedCalDate?.getDate() === day && selectedCalDate?.getMonth() === calMon && selectedCalDate?.getFullYear() === calYear
                  const isToday = new Date().getDate() === day && new Date().getMonth() === calMon && new Date().getFullYear() === calYear
                  return (
                    <button key={day} onClick={() => handleCalDayClick(day)}
                      className="h-9 w-full flex items-center justify-center rounded-full text-xs transition-all"
                      style={{ backgroundColor: isSelected ? '#1C1C2E' : 'transparent', color: isPast ? '#d1d5db' : isSelected ? '#fff' : isToday ? '#B4F04A' : '#333', fontWeight: isToday || isSelected ? 'bold' : 'normal', cursor: isPast ? 'not-allowed' : 'pointer', textDecoration: isPast ? 'line-through' : 'none' }}>
                      {day}
                    </button>
                  )
                })}
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={() => { setShowCalPicker(false); setDateError('') }} className="flex-1 py-3 rounded-xl text-sm font-medium" style={{ backgroundColor: '#f3f4f6', color: '#555' }}>취소</button>
                <button onClick={confirmDate} disabled={!selectedCalDate} className="flex-1 py-3 rounded-xl text-sm font-bold" style={{ backgroundColor: selectedCalDate ? '#1C1C2E' : '#e5e7eb', color: selectedCalDate ? '#fff' : '#aaa' }}>확인</button>
              </div>
            </div>
          </div>
        )}

        {/* 시간 선택 모달 */}
        {showTimePicker && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-8" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="bg-white rounded-2xl p-6 w-full" style={{ maxWidth: 300 }}>
              <p className="text-gray-900 font-bold text-base mb-6 text-center">{timeTarget === 'start' ? '시작 시간 선택' : '종료 시간 선택'}</p>
              <div className="flex items-center justify-center gap-3 mb-4">
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
              {timeError && (
                <div className="mb-3 px-3 py-2 rounded-xl flex items-center gap-2" style={{ backgroundColor: '#FEE2E2' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#EF4444" /><path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
                  <p className="text-red-600 text-xs font-medium">{timeError}</p>
                </div>
              )}
              <div className="flex gap-3">
                <button onClick={() => { setShowTimePicker(false); setTimeError('') }} className="flex-1 py-3 rounded-xl text-sm font-medium" style={{ backgroundColor: '#f3f4f6', color: '#555' }}>취소</button>
                <button onClick={confirmTime} className="flex-1 py-3 rounded-xl text-sm font-bold" style={{ backgroundColor: '#1C1C2E', color: '#fff' }}>확인</button>
              </div>
            </div>
          </div>
        )}

        {/* 운동 종류 직접 입력 모달 */}
        {showSportModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 px-6" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }} onClick={() => setShowSportModal(false)}>
            <div className="w-full rounded-2xl p-5" style={{ backgroundColor: '#2C2C3E', maxWidth: 320 }} onClick={(e) => e.stopPropagation()}>
              <p className="text-white font-bold text-base mb-4">운동 종류 직접 입력</p>
              <label className="text-xs text-white/40 mb-1.5 block">운동 이름</label>
              <input autoFocus value={customSportInput} onChange={(e) => setCustomSportInput(e.target.value.slice(0, 20))} onKeyDown={(e) => { if (e.key === 'Enter') handleCustomSportAdd() }} placeholder="운동 이름을 입력해 주세요" className="w-full rounded-xl px-4 py-3 text-sm outline-none border border-white/10 mb-1" style={{ backgroundColor: '#1C1C2E', color: '#fff' }} />
              <p className="text-[10px] text-white/30 text-right mb-4">{customSportInput.length}/20</p>
              <div className="flex gap-2">
                <button onClick={() => { setShowSportModal(false); setCustomSportInput('') }} className="flex-1 py-3 rounded-xl text-sm font-medium" style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}>취소</button>
                <button onClick={handleCustomSportAdd} disabled={!customSportInput.trim()} className="flex-1 py-3 rounded-xl text-sm font-bold" style={{ backgroundColor: customSportInput.trim() ? '#B4F04A' : 'rgba(255,255,255,0.05)', color: customSportInput.trim() ? '#1C1C2E' : 'rgba(255,255,255,0.2)' }}>추가하기</button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-fig flex flex-col">
      <div className="flex items-center justify-between px-5 pt-14 pb-4">
        <button onClick={handleBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <p className="text-sm font-bold text-white">모임 만들기</p>
        <div className="w-5" />
      </div>

      <StepBar current={step} total={TOTAL_STEPS} />

      <div className="px-5 flex-1 overflow-y-auto pb-4">
        {renderStep()}
      </div>

      <div className="px-5 pb-10 pt-4">
        <button
          onClick={handleNext}
          disabled={!isStepValid}
          className={`w-full py-4 font-bold text-sm rounded-2xl transition-all ${
            isStepValid ? 'bg-lime text-fig' : 'bg-white/5 text-white/20 cursor-not-allowed'
          }`}
        >
          {step === TOTAL_STEPS ? '완료' : '다음'}
        </button>
      </div>

      {/* 운동 종류 직접 입력 모달 */}
      {showSportModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 px-6"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
          onClick={() => setShowSportModal(false)}
        >
          <div
            className="w-full rounded-2xl p-5"
            style={{ backgroundColor: '#2C2C3E', maxWidth: 320 }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-white font-bold text-base mb-4">운동 종류 직접 입력</p>
            <label className="text-xs text-white/40 mb-1.5 block">운동 이름</label>
            <input
              autoFocus
              value={customSportInput}
              onChange={(e) => setCustomSportInput(e.target.value.slice(0, 20))}
              onKeyDown={(e) => { if (e.key === 'Enter') handleCustomSportAdd() }}
              placeholder="운동 이름을 입력해 주세요"
              className="w-full rounded-xl px-4 py-3 text-sm outline-none border border-white/10 mb-1"
              style={{ backgroundColor: '#1C1C2E', color: '#fff' }}
            />
            <p className="text-[10px] text-white/30 text-right mb-4">{customSportInput.length}/20</p>
            <div className="flex gap-2">
              <button
                onClick={() => { setShowSportModal(false); setCustomSportInput('') }}
                className="flex-1 py-3 rounded-xl text-sm font-medium"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}
              >취소</button>
              <button
                onClick={handleCustomSportAdd}
                disabled={!customSportInput.trim()}
                className="flex-1 py-3 rounded-xl text-sm font-bold"
                style={{
                  backgroundColor: customSportInput.trim() ? '#B4F04A' : 'rgba(255,255,255,0.05)',
                  color: customSportInput.trim() ? '#1C1C2E' : 'rgba(255,255,255,0.2)',
                }}
              >추가하기</button>
            </div>
          </div>
        </div>
      )}

      {/* 날짜 선택 모달 */}
      {showCalPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="bg-white rounded-2xl p-5 w-full" style={{ maxWidth: 340 }}>
            <p className="text-gray-900 font-bold text-base text-center mb-4">날짜 선택</p>

            {/* 오류 메시지 */}
            {dateError && (
              <div className="mb-3 px-3 py-2 rounded-xl flex items-center gap-2" style={{ backgroundColor: '#FEE2E2' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#EF4444" />
                  <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <p className="text-red-600 text-xs font-medium">{dateError}</p>
              </div>
            )}

            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => { setCalMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1)); setDateError('') }}
                className="w-8 h-8 flex items-center justify-center text-gray-400 rounded-lg text-sm"
              >◀</button>
              <p className="text-gray-900 font-bold text-sm">{calYear}년 {calMon + 1}월</p>
              <button
                onClick={() => setCalMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1))}
                className="w-8 h-8 flex items-center justify-center text-gray-400 rounded-lg text-sm"
              >▶</button>
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
                const dayDate = new Date(calYear, calMon, day)
                const isPast = dayDate < todayMidnight
                const isSelected = selectedCalDate?.getDate() === day && selectedCalDate?.getMonth() === calMon && selectedCalDate?.getFullYear() === calYear
                const isToday = new Date().getDate() === day && new Date().getMonth() === calMon && new Date().getFullYear() === calYear
                return (
                  <button
                    key={day}
                    onClick={() => handleCalDayClick(day)}
                    className="h-9 w-full flex items-center justify-center rounded-full text-xs transition-all"
                    style={{
                      backgroundColor: isSelected ? '#1C1C2E' : 'transparent',
                      color: isPast ? '#d1d5db' : isSelected ? '#fff' : isToday ? '#B4F04A' : '#333',
                      fontWeight: isToday || isSelected ? 'bold' : 'normal',
                      cursor: isPast ? 'not-allowed' : 'pointer',
                      textDecoration: isPast ? 'line-through' : 'none',
                    }}
                  >
                    {day}
                  </button>
                )
              })}
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => { setShowCalPicker(false); setDateError('') }}
                className="flex-1 py-3 rounded-xl text-sm font-medium"
                style={{ backgroundColor: '#f3f4f6', color: '#555' }}
              >취소</button>
              <button
                onClick={confirmDate}
                disabled={!selectedCalDate}
                className="flex-1 py-3 rounded-xl text-sm font-bold"
                style={{ backgroundColor: selectedCalDate ? '#1C1C2E' : '#e5e7eb', color: selectedCalDate ? '#fff' : '#aaa' }}
              >확인</button>
            </div>
          </div>
        </div>
      )}

      {/* 시간 선택 모달 */}
      {showTimePicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-8" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="bg-white rounded-2xl p-6 w-full" style={{ maxWidth: 300 }}>
            <p className="text-gray-900 font-bold text-base mb-6 text-center">
              {timeTarget === 'start' ? '시작 시간 선택' : '종료 시간 선택'}
            </p>
            <div className="flex items-center justify-center gap-3 mb-4">
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

            {/* 시간 오류 메시지 */}
            {timeError && (
              <div className="mb-3 px-3 py-2 rounded-xl flex items-center gap-2" style={{ backgroundColor: '#FEE2E2' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#EF4444" />
                  <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <p className="text-red-600 text-xs font-medium">{timeError}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={() => { setShowTimePicker(false); setTimeError('') }} className="flex-1 py-3 rounded-xl text-sm font-medium" style={{ backgroundColor: '#f3f4f6', color: '#555' }}>취소</button>
              <button onClick={confirmTime} className="flex-1 py-3 rounded-xl text-sm font-bold" style={{ backgroundColor: '#1C1C2E', color: '#fff' }}>확인</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
