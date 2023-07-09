import { faWifi } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import styles from "./sessionController.module.css"
import SessionModal from "./sessionModal/SessionModal"
import { useSelector } from "react-redux"
import { RootState } from "../../store"

type SessionControllerProps = {
    className: string
}

const SessionController = (props: SessionControllerProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const sessionState = useSelector((state: RootState) => state.groupSession);

    const className = `${props.className} ${sessionState.isSessionActive ? styles.active : ""}`;

    return (<>
        <SessionModal isOpen={isModalOpen} closeAction={() => setIsModalOpen(false)} />
        <FontAwesomeIcon icon={faWifi} className={className} onClick={() => setIsModalOpen(true)} />
    </>)
}

export default SessionController