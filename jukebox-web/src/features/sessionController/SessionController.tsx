import { faWifi } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import styles from "./sessionController.module.css"
import SessionModal from "./sessionModal/SessionModal"

type SessionControllerProps = {
    className: string
}

const SessionController = (props: SessionControllerProps) => {
    const [sessionActive, setSessionActive] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const className = `${props.className} ${sessionActive ? styles.active : ""}`;

    return (<>
        <SessionModal isOpen={isModalOpen} closeAction={() => setIsModalOpen(false)} />
        <FontAwesomeIcon icon={faWifi} className={className} onClick={() => setIsModalOpen(true)} />
    </>)
}

export default SessionController