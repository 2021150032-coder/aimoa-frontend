import { useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";
import SuggestionChips from "./SuggestionChips";

const suggestions = [
  "쇼츠 만들기",
  "PPT 만들기",
  "AI 코딩",
  "논문 요약",
  "이미지 생성",
];

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-200/20 blur-3xl" />

      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 pt-10 pb-12 text-center sm:px-8 sm:pt-20 sm:pb-24">
        <div className="mb-5 rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-700">
          🚀 AI를 가장 쉽게 찾는 방법
        </div>

        <h1 className="text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Find the{" "}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Perfect AI
          </span>
          <br />
          for Every Task
        </h1>

        <p className="mt-4 text-base leading-7 text-slate-600 sm:mt-8 sm:text-2xl sm:leading-9">
          원하는 작업을 자연어로 입력하면
          <br />
          가장 적합한 AI 서비스와 워크플로우를 추천해드립니다.
        </p>

        <div className="mt-12 w-full max-w-4xl">
          <SearchBox />
        </div>

        <div className="mt-7">
          <SuggestionChips
            suggestions={suggestions}
            onSelect={(value) =>
              navigate(`/search?q=${encodeURIComponent(value)}`)
            }
          />
        </div>
      </div>
    </section>
  );
}