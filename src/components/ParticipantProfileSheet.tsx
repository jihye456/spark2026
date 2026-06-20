// 타입만 export — 실제 UI는 ParticipantProfilePage 사용
export interface Trust {
  workoutCount: number   // 운동 횟수
  meetupCount: number    // 번개 활동 횟수
  recommend: number      // 추천
  levelAccurate: number  // 레벨 정확해요
  meetAgain: number      // 또 만나고 싶어요
  punctual: number       // 시간 약속을 잘 지켜요
}

export interface ParticipantProfile {
  name: string
  age: number
  gender: string
  level: number
  avatar: string
  hashtags: string[]
  bio: string
  tendency: string
  levelLabel: string
  isHost?: boolean
  trust: Trust
}
