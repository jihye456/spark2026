import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import runImg from '../../assets/run.png'
import gymImg from '../../assets/gym.png'
import bikeImg from '../../assets/bike.png'

function daysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate() }
function firstDayOf(y: number, m: number) { return new Date(y, m, 1).getDay() }

const WORKOUT_DATES: Record<string, { sport: string; distance: string; time: string; calories: number; img: string }[]> = {
  '2026-5-6':  [{ sport: '러닝',   img: runImg,  distance: '5.2km',  time: '32:14',   calories: 312 }],
  '2026-5-8':  [{ sport: '헬스',   img: gymImg,  distance: '-',       time: '58:00',   calories: 210 }],
  '2026-5-12': [{ sport: '러닝',   img: runImg,  distance: '6.1km',  time: '38:05',   calories: 364 }],
  '2026-5-15': [{ sport: '자전거', img: bikeImg, distance: '18.4km', time: '1:02:30', calories: 480 }],
  '2026-5-18': [{ sport: '러닝',   img: runImg,  distance: '4.8km',  time: '29:42',   calories: 288 }],
  '2026-5-20': [{ sport: '헬스',   img: gymImg,  distance: '-',       time: '55:00',   calories: 195 }],
  '2026-5-22': [{ sport: '러닝',   img: runImg,  distance: '7.0km',  time: '43:30',   calories: 420 }],
  '2026-5-25': [{ sport: '자전거', img: bikeImg, distance: '22.0km', time: '1:15:00', calories: 560 }],
}

// 기간별 그래프 데이터
const CHART_CONFIG = {
  '오늘': {
    label: '시간대별 소모 칼로리 (kcal)',
    bars: [
      { x: '14시', val: 0 },
      { x: '15시', val: 0 },
      { x: '16시', val: 0 },
      { x: '17시', val: 42 },
      { x: '18시', val: 115 },
      { x: '19시', val: 80 },
      { x: '20시', val: 0 },
    ],
    stats: { count: '1회', km: '-', time: '55분', cal: '195' },
  },
  '이번 주': {
    label: '요일별 소모 칼로리 (kcal)',
    bars: [
      { x: '월', val: 288 },
      { x: '화', val: 0 },
      { x: '수', val: 195 },
      { x: '목', val: 0 },
      { x: '금', val: 420 },
      { x: '토', val: 0 },
      { x: '일', val: 0 },
    ],
    stats: { count: '3회', km: '11.8km', time: '2h 25m', cal: '903' },
  },
  '이번 달': {
    label: '주차별 소모 칼로리 (kcal)',
    bars: [
      { x: '1주', val: 312 },
      { x: '2주', val: 574 },
      { x: '3주', val: 963 },
      { x: '4주', val: 980 },
      { x: '5주', val: 0 },
    ],
    stats: { count: '8회', km: '64.5km', time: '9h 14m', cal: '2,829' },
  },
  '최근 3개월': {
    label: '월별 소모 칼로리 (kcal)',
    bars: [
      { x: '3월', val: 1240 },
      { x: '4월', val: 1820 },
      { x: '5월', val: 2829 },
    ],
    stats: { count: '18회', km: '148km', time: '26h', cal: '5,889' },
  },
} as const

type PeriodKey = keyof typeof CHART_CONFIG
const PERIOD_TABS: PeriodKey[] = ['오늘', '이번 주', '이번 달', '최근 3개월']

