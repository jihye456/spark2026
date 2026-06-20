import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import BottomNav from './components/BottomNav'

// Auth
import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'
import PhoneVerifyPage from './pages/auth/PhoneVerifyPage'
import OnboardingRegionPage from './pages/auth/OnboardingRegionPage'
import OnboardingSportsPage from './pages/auth/OnboardingSportsPage'
import OnboardingTimePage from './pages/auth/OnboardingTimePage'
import OnboardingBioPage from './pages/auth/OnboardingBioPage'
import SurveyGoalPage from './pages/auth/SurveyGoalPage'
import SurveyTendencyPage from './pages/auth/SurveyTendencyPage'
import SurveyFrequencyPage from './pages/auth/SurveyFrequencyPage'
import TermsPage from './pages/auth/TermsPage'
import EmailLoginPage from './pages/auth/EmailLoginPage'
import ProfileCompletePage from './pages/auth/ProfileCompletePage'

// 홈
import HomePage from './pages/home/HomePage'
import NotificationsPage from './pages/home/NotificationsPage'

// 번개 모임
import MeetupPage from './pages/meetup/MeetupPage'
import MeetupDetailPage from './pages/meetup/MeetupDetailPage'
import MeetupApplyPage from './pages/meetup/MeetupApplyPage'
import MeetupCreatePage from './pages/meetup/MeetupCreatePage'
import MyMeetupsPage from './pages/meetup/MyMeetupsPage'
import MeetupManagePage from './pages/meetup/MeetupManagePage'
import MeetupFinishPage from './pages/meetup/MeetupFinishPage'
import RecruitingDetailPage from './pages/meetup/RecruitingDetailPage'
import HostDetailPage from './pages/meetup/HostDetailPage'
import ParticipantProfilePage from './pages/meetup/ParticipantProfilePage'

// 운동
import WorkoutPage from './pages/workout/WorkoutPage'
import WorkoutSessionPage from './pages/workout/WorkoutSessionPage'
import WorkoutCompletePage from './pages/workout/WorkoutCompletePage'
import WorkoutManagePage from './pages/workout/WorkoutManagePage'
import WorkoutRecordPage from './pages/workout/WorkoutRecordPage'
import WorkoutTogetherCapReadyPage from './pages/workout/WorkoutTogetherCapReadyPage'
import WorkoutTogetherMemReadyPage from './pages/workout/WorkoutTogetherMemReadyPage'
import WorkoutTogetherSessionPage from './pages/workout/WorkoutTogetherSessionPage'

// 챌린지
import ChallengePage from './pages/challenge/ChallengePage'
import EventDetailPage from './pages/challenge/EventDetailPage'

// 마이페이지
import MyPage from './pages/my/MyPage'
import ProfilePage from './pages/my/ProfilePage'
import SettingsPage from './pages/my/SettingsPage'

const noNavPaths = [
  '/auth/login', '/auth/email-login', '/auth/signup', '/auth/phone',
  '/auth/onboarding/region', '/auth/survey/goal', '/auth/survey/tendency',
  '/auth/onboarding/sports', '/auth/survey/frequency', '/auth/onboarding/time', '/auth/onboarding/bio',
  '/auth/complete', '/auth/terms', '/workout/session', '/workout/complete',
  '/home/notifications', '/profile/view', '/workout/record',
  '/meetup/my', '/meetup/detail', '/meetup/recruiting', '/meetup/host', '/meetup/manage', '/meetup/finish',
  '/workout/together/cap-ready', '/workout/together/mem-ready', '/workout/together/session',
]

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen pb-20 bg-fig">
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" replace />} />

          {/* Auth */}
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/email-login" element={<EmailLoginPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route path="/auth/phone" element={<PhoneVerifyPage />} />
          <Route path="/auth/onboarding/region" element={<OnboardingRegionPage />} />
          <Route path="/auth/survey/goal" element={<SurveyGoalPage />} />
          <Route path="/auth/survey/tendency" element={<SurveyTendencyPage />} />
          <Route path="/auth/onboarding/sports" element={<OnboardingSportsPage />} />
          <Route path="/auth/survey/frequency" element={<SurveyFrequencyPage />} />
          <Route path="/auth/onboarding/time" element={<OnboardingTimePage />} />
          <Route path="/auth/onboarding/bio" element={<OnboardingBioPage />} />
          <Route path="/auth/complete" element={<ProfileCompletePage />} />
          <Route path="/auth/terms" element={<TermsPage />} />

          {/* 홈 */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/home/notifications" element={<NotificationsPage />} />

          {/* 번개 모임 */}
          <Route path="/meetup" element={<MeetupPage />} />
          <Route path="/meetup/detail" element={<MeetupDetailPage />} />
          <Route path="/meetup/apply" element={<MeetupApplyPage />} />
          <Route path="/meetup/create" element={<MeetupCreatePage />} />
          <Route path="/meetup/my" element={<MyMeetupsPage />} />
          <Route path="/meetup/manage" element={<MeetupManagePage />} />
          <Route path="/meetup/finish" element={<MeetupFinishPage />} />
          <Route path="/meetup/recruiting" element={<RecruitingDetailPage />} />
          <Route path="/meetup/host" element={<HostDetailPage />} />
          <Route path="/profile/view" element={<ParticipantProfilePage />} />

          {/* 운동 */}
          <Route path="/workout" element={<WorkoutPage />} />
          <Route path="/workout/session" element={<WorkoutSessionPage />} />
          <Route path="/workout/complete" element={<WorkoutCompletePage />} />
          <Route path="/workout/manage" element={<WorkoutManagePage />} />
          <Route path="/workout/record" element={<WorkoutRecordPage />} />
          <Route path="/workout/together/cap-ready" element={<WorkoutTogetherCapReadyPage />} />
          <Route path="/workout/together/mem-ready" element={<WorkoutTogetherMemReadyPage />} />
          <Route path="/workout/together/session" element={<WorkoutTogetherSessionPage />} />

          {/* 챌린지 */}
          <Route path="/challenge" element={<ChallengePage />} />
          <Route path="/challenge/event" element={<EventDetailPage />} />

          {/* 마이페이지 */}
          <Route path="/my" element={<MyPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/my/settings" element={<SettingsPage />} />
        </Routes>
        <BottomNav hiddenPaths={noNavPaths} />
      </div>
    </BrowserRouter>
  )
}
