import { useState } from "react"
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap"
import styles from "./more-dropdown-component.module.scss"
import classNames from "classnames/bind"
import { useTranslation } from "react-i18next"

const cx = classNames.bind(styles)

interface MoreDropdownComponentProps {
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

export default function MoreDropdownComponent({ onView, onEdit, onDelete }: MoreDropdownComponentProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { t } = useTranslation()

  const toggle = () => setDropdownOpen((prev) => !prev)

  return (
    <Dropdown direction="down" isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle className={cx("moreDropdownToggle")}>
        <span>...</span>
      </DropdownToggle>
      <DropdownMenu className={cx("moreDropdownContain")} end>
        <DropdownItem className={cx("moreDropdownItem")} onClick={() => onView?.()}>
          <i className="ri-eye-fill"></i> {t("View")}
        </DropdownItem>
        <DropdownItem className={cx("moreDropdownItem")} onClick={() => onEdit?.()}>
          <i className="ri-edit-line"></i> {t("Edit")}
        </DropdownItem>
        <DropdownItem className={cx("moreDropdownItem")} onClick={() => onDelete?.()}>
          <i className="ri-delete-bin-6-line"></i> {t("Delete")}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
