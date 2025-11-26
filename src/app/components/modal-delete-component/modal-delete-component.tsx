import classNames from "classnames/bind"
import styles from "./modal-delete-component.module.scss"
import { Button, Modal, ModalBody } from "reactstrap"
import { useLang } from "~/app/hooks/use-lang"
import { CONFIG_LANG_KEY } from "~/app/configs/lang-key.config"

const cx = classNames.bind(styles)

interface ModalDeleteComponentProps {
  show?: boolean
  onDeleteClick?: () => void
  onCloseClick?: () => void
  recordId?: string
  error?: string
}

export default function ModalDeleteComponent({
  show,
  onDeleteClick,
  onCloseClick,
  recordId,
  error,
}: ModalDeleteComponentProps) {
  const { getLangKey } = useLang()

  const closeBtn = (
    <span onClick={() => onCloseClick?.()} className={cx("closeBtn", "ri-close-large-line")} />
  )

  return (
    <Modal fade isOpen={show} centered>
      <ModalBody className={cx("py-3 px-5", "modalBody")}>
        <div className={cx("modalHeader")}>{closeBtn}</div>
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
            <h4>{getLangKey(CONFIG_LANG_KEY.ERP365_TITLE_MESSAGE_DELETE)}</h4>
            <p className={cx("textColor")}>
              {getLangKey(CONFIG_LANG_KEY.ERP365_SUB_TITLE_MESSAGE_DELETE)} {recordId ?? ""} ?
            </p>
          </div>
        </div>
        <div className={cx("modalFooter")}>
          <Button type="button" color="light" size="lg" className={cx("btn")} onClick={onCloseClick}>
            {getLangKey(CONFIG_LANG_KEY.ERP365_CLOSE)}
          </Button>
          <Button type="button" color="danger" size="lg" className={cx("btn")} onClick={onDeleteClick}>
            {getLangKey(CONFIG_LANG_KEY.ERP365_YES)}
          </Button>
        </div>
      </ModalBody>
    </Modal>
  )
}
