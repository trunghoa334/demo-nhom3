import styles from "./select-component.module.scss"
import classNames from "classnames/bind"
import { Controller, Control, FieldErrors } from "react-hook-form"
import { Col, FormGroup, Label } from "reactstrap"
import { Select as BaseSelect } from "~/app/ui/select/select"

const cx = classNames.bind(styles)

interface SelectComponentProps {
  name: string
  label?: string
  control?: Control<any>
  errors?: FieldErrors
  data?: { value: string; label: string }[]
  optionDefault?: string
  horizontal?: boolean
  colLabel?: number
  colInput?: number
  removeMarginBottom?: boolean
  className?: string
}

export default function SelectComponent({
  name,
  label,
  control,
  errors,
  data,
  optionDefault,
  horizontal = false,
  colLabel = 3,
  colInput = 9,
  removeMarginBottom = false,
  className,
  ...props
}: SelectComponentProps) {
  const errorMessage =
    errors?.[name] && typeof errors?.[name]?.message === "string"
      ? (errors[name]?.message as string)
      : undefined

  return (
    <FormGroup row={horizontal} className={cx({ noMarginBottom: removeMarginBottom })}>
      {label && (
        <Col lg={horizontal ? colLabel : 12} className="d-flex gap-2 align-items-center">
          <Label for={name}>{label}</Label>
        </Col>
      )}

      <Col lg={horizontal ? colInput : 12}>
        {control ? (
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <BaseSelect
                {...field}
                {...props}
                id={name}
                data={data}
                optionDefault={optionDefault}
                error={errorMessage}
                className={className}
              />
            )}
          />
        ) : (
          <BaseSelect
            {...props}
            id={name}
            data={data}
            optionDefault={optionDefault}
            error={errorMessage}
            className={className}
          />
        )}
      </Col>
    </FormGroup>
  )
}
