import * as React from "react"
import styles from "./switch.module.scss"
import classNames from "classnames/bind"

const cx = classNames.bind(styles)

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  useNumberCheck?: boolean
  className?: string
}

export const Switch: React.FC<SwitchProps> = ({
  label,
  error,
  useNumberCheck = false,
  className,
  ...props
}) => {
  return (
    <div className="flex items-center gap-2">
      <input
        {...props}
        type="checkbox"
        className={cx("switch", className)}
      />
      {label && <label htmlFor={props.id}>{label}</label>}
      {error && <span className={cx("titleError")}>{error}</span>}
    </div>
  )
}
