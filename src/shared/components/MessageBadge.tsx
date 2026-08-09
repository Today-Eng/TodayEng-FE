type MessageBadgeType = 'Q' | 'A'
type QVariant = 'pink' | 'grey'

const qGradients: Record<QVariant, string> = {
  pink: 'linear-gradient(to bottom, #F57BBA, #EE2A91)',
  grey: 'linear-gradient(to bottom, #4B5565, #364152)',
}

const aGradient = 'linear-gradient(to bottom, #A487D4, #774CBE)'

interface MessageBadgeProps {
  type: MessageBadgeType
  variant?: QVariant
}

export default function MessageBadge({ type, variant = 'pink' }: MessageBadgeProps) {
  const background = type === 'Q' ? qGradients[variant] : aGradient

  return (
    <div
      className="text-subheadline leading-none text-white grid place-items-center w-5 h-5 shrink-0 rounded-[4px]"
      style={{ background }}
    >
      {type}
    </div>
  )
}