import * as React from "react"
import styles from "./input.module.scss"
import classNames from "classnames/bind"

const cx = classNames.bind(styles)

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
  rightIcon?: boolean
  floating?: boolean
  className?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, rightIcon = false, floating = false, className, ...props }, ref) => {
    const inputClass = cx("formControl", { rightIcon }, className)

    if (floating) {
      return (
        <div className={cx("floating", { active: props.value })}>
          <input ref={ref} {...props} className={cx("formControl")} />
          <label htmlFor={props.id}>{label}</label>
        </div>
      )
    }

    if (icon) {
      return (
        <div className={cx("formIcon", { rightIcon })}>
          {icon}
          <input ref={ref} {...props} className={inputClass} />
        </div>
      )
    }

    return (
      <div className="d-flex flex-column gap-1">
        {label && !floating && <label htmlFor={props.id}>{label}</label>}
        <input ref={ref} {...props} className={inputClass} />
        {error && <span className={cx("titleError")}>{error}</span>}
      </div>
    )
  }
)

Input.displayName = "Input"
