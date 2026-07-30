interface IntegrationSettingRowProps {
  title: string;
  description: string;
  enabled: boolean;
  disabled: boolean;
  onToggle: () => void;
}

export default function IntegrationSettingRow({
  title,
  description,
  enabled,
  disabled,
  onToggle,
}: IntegrationSettingRowProps) {
  return (
    <div className="flex h-[78px] items-center justify-between px-4">
      <div>
        <p className="text-body tracking-[-0.41px] text-black">{title}</p>
        <p className="mt-1 text-xs leading-[14px] text-grey-500">{description}</p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label={title}
        disabled={disabled}
        onClick={onToggle}
        className={[
          'relative h-[22px] w-[58px] rounded-full transition-colors',
          enabled ? 'bg-main-500' : 'bg-grey-200',
          disabled ? 'cursor-not-allowed' : '',
        ].join(' ')}
      >
        <span
          className={[
            'absolute top-0.5 h-[18px] w-[30px] rounded-full bg-white transition-transform',
            enabled ? 'translate-x-[26px]' : 'translate-x-0.5',
          ].join(' ')}
        />
      </button>
    </div>
  );
}
