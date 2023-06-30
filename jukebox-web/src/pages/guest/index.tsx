import React, { useEffect } from "react";
import { Search } from "../../features/search/Search";
import MusicQueue from "../../features/musicQueue/MusicQueue";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import routes from "../routes";
import { useNavigate } from "react-router-dom";

const GuestPage = () => {
    const navigate = useNavigate();
    const groupSessionState = useSelector((state: RootState) => state.groupSession);

    useEffect(() => {
        if (!groupSessionState.sessionId) {
            navigate(routes.welcome)
        }
    }, [groupSessionState.sessionId, navigate])

    return <div><Search /><MusicQueue QueueItems={groupSessionState.readOnlyQueue ?? []}/></div>
}

export default GuestPage;