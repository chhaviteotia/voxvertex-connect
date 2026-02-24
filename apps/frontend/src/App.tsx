import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { HeroSection } from './components/hero/HeroSection'
import { ServicesSection } from './components/services/ServicesSection'
import { HowItWorksSection } from './components/how-it-works/HowItWorksSection'
import { MatchingProcessSection } from './components/matching/MatchingProcessSection'
import { Footer } from './components/Footer'
import { SignInPage } from './pages/SignInPage'
import { SignupPage } from './pages/signup/page'
import { BusinessSignupPage } from './pages/signup/BusinessSignupPage'
import { ExpertSignupPage } from './pages/signup/ExpertSignupPage'
import { Dashboard } from './pages/business/Dashboard'
import { PostRequirement } from './pages/business/PostRequirement'
import { MyListings } from './pages/business/MyListings'
import { Proposals } from './pages/business/Proposals'
import { Messages } from './pages/business/Messages'
import { Settings } from './pages/business/Settings'
import { ExpertDashboard } from './pages/expert/Dashboard'
import { ExpertProposals } from './pages/expert/Proposals'
import { ExpertBrowse } from './pages/expert/Browse'
import { ExpertProfile } from './pages/expert/Profile'
import { ExpertEarnings } from './pages/expert/Earnings'
import { ExpertSettings } from './pages/expert/Settings'

function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-600">
      <Header />
      <main className="max-w-[1200px] mx-auto w-full">
        <HeroSection />
        <section className="max-w-3xl mx-auto py-16 px-6 text-center" id="features">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight mb-2">Find the Right Type of Expert</h2>
          <p className="text-lg text-gray-600">Choose the engagement model that fits your needs</p>
        </section>
        <ServicesSection />
        <HowItWorksSection />
        <MatchingProcessSection />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signup/business" element={<BusinessSignupPage />} />
        <Route path="/signup/expert" element={<ExpertSignupPage />} />
        <Route path="/join-expert" element={<ExpertSignupPage />} />
        <Route path="/business/dashboard" element={<Dashboard />} />
        <Route path="/business/post-requirement" element={<PostRequirement />} />
        <Route path="/business/listings" element={<MyListings />} />
        <Route path="/business/proposals" element={<Proposals />} />
        <Route path="/business/messages" element={<Messages />} />
        <Route path="/business/settings" element={<Settings />} />
        <Route path="/expert/dashboard" element={<ExpertDashboard />} />
        <Route path="/expert/proposals" element={<ExpertProposals />} />
        <Route path="/expert/browse" element={<ExpertBrowse />} />
        <Route path="/expert/profile" element={<ExpertProfile />} />
        <Route path="/expert/earnings" element={<ExpertEarnings />} />
        <Route path="/expert/settings" element={<ExpertSettings />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
