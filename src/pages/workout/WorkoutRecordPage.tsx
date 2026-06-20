import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import runImg from '../../assets/run.png'
import bikeImg from '../../assets/bike.png'
import swimImg from '../../assets/swim.png'
import gymImg from '../../assets/gym.png'
import climbImg from '../../assets/climb.png'
import tennisImg from '../../assets/tennis.png'

const SPORTS = [
  { id: 'run',    name: '달리기',  image: runImg },
  { id: 'bike',   name: '자전거',  image: bikeImg },
  { id: 'walk',   name: '걷기',    image: runImg },
  { id: 'gym',    name: '근력',    image: gymImg },
  { id: 'swim',   name: '수영하기', image: swimImg },
  { id: 'tennis', name: '테니스',  image: tennisImg },
  { id: 'climb',  name: '등산',    image: climbImg },
]

function daysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate() }
function firstDayOf(y: number, m: number) { return new Date(y, m, 1).getDay() }

function todayStr() {
  const t = new Date()
  const y = t.getFullYear()
  const m = String(t.getMonth() + 1).padStart(2, '0')
  const d = String(t.getDate()).padStart(2, '0')
  return `${y}.${m}.${d}`
}

export default function WorkoutRecordPage() {
  const navigate = useNavigate()
  const [sport, setSport] = useState('run')
  const [date, setDate] = useState(todayStr())
  const [hours, setHours] = useState('0')
  const [mins, setMins] = useState('30')
  const [secs, setSecs] = useState('0')
  const [distance, setDistance] = useState('')
  const [gymExercise, setGymExercise] = useState('')
  const [climbMountain, setClimbMountain] = useState('')
  const [sets, setSets] = useState(3)
  const [weight, setWeight] = useState('')
  const [result, setResult] = useState<'승' | '패' | ''>('')
  const [tennisSets, setTennisSets] = useState(1)
  const [memo, setMemo] = useState('')
  const [saved, setSaved] = useState(false)

  const isGym = sport === 'gym'
  const isTennis = sport === 'tennis'
  const isClimb = sport === 'climb'

  const [showCalPicker, setShowCalPicker] = useState(false)
  const [calMonth, setCalMonth] = useState(new Date())
  const [selectedCalDate, setSelectedCalDate] = useState<Date | null>(new Date())

  const calYear = calMonth.getFullYear()
  const calMon = calMonth.getMonth()
  const totalDays = daysInMonth(calYear, calMon)
  const startDay = firstDayOf(calYear, calMon)

  const todayMidnight = new Date()
  todayMidnight.setHours(0, 0, 0, 0)
  const tomorrowMidnight = new Date(todayMidnight)
  tomorrowMidnight.setDate(tomorrowMidnight.getDate() + 1)

  const handleCalDayClick = (day: number) => {
    const clicked = new Date(calYear, calMon, day)
    if (clicked >= tomorrowMidnight) return
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

  const canSave = isGym ? true : isTennis ? result !== '' : isClimb ? true : distance.trim() !== ''

  const handleSave = () => {
    if (!canSave) return
    setSaved(true)
  }

  if (saved) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5" style={{ backgroundColor: '#1C1C2E' }}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: 'rgba(180,240,74,0.15)', border: '2px solid rgba(180,240,74,0.3)' }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M5 13L9 17L19 7" stroke="#B4F04A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-white font-bold text-xl mb-2">기록 완료!</p>
        <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.4)' }}>운동 기록이 저장되었습니다.</p>
        <button onClick={() => navigate('/workout')}
          className="w-full max-w-xs py-4 rounded-2xl font-bold text-base"
          style={{ backgroundColor: '#B4F04A', color: '#1C1C2E' }}>
          운동 홈으로
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#1C1C2E' }}>
      {/* 헤더 */}
      <div className="flex items-center gap-3 px-5 pt-14 pb-4">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <p className="text-white font-bold text-base">운동 기록 남기기</p>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none pb-10 px-5 space-y-5">
        {/* 종목 선택 */}
        <div>
          <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>종목 선택</p>
          <div className="flex flex-wrap gap-2">
            {SPORTS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSport(s.id)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border transition-all"
                style={{
                  backgroundColor: sport === s.id ? 'rgba(180,240,74,0.1)' : '#2C2C3E',
                  borderColor: sport === s.id ? 'rgba(180,240,74,0.4)' : 'rgba(255,255,255,0.07)',
                }}
              >
                <img src={s.image} alt={s.name} className="w-5 h-5 object-contain" />
                <span className="text-xs font-bold" style={{ color: sport === s.id ? '#B4F04A' : 'rgba(255,255,255,0.7)' }}>
                  {s.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 날짜 */}
        <div>
          <p className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>날짜</p>
          <button
            onClick={() => setShowCalPicker(true)}
            className="w-full rounded-xl px-4 py-3 text-sm text-left outline-none border flex items-center justify-between"
            style={{ backgroundColor: '#2C2C3E', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
          >
            <span>{date}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="#6B7280" strokeWidth="1.5" />
              <line x1="3" y1="9" x2="21" y2="9" stroke="#6B7280" strokeWidth="1.5" />
              <line x1="8" y1="2" x2="8" y2="6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="16" y1="2" x2="16" y2="6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* 운동 시간 */}
        <div>
          <p className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>운동 시간</p>
          <div className="flex gap-2 items-center">
            {[
              { label: '시간', value: hours, set: setHours, max: 23 },
              { label: '분', value: mins, set: setMins, max: 59 },
              { label: '초', value: secs, set: setSecs, max: 59 },
            ].map(({ label, value, set, max }, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <input
                  type="number"
                  min={0}
                  max={max}
                  value={value}
                  onChange={(e) => set(String(Math.max(0, Math.min(max, Number(e.target.value)))))}
                  className="w-full text-center text-lg font-bold rounded-xl py-3 outline-none border"
                  style={{ backgroundColor: '#2C2C3E', color: '#fff', borderColor: 'rgba(255,255,255,0.1)' }}
                />
                <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 종목별 추가 입력 */}
        {isGym ? (
          <div className="space-y-4">
            {/* 기구 / 운동 이름 */}
            <div>
              <p className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>기구 / 운동 이름 (선택)</p>
              <input
                type="text"
                value={gymExercise}
                onChange={(e) => setGymExercise(e.target.value.slice(0, 30))}
                placeholder="예) 벤치프레스, 스쿼트, 덤벨컬"
                className="w-full rounded-xl px-4 py-3 text-sm outline-none border"
                style={{ backgroundColor: '#2C2C3E', color: '#fff', borderColor: 'rgba(255,255,255,0.1)' }}
              />
            </div>
            {/* 총 세트 수 */}
            <div>
              <p className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>총 세트 수</p>
              <div className="flex items-center gap-4 rounded-xl px-4 py-3 border"
                style={{ backgroundColor: '#2C2C3E', borderColor: 'rgba(255,255,255,0.1)' }}>
                <button
                  onClick={() => setSets((s) => Math.max(1, s - 1))}
                  className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-lg"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' }}
                >−</button>
                <div className="flex-1 text-center">
                  <span className="text-2xl font-bold text-white">{sets}</span>
                  <span className="text-sm ml-1" style={{ color: 'rgba(255,255,255,0.4)' }}>세트</span>
                </div>
                <button
                  onClick={() => setSets((s) => Math.min(50, s + 1))}
                  className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-lg"
                  style={{ backgroundColor: 'rgba(180,240,74,0.12)', color: '#B4F04A' }}
                >+</button>
              </div>
            </div>
            {/* 총 중량 (선택) */}
            <div>
              <p className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>총 중량 (선택)</p>
              <div className="relative">
                <input
                  type="number"
                  min={0}
                  step={0.5}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="0"
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none border pr-12"
                  style={{ backgroundColor: '#2C2C3E', color: '#fff', borderColor: 'rgba(255,255,255,0.1)' }}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm"
                  style={{ color: 'rgba(255,255,255,0.35)' }}>kg</span>
              </div>
            </div>
          </div>
        ) : isTennis ? (
          <div className="space-y-4">
            {/* 승패 */}
            <div>
              <p className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>승패 <span style={{ color: '#B4F04A' }}>*</span></p>
              <div className="flex gap-3">
                {(['승', '패'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setResult(r)}
                    className="flex-1 py-4 rounded-xl font-bold text-lg border transition-all"
                    style={{
                      backgroundColor: result === r
                        ? (r === '승' ? 'rgba(180,240,74,0.15)' : 'rgba(239,68,68,0.15)')
                        : '#2C2C3E',
                      borderColor: result === r
                        ? (r === '승' ? 'rgba(180,240,74,0.5)' : 'rgba(239,68,68,0.5)')
                        : 'rgba(255,255,255,0.1)',
                      color: result === r
                        ? (r === '승' ? '#B4F04A' : '#F87171')
                        : 'rgba(255,255,255,0.4)',
                    }}
                  >
                    {r === '승' ? '🏆 승' : '😔 패'}
                  </button>
                ))}
              </div>
            </div>
            {/* 세트 수 */}
            <div>
              <p className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>세트 수</p>
              <div className="flex items-center gap-4 rounded-xl px-4 py-3 border"
                style={{ backgroundColor: '#2C2C3E', borderColor: 'rgba(255,255,255,0.1)' }}>
                <button
                  onClick={() => setTennisSets((s) => Math.max(1, s - 1))}
                  className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-lg"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' }}
                >−</button>
                <div className="flex-1 text-center">
                  <span className="text-2xl font-bold text-white">{tennisSets}</span>
                  <span className="text-sm ml-1" style={{ color: 'rgba(255,255,255,0.4)' }}>세트</span>
                </div>
                <button
                  onClick={() => setTennisSets((s) => Math.min(5, s + 1))}
                  className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-lg"
                  style={{ backgroundColor: 'rgba(180,240,74,0.12)', color: '#B4F04A' }}
                >+</button>
              </div>
            </div>
          </div>
        ) : isClimb ? (
          <div>
            <p className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>산 이름 (선택)</p>
            <input
              type="text"
              value={climbMountain}
              onChange={(e) => setClimbMountain(e.target.value.slice(0, 30))}
              placeholder="예) 북한산, 설악산, 관악산"
              className="w-full rounded-xl px-4 py-3 text-sm outline-none border"
              style={{ backgroundColor: '#2C2C3E', color: '#fff', borderColor: 'rgba(255,255,255,0.1)' }}
            />
          </div>
        ) : (
          <div>
            <p className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>운동 거리 (km) <span style={{ color: '#B4F04A' }}>*</span></p>
            <div className="relative">
              <input
                type="number"
                min={0}
                step={0.01}
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                placeholder="0.00"
                className="w-full rounded-xl px-4 py-3 text-sm outline-none border pr-12"
                style={{ backgroundColor: '#2C2C3E', color: '#fff', borderColor: 'rgba(255,255,255,0.1)' }}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm"
                style={{ color: 'rgba(255,255,255,0.35)' }}>km</span>
            </div>
          </div>
        )}

        {/* 메모 */}
        <div>
          <p className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>메모 (선택)</p>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value.slice(0, 200))}
            placeholder="오늘 운동 느낀 점을 남겨보세요"
            rows={4}
            className="w-full rounded-xl px-4 py-3 text-sm outline-none border resize-none"
            style={{ backgroundColor: '#2C2C3E', color: '#fff', borderColor: 'rgba(255,255,255,0.1)' }}
          />
          <p className="text-right text-[10px] mt-1" style={{ color: 'rgba(255,255,255,0.25)' }}>{memo.length}/200</p>
        </div>

        {/* 저장 버튼 */}
        <button
          onClick={handleSave}
          className="w-full py-4 rounded-2xl font-bold text-base transition-all"
          style={{
            backgroundColor: canSave ? '#2563EB' : 'rgba(255,255,255,0.07)',
            color: canSave ? 'white' : 'rgba(255,255,255,0.25)',
          }}
        >
          저장
        </button>
      </div>

      {/* 날짜 선택 모달 */}
      {showCalPicker && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setShowCalPicker(false)}
        >
          <div
            className="bg-white rounded-2xl p-5 w-full"
            style={{ maxWidth: 340 }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-gray-900 font-bold text-base text-center mb-4">날짜 선택</p>

            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setCalMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1))}
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
                const isFuture = dayDate >= tomorrowMidnight
                const isSelected =
                  selectedCalDate?.getDate() === day &&
                  selectedCalDate?.getMonth() === calMon &&
                  selectedCalDate?.getFullYear() === calYear
                const isToday =
                  new Date().getDate() === day &&
                  new Date().getMonth() === calMon &&
                  new Date().getFullYear() === calYear
                return (
                  <button
                    key={day}
                    onClick={() => handleCalDayClick(day)}
                    className="h-9 w-full flex items-center justify-center rounded-full text-xs transition-all"
                    style={{
                      backgroundColor: isSelected ? '#1C1C2E' : 'transparent',
                      color: isFuture ? '#d1d5db' : isSelected ? '#fff' : isToday ? '#B4F04A' : '#333',
                      fontWeight: isToday || isSelected ? 'bold' : 'normal',
                      cursor: isFuture ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {day}
                  </button>
                )
              })}
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowCalPicker(false)}
                className="flex-1 py-3 rounded-xl text-sm font-medium"
                style={{ backgroundColor: '#f3f4f6', color: '#555' }}
              >취소</button>
              <button
                onClick={confirmDate}
                disabled={!selectedCalDate}
                className="flex-1 py-3 rounded-xl text-sm font-bold"
                style={{
                  backgroundColor: selectedCalDate ? '#1C1C2E' : '#e5e7eb',
                  color: selectedCalDate ? '#fff' : '#aaa',
                }}
              >확인</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
