import MaterialIcon from '@/features/home/components/icons/MaterialIcon';
import type { MaterialIconType } from '@/features/home/components/icons/MaterialIcon';
import ArrowRightIcon from '@/shared/components/icons/ArrowRightIcon';

interface MaterialItemProps {
  icon?: MaterialIconType;
  src?: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}

export default function MaterialItem({
  icon,
  src,
  label,
  active,
  onClick,
}: MaterialItemProps) {
  const isClickable = Boolean(onClick);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!isClickable}
      className={[
        'flex min-h-8 items-center gap-2 rounded-full px-3 py-2',
        'text-subheadline font-semibold transition-colors',
        active
          ? 'bg-main-100 text-main-500'
          : 'bg-grey-50 text-grey-500',
        isClickable
          ? 'cursor-pointer'
          : 'cursor-default',
      ].join(' ')}
    >
      {src ? (
        <img
          src={src}
          alt=""
          className="h-5 w-5 shrink-0 object-contain"
        />
      ) : (
        icon && (
          <MaterialIcon
            type={icon}
            active={active}
          />
        )
      )}

      <span>{label}</span>

      {!active && isClickable && (
        <span
          aria-hidden="true"
          className="text-grey-500"
        >
          <ArrowRightIcon />
        </span>
      )}
    </button>
  );
}