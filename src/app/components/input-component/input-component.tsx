/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./input-component.module.scss"
import classNames from "classnames/bind"
import { Controller, Control, FieldErrors, ControllerRenderProps } from "react-hook-form"
import { Col, FormGroup } from "reactstrap"
import { ReactNode } from "react"
import { Input as BaseInput } from "~/app/ui/input/input"

const cx = classNames.bind(styles)

interface InputComponentProps {
  label?: string
  name: string
  control?: Control<any>
  errors?: FieldErrors
  icon?: ReactNode
  rightIcon?: boolean
  floating?: boolean
  borderStyle?: boolean
  horizontal?: boolean
  labelIcon?: ReactNode
  colLabel?: number
  colInput?: number
  removeMarginBottom?: boolean
  type?: string
  className?: string
}

export default function InputComponent({
  label,
  name,
  control,
  errors,
  icon,
  rightIcon = false,
  floating = false,
  borderStyle = false,
  horizontal = false,
  labelIcon,
  colLabel = 3,
  colInput = 9,
  removeMarginBottom = false,
  type,
  className,
  ...props
}: InputComponentProps) {
  const errorMessage =
    errors?.[name] && typeof errors?.[name]?.message === "string"
      ? (errors[name]?.message as string)
      : undefined

  const renderInput = (field?: ControllerRenderProps<any, string>) => (
    <BaseInput
      {...field}
      {...props}
      id={name}
      label={floating ? label : undefined}
      error={errorMessage}
      icon={icon}
      rightIcon={rightIcon}
      floating={floating}
      className={cx("formControl", { borderStyle, rightIcon }, className)}
      type={type}
    />
  )

  return (
    <FormGroup row={horizontal} className={cx({ noMarginBottom: removeMarginBottom })}>
      {!floating && label && (
        <Col lg={horizontal ? colLabel : 12} className="d-flex gap-2 align-items-center">
          <label htmlFor={name} className={cx("bold")}>{label}</label>
          {labelIcon}
        </Col>
      )}

      <Col lg={horizontal ? colInput : 12}>
        {control ? (
          <div style={horizontal ? { flex: 1 } : {}}>
            <Controller name={name} control={control} render={({ field }) => renderInput(field)} />
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            {renderInput()}
          </div>
        )}
      </Col>
    </FormGroup>
  )
}
