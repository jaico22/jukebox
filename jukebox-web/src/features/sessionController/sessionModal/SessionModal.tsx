import styles from "./sessionModal.module.css"
import { setSessionId } from "../../groupSessions/groupSessionSlice";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleExclamation, faXmark } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../../components/modal";
import Input from "../../../components/input";
import { useJukeBoxApi } from "../../../hooks/jukeBoxApi/useJukeBoxApi";
import { apiRoutes } from "../../../hooks/jukeBoxApi/routes";
import { GetSessionResponse } from "../../../hooks/jukeBoxApi/models/responses/getSessionRresponse";

type SessionModalProps = {
    isOpen: boolean;
    closeAction: () => void;
}

const SessionModal = (props : SessionModalProps) => {
    const [sessionIdField, setSessionIdField] = useState<string | null>();
    const [sessionIdError, setSessionIdError] = useState<string | null>();
    const [sessionIdVerified, setSessionIdVerified] = useState<boolean>(false);
    const [sessionIdInUse, setSessionIdInUse] = useState<boolean>(false);
    
    const api = useJukeBoxApi();

    const invalidEntryError = "This cannot be empty";
    const sessionIdInUseError = "SessionID in use"

    const saveSessionId = () => {
        setSessionIdError(null);
        if (sessionIdField)
            setSessionId(sessionIdField);
        else
            setSessionIdError(invalidEntryError);
    }

    const verifySessionId = (sessionId: string | undefined | null) => {
        if (sessionIdField)
            api.Get<GetSessionResponse>(apiRoutes.Sessions.Get.replace(":sessionId", sessionId ?? ""))
                .then(resp => {
                    setSessionIdInUse(resp.data?.isSessionActive ?? false)
                })
                .catch(resp => {
                    // TODO handle 500 with toast?
                })
    }

    useEffect(() => verifySessionId(sessionIdField), [sessionIdField])

    const isValid = !sessionIdInUse;
    console.log(sessionIdInUse)
    console.log(isValid)
    return <Modal isOpen={props.isOpen} closeAction={props.closeAction}>
        <div>
            <h1>Session Controls</h1>
            <p>Start a new group session or manage your existing session</p>
            <div className={styles.controlGroup}>
                <div className={styles.inputContainer}>
                    <Input 
                        label="Session Id"
                        value={sessionIdField ?? ""} 
                        className={styles.input}
                        setValue={(v) => setSessionIdField(v ?? "")} 
                    />
                    {!isValid && sessionIdField && (<FontAwesomeIcon icon={faCircleExclamation} className={styles.error}/>)}
                    {isValid && sessionIdField && (<FontAwesomeIcon icon={faCircleCheck} className={styles.checkbox}/>)}
                </div>
                <p>
                    <i>Hint: Try something unique, short and easy to remember. Like "BrandonsDrunkFuckup"</i>
                </p>
            </div>
        </div>
    </Modal>;
}

export default SessionModal;