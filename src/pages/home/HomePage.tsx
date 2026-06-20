import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SparkLogo from '../../components/SparkLogo'

import runImg from '../../assets/run.png'
import gymImg from '../../assets/gym.png'
import bikeImg from '../../assets/bike.png'
import swimImg from '../../assets/swim.png'
import tennisImg from '../../assets/tennis.png'
import soccerImg from '../../assets/soccer.png'
import badmintonImg from '../../assets/badminton.png'
import basketballImg from '../../assets/basketball.png'
import climbImg from '../../assets/climb.png'
import golfImg from '../../assets/golf.png'
import bolingImg from '../../assets/boling.png'
import lv1Img from '../../assets/lv1.png'
import lv2Img from '../../assets/lv2.png'
import lv3Img from '../../assets/lv3.png'
import homeWalkImg from '../../assets/home-walk.png'
import homeKcalImg from '../../assets/home-kcal.png'
import homeTimeImg from '../../assets/home-time.png'

const sportImages: Record<string, string> = {
  '런닝': runImg,
  '헬스': gymImg,
  '사이클링': bikeImg,
  '수영': swimImg,
  '테니스': tennisImg,
  '축구': soccerImg,
  '배드민턴': badmintonImg,
  '농구': basketballImg,
  '클라이밍': climbImg,
  '골프': golfImg,
  '볼링': bolingImg,
}

// 요가 이미지 없어서 수영으로 대체
const defaultRoutines = [
  { name: '축구' },
  { name: '농구' },
  { name: '수영' },
  { name: '런닝' },
  { name: '테니스' },
]

const meetups = [
  { sport: '축구', title: '퇴근 후 축구 한 판', location: '해바라기 공원, 구로동', time: '오늘, 6:00 PM', participants: '9/10' },
  { sport: '헬스', title: '출근 전 헬스', location: '강남구 역삼동', time: '내일, 7:00 AM', participants: '3/8' },
  { sport: '런닝', title: '한강 저녁 러닝', location: '한강공원, 여의도', time: '오늘, 7:30 PM', participants: '5/12' },
  { sport: '클라이밍', title: '클라이밍 같이해요', location: '강동구 클라이밍짐', time: '토요일, 10:00 AM', participants: '2/4' },
]

const workoutRecords = [
  { sport: '런닝', title: '30분 러닝', time: '오늘 · 6:30 AM', kcal: '320 kcal', tag: '동네' },
  { sport: '헬스', title: '1 시간 헬스장', time: '어제 · 5:45 PM', kcal: '450 kcal', tag: '헬스장' },
  { sport: '사이클링', title: '20분 사이클링', time: 'Oct 24 · 10:15 AM', kcal: '180 kcal', tag: '집' },
]

// 현재 유저 레벨 (1·2·3)
const USER_LEVEL = 2
const levelImages = [lv1Img, lv2Img, lv3Img]