export default function WorkoutManagePage() {
  const navigate = useNavigate()
  const today = new Date()
  const [calMonth, setCalMonth] = useState(new Date(2026, 4))
  const [selectedDate, setSelectedDate] = useState<string | null>('2026-5-20')
  const [periodTab, setPeriodTab] = useState<PeriodKey>('이번 달')

  const calYear = calMonth.getFullYear()
  const calMon = calMonth.getMonth()
  const total = daysInMonth(calYear, calMon)
  const startDay = firstDayOf(calYear, calMon)

  const todayKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
  const selectedWorkouts = selectedDate ? (WORKOUT_DATES[selectedDate] ?? []) : []

  const chart = CHART_CONFIG[periodTab]
  const maxVal = Math.max(...chart.bars.map((b) => b.val), 1)

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1C1C2E' }}>
      {/* 헤더 */}
      <div className="flex items-center gap-3 px-5 pt-14 pb-4">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <p className="text-white font-bold text-base">운동 관리</p>
      </div>

      <div className="pb-10 px-5 space-y-4">

        {/* 캘린더 */}
        <div className="rounded-2xl p-4 border border-white/8" style={{ backgroundColor: '#2C2C3E' }}>
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCalMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1))}
              className="w-7 h-7 flex items-center justify-center rounded-lg"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <p className="text-white font-bold text-sm">{calYear}년 {calMon + 1}월</p>
            <button
              onClick={() => setCalMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1))}
              className="w-7 h-7 flex items-center justify-center rounded-lg"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-7 mb-1">
            {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
              <div key={d} className="text-center text-[10px] font-medium py-1" style={{ color: 'rgba(255,255,255,0.3)' }}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-1">
            {Array.from({ length: startDay }, (_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: total }, (_, i) => {
              const day = i + 1
              const key = `${calYear}-${calMon + 1}-${day}`
              const hasWorkout = key in WORKOUT_DATES
              const isSelected = selectedDate === key
              const isToday = key === todayKey
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(isSelected ? null : key)}
                  className="flex flex-col items-center py-1"
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs"
                    style={{
                      backgroundColor: isSelected ? '#B4F04A' : 'transparent',
                      color: isSelected ? '#1C1C2E' : isToday ? '#B4F04A' : 'rgba(255,255,255,0.75)',
                      fontWeight: isSelected || isToday ? 'bold' : 'normal',
                    }}
                  >
                    {day}
                  </div>
                  {hasWorkout && (
                    <div className="w-1 h-1 rounded-full mt-0.5" style={{ backgroundColor: isSelected ? '#1C1C2E' : '#B4F04A' }} />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* 선택 날짜 운동 기록 */}
        {selectedDate && (
          <div>
            <p className="text-xs font-bold mb-2 px-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {selectedDate.replace(/-/g, '.')} 기록
            </p>
            {selectedWorkouts.length > 0 ? (
              <div className="space-y-2">
                {selectedWorkouts.map((w, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-2xl px-4 py-3 border border-white/8" style={{ backgroundColor: '#2C2C3E' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(180,240,74,0.1)' }}>
                      <img src={w.img} alt={w.sport} className="w-5 h-5 object-contain" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-bold">{w.sport}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {w.distance !== '-' && <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{w.distance}</span>}
                        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{w.time}</span>
                        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{w.calories}kcal</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl p-4 text-center border border-white/8" style={{ backgroundColor: '#2C2C3E' }}>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>이 날은 운동 기록이 없어요</p>
              </div>
            )}
          </div>
        )}

        {/* 기간별 통계 + 그래프 */}
        <div className="rounded-2xl p-4 border border-white/8" style={{ backgroundColor: '#2C2C3E' }}>
          {/* 기간 탭 */}
          <div className="flex gap-1 mb-5 p-1 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
            {PERIOD_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setPeriodTab(tab)}
                className="flex-1 py-1.5 rounded-lg text-[10px] font-bold transition-all"
                style={{
                  backgroundColor: periodTab === tab ? '#B4F04A' : 'transparent',
                  color: periodTab === tab ? '#1C1C2E' : 'rgba(255,255,255,0.4)',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 요약 스탯 */}
          <div className="grid grid-cols-4 text-center mb-5 pb-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
            {[
              { label: '운동', value: chart.stats.count },
              { label: '거리',  value: chart.stats.km },
              { label: '시간',  value: chart.stats.time },
              { label: 'kcal', value: chart.stats.cal },
            ].map((s, i) => (
              <div key={i} className={i > 0 ? 'border-l' : ''} style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                <p className="text-white font-bold text-sm">{s.value}</p>
                <p className="text-[9px] mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* 바 차트 */}
          <p className="text-[10px] mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>{chart.label}</p>

          {/* Y축 눈금 */}
          <div className="flex gap-2">
            {/* Y축 레이블 */}
            <div className="flex flex-col justify-between pb-5 text-right" style={{ width: 32 }}>
              {[maxVal, Math.round(maxVal * 0.5), 0].map((v, i) => (
                <span key={i} className="text-[8px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  {v}
                </span>
              ))}
            </div>

            {/* 바 + X축 */}
            <div className="flex-1">
              {/* 그리드 라인 */}
              <div className="relative" style={{ height: 100 }}>
                {[100, 50, 0].map((pct) => (
                  <div
                    key={pct}
                    className="absolute w-full"
                    style={{
                      bottom: `${pct}%`,
                      borderTop: '1px dashed rgba(255,255,255,0.08)',
                    }}
                  />
                ))}
                {/* 바 */}
                <div className="absolute inset-0 flex items-end gap-1.5 pb-0">
                  {chart.bars.map((b, i) => {
                    const pct = maxVal > 0 ? (b.val / maxVal) * 100 : 0
                    const isMax = b.val === maxVal && b.val > 0
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                        <div
                          className="w-full rounded-t-md transition-all"
                          style={{
                            height: b.val === 0 ? 3 : `${pct}%`,
                            backgroundColor: b.val === 0
                              ? 'rgba(255,255,255,0.06)'
                              : isMax
                                ? '#B4F04A'
                                : 'rgba(180,240,74,0.35)',
                          }}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* X축 레이블 */}
              <div className="flex gap-1.5 mt-1.5">
                {chart.bars.map((b, i) => {
                  const isMax = b.val === maxVal && b.val > 0
                  return (
                    <div key={i} className="flex-1 text-center">
                      <span
                        className="text-[9px] font-medium"
                        style={{ color: isMax ? '#B4F04A' : 'rgba(255,255,255,0.3)' }}
                      >
                        {b.x}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 전체 기록 */}
        <div>
          <p className="text-xs font-bold mb-2 px-1" style={{ color: 'rgba(255,255,255,0.4)' }}>전체 기록</p>
          <div className="space-y-2 overflow-y-auto scrollbar-none" style={{ maxHeight: 280 }}>
            {Object.entries(WORKOUT_DATES)
              .sort((a, b) => b[0].localeCompare(a[0]))
              .map(([date, workouts]) =>
                workouts.map((w, i) => (
                  <div key={`${date}-${i}`} className="flex items-center gap-3 rounded-2xl px-4 py-3 border border-white/8" style={{ backgroundColor: '#2C2C3E' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(180,240,74,0.1)' }}>
                      <img src={w.img} alt={w.sport} className="w-5 h-5 object-contain" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-white text-sm font-bold">{w.sport}</p>
                        <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>{date.replace(/-/g, '.')}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        {w.distance !== '-' && <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{w.distance}</span>}
                        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{w.time}</span>
                        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{w.calories}kcal</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
          </div>
        </div>
      </div>
    </div>
  )
}
