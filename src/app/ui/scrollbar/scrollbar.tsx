import * as React from "react"
import styles from "./scrollbar.module.scss"
import classNames from "classnames/bind"

const cx = classNames.bind(styles)

export interface ScrollbarProps {
  children: React.ReactNode
  height?: string | number
  className?: string
}

export const Scrollbar: React.FC<ScrollbarProps> = ({
  children,
  height = "100vh",
  className,
}) => {
  return (
    <div
      className={cx("customScroll", className)}
      style={{ maxHeight: height }}
    >
      {children}
    </div>
  )
}