export default function HomePage() {
  const navigate = useNavigate()
  const [routines, setRoutines] = useState(defaultRoutines)
  const [showRoutineModal, setShowRoutineModal] = useState(false)
  const [routineInput, setRoutineInput] = useState('')

  const addRoutine = () => {
    const name = routineInput.trim()
    if (!name) return
    setRoutines((prev) => [...prev, { name }])
    setRoutineInput('')
    setShowRoutineModal(false)
  }

  return (
    <div className="min-h-screen bg-fig pb-24 overflow-y-auto scrollbar-none">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4">
        <SparkLogo size={36} variant="gradient-dark" />
        <button
          onClick={() => navigate('/home/notifications')}
          className="w-9 h-9 flex items-center justify-center relative"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"
              stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-lime rounded-full" />
        </button>
      </div>

      {/* 인사 + 상태 */}
      <div className="px-5 mb-5">
        <p className="text-white text-xl font-bold leading-snug mb-0.5">하루님 운동할 준비가 되셨나요?</p>
        <p className="text-white/40 text-sm">이번 주에 3개의 모임이 예정되어 있습니다.</p>

        {/* 유저 상태 카드 */}
        <div className="mt-4 bg-card rounded-2xl p-4 border border-white/5 flex items-center gap-4">
          {/* 레벨 뱃지 이미지 */}
          <div className="relative flex-shrink-0 w-16 h-16">
            <svg width="64" height="64" viewBox="0 0 64 64" className="absolute inset-0">
              <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
              <circle cx="32" cy="32" r="28" fill="none" stroke="#B4F04A" strokeWidth="5"
                strokeDasharray={2 * Math.PI * 28} strokeDashoffset={2 * Math.PI * 28 * 0.2}
                strokeLinecap="round" transform="rotate(-90 32 32)" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center p-2">
              <img
                src={levelImages[USER_LEVEL - 1]}
                alt={`lv${USER_LEVEL}`}
                className="w-8 h-8 object-contain"
              />
            </div>
          </div>

          {/* 텍스트 */}
          <div className="flex-1">
            <p className="text-white font-bold text-sm">50일째 운동 중</p>
            <p className="text-white/40 text-xs mt-0.5">근성장이 되고 있어요!</p>
            <div className="mt-2">
              <p className="text-white/40 text-[10px]">총 운동 횟수</p>
              <p className="text-lime font-bold text-sm">85 번</p>
            </div>
          </div>
        </div>

        {/* 운동 시작 버튼 */}
        <button
          onClick={() => navigate('/workout')}
          className="w-full mt-3 py-4 rounded-2xl font-bold text-sm"
          style={{ backgroundColor: '#B4F04A', color: '#1C1C2E' }}
        >
          지금 운동 시작하기
        </button>
      </div>

      {/* 자주하는 운동 루틴 */}
      <div className="mb-5">
        <div className="flex items-center justify-between px-5 mb-3">
          <p className="text-white font-bold text-sm">자주하는 운동 루틴</p>
          <button onClick={() => setShowRoutineModal(true)} className="text-xs text-white/40">직접입력</button>
        </div>
        <div className="flex gap-3 px-5 overflow-x-auto scrollbar-none pb-1">
          {routines.map((r) => (
            <button
              key={r.name}
              onClick={() => navigate('/workout')}
              className="flex-shrink-0 flex flex-col items-center gap-1.5"
            >
              <div className="w-14 h-14 rounded-2xl bg-card border border-white/8 flex items-center justify-center">
                {sportImages[r.name]
                  ? <img src={sportImages[r.name]} alt={r.name} className="w-8 h-8 object-contain" />
                  : <span className="text-2xl">🏅</span>
                }
              </div>
              <span className="text-xs text-white/60">{r.name}</span>
            </button>
          ))}
          <button
            onClick={() => setShowRoutineModal(true)}
            className="flex-shrink-0 flex flex-col items-center gap-1.5"
          >
            <div className="w-14 h-14 rounded-2xl bg-card border border-dashed border-white/15 flex items-center justify-center">
              <span className="text-white/30 text-2xl">+</span>
            </div>
            <span className="text-xs text-white/30">추가</span>
          </button>
        </div>
      </div>

      {/* 추천 번개 */}
      <div className="mb-5">
        <div className="flex items-center justify-between px-5 mb-3">
          <p className="text-white font-bold text-sm">추천 번개</p>
          <button onClick={() => navigate('/meetup')} className="text-xs text-white/40">전체보기</button>
        </div>
        <div className="flex gap-3 px-5 overflow-x-auto scrollbar-none pb-1" style={{ WebkitOverflowScrolling: 'touch' }}>
          {meetups.map((m, i) => (
            <button
              key={i}
              onClick={() => navigate('/meetup/detail')}
              className="flex-shrink-0 rounded-2xl overflow-hidden border border-white/8 text-left"
              style={{ backgroundColor: '#2C2C3E', width: 160 }}
            >
              {/* 썸네일: 종목 이미지 */}
              <div className="h-24 flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>
                {sportImages[m.sport]
                  ? <img src={sportImages[m.sport]} alt={m.sport} className="h-14 w-14 object-contain" />
                  : <span className="text-4xl">🏟️</span>
                }
              </div>
              <div className="p-3">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full mb-1.5 inline-block"
                  style={{ backgroundColor: 'rgba(180,240,74,0.15)', color: '#B4F04A' }}>
                  {m.sport}
                </span>
                <p className="text-white text-xs font-bold truncate">{m.title}</p>
                <p className="text-white/40 text-[10px] mt-1 truncate">{m.location}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-white/30 text-[10px]">{m.time}</p>
                  <p className="text-white/50 text-[10px]">{m.participants} 참여</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 번개 모임 열기 / 내 주변 찾기 */}
      <div className="px-5 grid grid-cols-2 gap-3 mb-5">
        <button
          onClick={() => navigate('/meetup/create')}
          className="rounded-2xl px-3 py-3 border border-white/8 text-left flex items-center gap-3"
          style={{ backgroundColor: '#2C2C3E' }}
        >
          <div className="w-8 h-8 rounded-xl bg-white/8 flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" />
              <path d="M12 8v8M8 12h8" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="text-white text-xs font-bold">번개 모임 열기</p>
            <p className="text-white/40 text-[10px] mt-0.5">모임을 만들어볼까요?</p>
          </div>
        </button>
        <button
          onClick={() => navigate('/meetup')}
          className="rounded-2xl px-3 py-3 border border-white/8 text-left flex items-center gap-3"
          style={{ backgroundColor: '#2C2C3E' }}
        >
          <div className="w-8 h-8 rounded-xl bg-white/8 flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" />
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5.64 5.64l2.12 2.12M16.24 16.24l2.12 2.12M5.64 18.36l2.12-2.12M16.24 7.76l2.12-2.12"
                stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="text-white text-xs font-bold">내 주변 번개 찾기</p>
            <p className="text-white/40 text-[10px] mt-0.5">동네 운동 참여</p>
          </div>
        </button>
      </div>

      {/* 오늘의 운동 현황 */}
      <div className="px-5 mb-5">
        <p className="text-white font-bold text-sm mb-3">오늘의 운동 현황</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: '걸음 수', value: '8.4k', img: homeWalkImg },
            { label: 'kcal',   value: '650',   img: homeKcalImg },
            { label: '활동 시간', value: '45m', img: homeTimeImg },
          ].map((s) => (
            <div key={s.label} className="bg-card rounded-2xl p-3 border border-white/5 flex flex-col items-center justify-center aspect-square">
              <img src={s.img} alt={s.label} className="w-10 h-10 object-contain mb-2" />
              <p className="text-white font-bold text-sm">{s.value}</p>
              <p className="text-white/40 text-[10px] mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 이전 운동 기록 */}
      <div className="px-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-white font-bold text-sm">이전 운동 기록</p>
          <button onClick={() => navigate('/workout/manage')} className="text-xs text-white/40">전체보기</button>
        </div>
        <div className="space-y-2">
          {workoutRecords.map((r, i) => (
            <div key={i} className="flex items-center gap-3 bg-card rounded-2xl px-4 py-3 border border-white/5">
              <div className="w-9 h-9 rounded-xl bg-white/8 flex items-center justify-center flex-shrink-0">
                {sportImages[r.sport]
                  ? <img src={sportImages[r.sport]} alt={r.sport} className="w-5 h-5 object-contain" />
                  : <span className="text-lg">🏅</span>
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{r.title}</p>
                <p className="text-white/40 text-[10px] mt-0.5">{r.time}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-white/70 text-xs font-bold">{r.kcal}</p>
                <p className="text-white/30 text-[10px] mt-0.5">{r.tag}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 직접입력 모달 */}
      {showRoutineModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 px-6"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
          onClick={() => { setShowRoutineModal(false); setRoutineInput('') }}
        >
          <div
            className="w-full rounded-2xl p-5"
            style={{ backgroundColor: '#2C2C3E', maxWidth: 320 }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-white font-bold text-base mb-4">운동 루틴 직접 입력</p>
            <label className="text-xs text-white/40 mb-1.5 block">운동 종목 이름</label>
            <input
              autoFocus
              value={routineInput}
              onChange={(e) => setRoutineInput(e.target.value.slice(0, 15))}
              placeholder="예) 클라이밍, 스쿼시"
              className="w-full rounded-xl px-4 py-3 text-sm outline-none border border-white/10 mb-1"
              style={{ backgroundColor: '#1C1C2E', color: '#fff' }}
              onKeyDown={(e) => e.key === 'Enter' && addRoutine()}
            />
            <p className="text-[10px] text-white/30 text-right mb-4">{routineInput.length}/15</p>
            <div className="flex gap-2">
              <button
                onClick={() => { setShowRoutineModal(false); setRoutineInput('') }}
                className="flex-1 py-3 rounded-xl text-sm font-medium"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}
              >
                취소
              </button>
              <button
                onClick={addRoutine}
                className="flex-1 py-3 rounded-xl text-sm font-bold"
                style={{
                  backgroundColor: routineInput.trim() ? '#B4F04A' : 'rgba(255,255,255,0.05)',
                  color: routineInput.trim() ? '#1C1C2E' : 'rgba(255,255,255,0.2)',
                }}
              >
                추가하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
