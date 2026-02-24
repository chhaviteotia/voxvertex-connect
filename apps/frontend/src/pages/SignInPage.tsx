import { Link } from 'react-router-dom'
import { Logo } from '../components/Logo'

export function SignInPage() {
  return (
    <div className="min-h-screen bg-[#F0F4F7] font-sans text-gray-600 flex flex-col">
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          <div className="flex flex-col items-center text-center mb-8">
            <Logo to="/" variant="header" className="mb-6" />
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight mb-1">Welcome Back</h1>
            <p className="text-sm text-gray-500">Log in to your account</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@company.com"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2293B4] focus:border-transparent bg-white"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-gray-800">
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm font-medium no-underline hover:underline" style={{ color: '#2293B4' }}>
                  Forgot?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2293B4] focus:border-transparent bg-white"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg text-white font-semibold text-base focus:outline-none focus:ring-2 focus:ring-[#2293B4] focus:ring-offset-2 transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#2293B4' }}
            >
              Log In
            </button>
          </form>

          <p className="mt-6 text-center text-[15px] text-gray-600">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="font-medium no-underline hover:underline" style={{ color: '#2293B4' }}>
              Sign up
            </Link>
          </p>

          <div className="border-t border-gray-200 mt-6 pt-6">
            <Link to="/" className="inline-flex items-center gap-1.5 text-gray-600 text-sm no-underline hover:text-gray-800">
              <span aria-hidden>←</span> Back to home
            </Link>
          </div>
        </div>
      </main>

      <footer className="py-4 px-6">
        <p className="text-sm text-gray-400">
          <Link to="/privacy" className="text-gray-400 no-underline hover:text-gray-600">Manage cookies or opt out</Link>
        </p>
      </footer>
    </div>
  )
}
