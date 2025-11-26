import * as React from "react"
import styles from "./loading-overlay.module.scss"
import classNames from "classnames/bind"

const cx = classNames.bind(styles)

export interface LoadingOverlayProps {
  isLoading: boolean
  isClosing?: boolean
  loadingText?: React.ReactNode
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  isClosing = false,
  loadingText = "Loading...",
}) => {
  if (!isLoading) return null

  return (
    <div className={cx("loadingOverlay", { closing: isClosing })}>
      <div className={cx("wrapLoading")}>
        <div className={cx("loader")} />
        <div className={cx("loadingText")}>{loadingText}</div>
      </div>
    </div>
  )
}
