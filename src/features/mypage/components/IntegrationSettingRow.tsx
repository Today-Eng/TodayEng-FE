import ToggleSwitch from '@/features/mypage/components/ToggleSwitch';

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

      <ToggleSwitch checked={enabled} label={title} disabled={disabled} onChange={onToggle} />
    </div>
  );
}
