/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./switches-component.module.scss"
import classNames from "classnames/bind"
import { FormGroup, Label } from "reactstrap"
import { Control, Controller, ControllerRenderProps, FieldErrors } from "react-hook-form"
import { Switch as BaseSwitch } from "~/app/ui/switch/switch"

const cx = classNames.bind(styles)

interface SwitchComponentProps {
  label?: string
  name: string
  control: Control<any>
  errors: FieldErrors
  useNumberCheck?: boolean
  className?: string
}

export default function Switches({
  label,
  name,
  control,
  errors,
  useNumberCheck = false,
  className,
  ...props
}: SwitchComponentProps) {
  const errorMessage =
    errors?.[name] && typeof errors?.[name]?.message === "string"
      ? (errors[name]?.message as string)
      : undefined

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, field: ControllerRenderProps<any, string>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      field.onChange(useNumberCheck ? (field.value === 1 ? 0 : 1) : !field.value)
    }
  }

  return (
    <FormGroup switch>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <BaseSwitch
            {...field}
            {...props}
            id={name}
            label={label}
            error={errorMessage}
            checked={useNumberCheck ? field.value === 1 : field.value}
            onChange={(e) =>
              field.onChange(useNumberCheck ? (e.target.checked ? 1 : 0) : e.target.checked)
            }
            onKeyDown={(e) => handleKeyDown(e, field)}
            className={cx("switch", className)}
          />
        )}
      />
      {label && <Label for={name}>{label}</Label>}
    </FormGroup>
  )
}
