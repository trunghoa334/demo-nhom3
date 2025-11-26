/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./textarea-component.module.scss"
import classNames from "classnames/bind"
import { Control, Controller, FieldErrors } from "react-hook-form"
import { FormGroup, Label } from "reactstrap"
import { Textarea as BaseTextarea } from "~/app/ui/textarea/textarea"

const cx = classNames.bind(styles)

interface TextareaComponentProps {
  label?: string
  name: string
  control: Control<any>
  errors: FieldErrors
  disabled?: boolean
  className?: string
}

export default function TextareaComponent({
  label,
  name,
  control,
  errors,
  disabled,
  className,
  ...props
}: TextareaComponentProps) {
  const errorMessage =
    errors?.[name] && typeof errors?.[name]?.message === "string"
      ? (errors[name]?.message as string)
      : undefined

  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <BaseTextarea
            {...field}
            {...props}
            id={name}
            label={undefined} // label render ở ngoài
            error={errorMessage}
            disabled={disabled}
            className={cx("textarea", { disabled }, className)}
          />
        )}
      />
    </FormGroup>
  )
}
