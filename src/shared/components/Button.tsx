interface ButtonProps {
  label: string
  type?: 'main' | 'sub'
  disabled?: boolean
  onClick: () => void
}

const styles = {
  main: 'bg-main-500 text-white',
  sub: 'bg-gray-100 text-gray-700',
}

export default function Button({ label, type = 'main', disabled = false, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-4 rounded-[100px] text-headline font-semibold ${styles[type]} disabled:bg-gray-300 disabled:cursor-not-allowed`}
    >
      {label}
    </button>
  )
}
