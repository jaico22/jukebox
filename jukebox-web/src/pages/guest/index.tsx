import React, { useEffect } from "react";
import { Search } from "../../features/search/Search";
import MusicQueue from "../../features/musicQueue/MusicQueue";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import routes from "../routes";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/modal";
import Button from "../../components/button";

const GuestPage = () => {
    const navigate = useNavigate();
    const groupSessionState = useSelector((state: RootState) => state.groupSession);

    useEffect(() => {
        if (!groupSessionState.sessionId) {
            navigate(routes.welcome)
        }
    }, [groupSessionState.sessionId, navigate])

    const SessionEndedModal = (
        <Modal isOpen={!groupSessionState.isConnected} closeAction={() => navigate(routes.welcome)}>
            <h1>Session Has Ended</h1>
            <p>
                The session you joined has ended. Click continue to return to the homepage.
            </p>
            <Button fontSize="2em" label="Continue" onClick={() => navigate(routes.welcome)} />
        </Modal>)

    return (
        <div>
            {SessionEndedModal}
            <Search />
            <MusicQueue QueueItems={groupSessionState.readOnlyQueue ?? []}/>
        </div>)
}

export default GuestPage;