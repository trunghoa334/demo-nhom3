import * as React from "react"
import styles from "./textarea.module.scss"
import classNames from "classnames/bind"

const cx = classNames.bind(styles)

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  className?: string
  disabled?: boolean
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, disabled, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && <label htmlFor={props.id}>{label}</label>}
        <textarea
          ref={ref} 
          {...props}
          disabled={disabled}
          className={cx("textarea", { disabled }, className)}
        />
        {error && <span className={cx("titleError")}>{error}</span>}
      </div>
    )
  }
)

// thêm displayName để dễ debug
Textarea.displayName = "Textarea"
