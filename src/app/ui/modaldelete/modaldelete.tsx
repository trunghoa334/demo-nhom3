import * as React from "react"
import styles from "./modal-delete.module.scss"
import classNames from "classnames/bind"

const cx = classNames.bind(styles)

export interface ModalDeleteProps {
  show?: boolean
  title?: string
  subtitle?: string
  recordId?: string
  error?: string
  onClose?: () => void
  onConfirm?: () => void
}

export const ModalDelete: React.FC<ModalDeleteProps> = ({
  show,
  title,
  subtitle,
  recordId,
  error,
  onClose,
  onConfirm,
}) => {
  if (!show) return null

  return (
    <div className={cx("modalOverlay")}>
      <div className={cx("modalBody")}>
        <div className={cx("modalHeader")}>
          <span onClick={onClose} className={cx("closeBtn", "ri-close-large-line")} />
        </div>
        {error && <span className="titleError">{error}</span>}
        <div className="mt-2 text-center">
          <lord-icon
            src="https://cdn.lordicon.com/hwjcdycb.json"
            trigger="loop"
            delay="500"
            colors="primary:#f7b84b,secondary:#f06548"
            style={{ width: "100px", height: "100px" }}
          ></lord-icon>
          <div className={cx("modalBodyHeadTitle")}>
            <h4>{title}</h4>
            <p className={cx("textColor")}>
              {subtitle} {recordId ? recordId : ""} ?
            </p>
          </div>
        </div>
        <div className={cx("modalFooter")}>
          <button type="button" className={cx("btn")} onClick={onClose}>
            Close
          </button>
          <button type="button" className={cx("btn", "danger")} onClick={onConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  )
}
