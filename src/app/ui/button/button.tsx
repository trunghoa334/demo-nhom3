import * as React from "react"
import styles from "./button.module.scss"
import classNames from "classnames/bind"

const cx = classNames.bind(styles)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode | string
  soft?: boolean
  outline?: boolean
  isLoading?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  soft,
  outline,
  isLoading,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      {...props}
      className={cx("btn", className, { soft, outline })}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <div className={cx("loading")}>
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  )
}
