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
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
            <Bot size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-black text-slate-900">
              AI Compass
            </h1>
            <p className="text-sm text-slate-500">
              Discover the best AI tools
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-10 text-lg">
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

        <div className="flex items-center gap-5">
          <NavLink
            to="/login"
            className="text-lg text-slate-600 transition hover:text-blue-600"
          >
            Login
          </NavLink>

          <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-700">
            <Sparkles size={18} />
            AI 추천받기
          </button>
        </div>
      </div>
    </header>
  );
}