// 1. 사용할 타입을 먼저 선언해 줍니다.
export interface WorkflowStep {
  order: number;
  toolName: string;
  toolLogo?: string;
  description: string;
}

export interface Workflow {
  id: string;
  title: string;
  description: string;
  category: string;
  steps: WorkflowStep[];
}

// 2. 위에서 만든 Workflow 타입을 사용해 데이터를 작성합니다. (import 불필요)
export const workflows: Workflow[] = [
  {
    id: "youtube-shorts",
    title: "유튜브 쇼츠 만들기",
    description: "기획부터 편집, 썸네일까지 쇼츠 하나를 완성하는 흐름이에요.",
    category: "영상",
    steps: [
      { order: 1, toolName: "ChatGPT", description: "주제 기획 및 대본 작성" },
      { order: 2, toolName: "ElevenLabs", description: "대본을 AI 음성으로 변환" },
      { order: 3, toolName: "CapCut", description: "자동 자막 + 컷편집" },
      { order: 4, toolName: "Canva AI", description: "썸네일 디자인" },
    ],
  },
  {
    id: "blog-writing",
    title: "블로그 글 자동 작성",
    description: "주제만 정하면 초안부터 다듬기까지 도와주는 흐름이에요.",
    category: "글쓰기",
    steps: [
      { order: 1, toolName: "ChatGPT", description: "주제 분석 및 목차 구성" },
      { order: 2, toolName: "Claude", description: "본문 초안 작성 및 문체 다듬기" },
      { order: 3, toolName: "Canva AI", description: "대표 이미지 제작" },
    ],
  },
  {
    id: "paper-summary",
    title: "논문 찾고 요약하기",
    description: "관련 논문 탐색부터 핵심 요약까지 빠르게 끝내는 흐름이에요.",
    category: "학습",
    steps: [
      { order: 1, toolName: "Perplexity", description: "관련 논문 검색 및 출처 확인" },
      { order: 2, toolName: "Claude", description: "긴 논문 요약 및 핵심 정리" },
      { order: 3, toolName: "ChatGPT", description: "이해 안 되는 부분 질문/설명" },
    ],
  },
];