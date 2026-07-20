export interface AITool {
  id: string;
  name: string;
  description: string;
  price: "무료" | "부분무료" | "유료";
  homepage: string;
  logo: string;
  category: string;
  difficulty: "입문" | "중급" | "고급";
  rating: number;
  tags: string[];
}