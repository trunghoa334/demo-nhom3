import * as React from "react"
import styles from "./skeleton.module.scss"
import classNames from "classnames/bind"

const cx = classNames.bind(styles)

export interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
  rounded?: boolean
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, rounded = false, ...props }) => {
  return (
    <span
      {...props}
      className={cx("skeleton", { rounded }, className)}
    />
  )
}
