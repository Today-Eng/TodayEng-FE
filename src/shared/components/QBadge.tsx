type QBadgeVariant = 'pink' | 'grey'

const gradients: Record<QBadgeVariant, string> = {
  pink: 'linear-gradient(to bottom, #F57BBA, #EE2A91)',
  grey: 'linear-gradient(to bottom, #4B5565, #364152)',
}

interface QBadgeProps {
  variant?: QBadgeVariant
}

export default function QBadge({ variant = 'pink' }: QBadgeProps) {
  return (
    <div
      className="text-subheadline text-white flex justify-center w-5 h-5 rounded-[4px]"
      style={{ background: gradients[variant] }}
    >
      Q
    </div>
  )
}
