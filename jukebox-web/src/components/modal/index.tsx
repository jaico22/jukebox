import ReactModal from "react-modal"
import styles from "./modal.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type ModalProps = {
    isOpen: boolean;
    closeAction: () => void;
    children: string | JSX.Element | JSX.Element[]
}

const Modal = (props : ModalProps) => {

    return <ReactModal className={styles.modal} overlayClassName={styles.overlay} isOpen={props.isOpen} onRequestClose={props.closeAction}>
        <div className={styles.modalBody}>
            <div className={styles.modalHeader}>
                <FontAwesomeIcon icon={faXmark} className={styles.closeIcon} onClick={props.closeAction}/>
            </div>
            {props.children}
        </div>
    </ReactModal>;
}

export default Modal;