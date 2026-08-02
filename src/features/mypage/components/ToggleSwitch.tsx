interface ToggleSwitchProps {
  checked: boolean;
  label: string;
  disabled?: boolean;
  onChange: () => void;
}

export default function ToggleSwitch({
  checked,
  label,
  disabled = false,
  onChange,
}: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={onChange}
      className={[
        'relative h-[22px] w-[58px] shrink-0 rounded-full transition-colors',
        checked ? 'bg-main-500' : 'bg-grey-200',
        disabled ? 'cursor-not-allowed' : '',
      ].join(' ')}
    >
      <span
        aria-hidden="true"
        className={[
          'absolute left-0.5 top-0.5 h-[18px] w-[30px] rounded-full bg-white transition-transform',
          checked ? 'translate-x-6' : 'translate-x-0',
        ].join(' ')}
      />
    </button>
  );
}
