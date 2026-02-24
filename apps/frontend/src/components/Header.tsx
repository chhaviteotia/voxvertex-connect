import { Link } from 'react-router-dom'
import { Logo } from './Logo'

export function Header() {
  return (
    <header className="bg-white py-4 border-b border-gray-200">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        <Logo variant="header" to="/" />
        <nav className="flex items-center gap-8">
          <a href="#businesses" className="text-gray-800 text-[15px] font-medium no-underline hover:text-gray-600">For Businesses</a>
          <a href="#experts" className="text-gray-800 text-[15px] font-medium no-underline hover:text-gray-600">For Experts</a>
          <a href="#features" className="text-gray-800 text-[15px] font-medium no-underline hover:text-gray-600">Pricing</a>
        </nav>
        <div className="flex items-center gap-6">
          <Link to="/signin" className="text-gray-800 text-[15px] font-medium no-underline hover:text-gray-600">Log in</Link>
          <Link to="/signup" className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#008C9E] text-white text-[15px] font-medium no-underline hover:opacity-90">Get Started</Link>
        </div>
      </div>
    </header>
  )
}
