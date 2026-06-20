interface Props {
  current: number
  total?: number
}

export default function StepBar({ current, total = 9 }: Props) {
  return (
    <div className="px-5 mb-6">
      <div className="flex gap-1">
        {Array.from({ length: total }, (_, i) => (
          <div key={i} className={`flex-1 h-1 rounded-full ${i < current ? 'bg-lime' : 'bg-white/10'}`} />
        ))}
      </div>
      <p className="text-xs text-white/30 mt-2">{current} / {total} 단계</p>
    </div>
  )
}
