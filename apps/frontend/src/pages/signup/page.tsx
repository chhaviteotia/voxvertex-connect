import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Logo } from '../../components/Logo'

type Role = 'business' | 'expert'

export function SignupPage() {
  const [role, setRole] = useState<Role>('business')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const trimmedName = fullName.trim()
    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()
    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      setError('Please fill in Full Name, Email, and Password.')
      return
    }
    if (role === 'business') {
      navigate('/signup/business', {
        state: { contactName: trimmedName, email: trimmedEmail, password: trimmedPassword },
      })
    } else {
      navigate('/signup/expert', {
        state: { name: trimmedName, email: trimmedEmail, password: trimmedPassword },
      })
    }
  }

  return (
    <div className="min-h-screen bg-[#F0F4F7] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-6">
          <Logo to="/" variant="header" className="mb-6" />
          <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-500 text-sm mt-1">Get started in minutes.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">I am a</label>
            <div className="space-y-2">
              <label
                onClick={() => setRole('business')}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${
                  role === 'business' ? 'border-gray-800 bg-gray-50' : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span className={`w-2 h-2 rounded-full shrink-0 ${role === 'business' ? 'bg-gray-900' : 'bg-transparent border border-gray-300'}`} />
                <span className={role === 'business' ? 'font-semibold text-gray-900' : 'text-gray-700'}>
                  Business Looking for experts
                </span>
              </label>
              <label
                onClick={() => setRole('expert')}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${
                  role === 'expert' ? 'border-gray-800 bg-gray-50' : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span className={`w-2 h-2 rounded-full shrink-0 ${role === 'expert' ? 'bg-gray-900' : 'bg-transparent border border-gray-300'}`} />
                <span className={role === 'expert' ? 'font-semibold text-gray-900' : 'text-gray-700'}>
                  Expert Offering services
                </span>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-800 mb-1.5">Full Name</label>
            <input
              id="fullName"
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1.5">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-1.5">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[#20B2AA] text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-5">
          Already have an account?{' '}
          <Link to="/signin" className="text-[#2196F3] font-medium no-underline hover:underline">
            Log in
          </Link>
        </p>

        <div className="border-t border-gray-200 mt-6 pt-6">
          <Link to="/" className="inline-flex items-center gap-1.5 text-gray-600 text-sm no-underline hover:text-gray-800">
            <span aria-hidden>←</span>
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
