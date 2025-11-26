import * as React from "react"
import styles from "./select.module.scss"
import classNames from "classnames/bind"

const cx = classNames.bind(styles)

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  data?: { value: string; label: string }[]
  optionDefault?: string
  error?: string
  className?: string
}

export const Select: React.FC<SelectProps> = ({
  data,
  optionDefault,
  error,
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1">
      <select
        {...props}
        className={cx("select", className)}
        onChange={(e) => props.onChange?.(e)}
      >
        {optionDefault && <option value="">{optionDefault}</option>}
        {data?.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      {error && <span className={cx("titleError")}>{error}</span>}
    </div>
  )
}
