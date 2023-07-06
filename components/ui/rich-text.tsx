export const DefaultRichTextComponents = {
  br: () => <br />,
  b: (text) => <strong>{text}</strong>,
  red: (text) => (
    <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text font-bold tracking-tight text-transparent dark:from-red-200 dark:to-red-400">
      {text}
    </span>
  ),
  green: (text) => (
    <span className="bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text font-bold tracking-tight text-transparent dark:from-green-200 dark:to-green-400">
      {text}
    </span>
  ),
  gradient: (text) => (
    <span className="bg-gradient-to-r from-yellow-500 to-indigo-500 bg-clip-text font-bold tracking-tight text-transparent dark:from-amber-200 dark:to-sky-400">
      {text}
    </span>
  ),
}
