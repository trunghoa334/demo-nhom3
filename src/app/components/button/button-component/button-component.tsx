import classNames from "classnames/bind"
import styles from "./button-component.module.scss"
import { MouseEvent, ReactNode, useState } from "react"
import { Button as BaseButton } from "~/app/ui/button/button"
import { Spinner } from "reactstrap"
import { useTranslation } from "react-i18next"

const cx = classNames.bind(styles)

interface ButtonComponentProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode | string
  soft?: boolean
  outline?: boolean
  isLoading?: boolean
}

export default function ButtonComponent({
  children,
  soft,
  outline,
  isLoading,
  className,
  disabled,
  ...props
}: ButtonComponentProps) {
  const [glows, setGlows] = useState<{ id: number; x: number; y: number }[]>([])
  const { t } = useTranslation()

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const newGlow = { id: Date.now(), x, y }
    setGlows((prev) => [...prev, newGlow])

    setTimeout(() => {
      setGlows((prev) => prev.filter((g) => g.id !== newGlow.id))
    }, 300)

    if (props.onClick) props.onClick(event)
  }

  return (
    <BaseButton
      {...props}
      onClick={handleClick}
      soft={soft}
      outline={outline}
      isLoading={isLoading}
      className={cx("btn", className)}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <div className={cx("loading")}>
          <Spinner />
          <span>{t("Loading")}...</span>
        </div>
      ) : (
        children
      )}
      {glows.map((glow) => (
        <span
          key={glow.id}
          className={cx("glowEffect")}
          style={{ top: glow.y, left: glow.x }}
        />
      ))}
    </BaseButton>
  )
}
