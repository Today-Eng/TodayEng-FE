import type { JSX } from "react"
import { NavLink } from "react-router-dom"

import HomeIcon from "./icons/HomeIcon"
import RetrospectIcon from "./icons/RetrospectIcon"
import MyPageIcon from "./icons/MypageIcon"

interface NavIconProps {
  className?: string
  active?: boolean
}

interface NavItemProps {
  to: string
  label: string
  Icon: (props: NavIconProps) => JSX.Element
}

function NavItem({
  to,
  label,
  Icon,
}: NavItemProps) {
  return (
    <NavLink
      to={to}
      className="flex flex-1 flex-col items-center justify-center gap-3 mb-1"
    >
      {({ isActive }) => (
        <>
          <Icon
            active={isActive}
          />

          <span
            className={[
              "text-footnote",
              isActive
                ? "font-normal text-main-500"
                : "font-normal text-grey-400",
            ].join(" ")}
          >
            {label}
          </span>
        </>
      )}
    </NavLink>
  )
}

export default function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 mx-auto h-[75px] w-full max-w-[402px] border-t border-grey-100 bg-white">
      <div className="grid h-full grid-cols-3 gap-[10px] px-3 pt-3">
        <NavItem
          to="/home"
          label="홈"
          Icon={HomeIcon}
        />

        <NavItem
          to="/"
          label="회고록"
          Icon={RetrospectIcon}
        />

        <NavItem
          to="/mypage"
          label="마이페이지"
          Icon={MyPageIcon}
        />
      </div>
    </nav>
  )
}