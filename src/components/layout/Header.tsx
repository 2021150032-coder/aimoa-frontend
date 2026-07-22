import { Link, NavLink } from "react-router-dom";
import { Bot, Sparkles } from "lucide-react";

export default function Header() {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    `transition ${
      isActive
        ? "font-semibold text-slate-900"
        : "text-slate-600 hover:text-blue-600"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg sm:h-12 sm:w-12 sm:rounded-2xl">
            <Bot size={20} className="sm:hidden" />
            <Bot size={24} className="hidden sm:block" />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-lg font-black text-slate-900 sm:text-2xl">
              AI Compass
            </h1>
            <p className="hidden truncate text-sm text-slate-500 sm:block">
              Discover the best AI tools
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-10 text-lg md:flex">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>

          <NavLink to="/search" className={navClass}>
            Search
          </NavLink>

          <NavLink to="/compare" className={navClass}>
            Compare
          </NavLink>
        </nav>

        <div className="flex flex-shrink-0 items-center gap-2 sm:gap-5">
          <NavLink
            to="/login"
            className="hidden text-lg text-slate-600 transition hover:text-blue-600 sm:block"
          >
            Login
          </NavLink>

          <button className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-700 sm:gap-2 sm:px-5 sm:py-3 sm:text-base">
            <Sparkles size={16} className="sm:hidden" />
            <Sparkles size={18} className="hidden sm:block" />
            <span className="hidden sm:inline">AI 추천받기</span>
            <span className="sm:hidden">AI 추천</span>
          </button>
        </div>
      </div>

      {/* 모바일 전용 하단 네비게이션 */}
      <nav className="flex items-center justify-around border-t border-slate-100 py-2 text-sm md:hidden">
        <NavLink to="/" className={navClass}>
          Home
        </NavLink>
        <NavLink to="/search" className={navClass}>
          Search
        </NavLink>
        <NavLink to="/compare" className={navClass}>
          Compare
        </NavLink>
        <NavLink to="/login" className={navClass}>
          Login
        </NavLink>
      </nav>
    </header>
  );
}