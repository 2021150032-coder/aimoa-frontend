type Props = {
  suggestions: string[];
  onSelect: (value: string) => void;
};

export default function SuggestionChips({
  suggestions,
  onSelect,
}: Props) {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-3">
      {suggestions.map((item) => (
        <button
          key={item}
          onClick={() => onSelect(item)}
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
        >
          {item}
        </button>
      ))}
    </div>
  );
}