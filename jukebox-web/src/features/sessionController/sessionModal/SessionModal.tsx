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
import Button from "../../../components/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useGroupSession } from "../../groupSessions/hooks/useGroupSession";

type SessionModalProps = {
    isOpen: boolean;
    closeAction: () => void;
}

const SessionModal = (props : SessionModalProps) => {
    const [sessionIdField, setSessionIdField] = useState<string | null>();
    const [sessionIdInUse, setSessionIdInUse] = useState<boolean>(false);
    const sessionState = useSelector((state: RootState) => state.groupSession);
    const dispatch = useDispatch();
    const groupSession = useGroupSession();

    const api = useJukeBoxApi();

    const invalidEntryError = "This cannot be empty";
    const sessionIdInUseError = "SessionID in use"

    const saveSessionId = () => {
        if (sessionIdField)
        {
            groupSession?.joinSession(sessionIdField);
            props.closeAction();
        } 
    }

    const endSession = () => {
        // TODO: do the thing
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

    let sessionIdErrors : string[] = [];
    if (sessionIdInUse){
        sessionIdErrors = sessionIdErrors.concat(sessionIdInUseError)
    }
    return <Modal isOpen={props.isOpen} closeAction={props.closeAction}>
        <div>
            <h1>Session Controls</h1>
            <p>Start a new group session or manage your existing session</p>
            <div className={styles.controlGroup}>
                <div className={styles.inputContainer}>
                    {!sessionState.isSessionActive &&(
                        <>
                            <Input 
                                label="Session Id"
                                value={sessionIdField ?? ""} 
                                className={styles.input}
                                setValue={(v) => setSessionIdField(v ?? "")} 
                                errorMessages={sessionIdErrors}
                            />
                            {!isValid && sessionIdField && (<FontAwesomeIcon icon={faCircleExclamation} className={styles.error}/>)}
                            {isValid && sessionIdField && (<FontAwesomeIcon icon={faCircleCheck} className={styles.checkbox}/>)}
                        </>
                    )}
                    {sessionState.isSessionActive && (
                        <>
                            <b>Current Session Id: </b> {sessionIdField}
                        </>
                    )}
                </div>
                <p>
                    <i>Hint: Try something unique, short and easy to remember. Like "BrandonsDrunkFuckup"</i>
                </p>
            </div>
            {!sessionState.isSessionActive && (<Button disabled={!isValid || !sessionIdField} fontSize="1.5em" label="Start Session" onClick={saveSessionId} />)}
            {sessionState.isSessionActive && (<Button fontSize="1.5em" label="End Session" onClick={endSession} />)}

        </div>
    </Modal>;
}

export default SessionModal;
