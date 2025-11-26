import * as React from "react"
import styles from "./more-dropdown.module.scss"
import classNames from "classnames/bind"

const cx = classNames.bind(styles)

export interface MoreDropdownProps {
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

export const MoreDropdown: React.FC<MoreDropdownProps> = ({ onView, onEdit, onDelete }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <div className={cx("dropdownWrapper")}>
      <button
        type="button"
        className={cx("moreDropdownToggle")}
        onClick={() => setOpen(!open)}
      >
        <span>...</span>
      </button>
      {open && (
        <div className={cx("moreDropdownContain")}>
          <div className={cx("moreDropdownItem")} onClick={() => onView?.()}>
            <i className="ri-eye-fill"></i> View
          </div>
          <div className={cx("moreDropdownItem")} onClick={() => onEdit?.()}>
            <i className="ri-edit-line"></i> Edit
          </div>
          <div className={cx("moreDropdownItem")} onClick={() => onDelete?.()}>
            <i className="ri-delete-bin-6-line"></i> Delete
          </div>
        </div>
      )}
    </div>
  )
}
