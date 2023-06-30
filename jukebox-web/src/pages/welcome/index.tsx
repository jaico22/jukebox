import React from "react"
import AppleMusicLogin from "./components/AppleMusicLogin"
import { useNavigate } from "react-router-dom";
import routes from "../routes";
import GuestLogin from "./components/GuestLogin";
import { useDispatch } from "react-redux";
import { setIsGuest } from "../../features/groupSessions/groupSessionSlice";

const WelcomePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLoginSuccess = () => {
        navigate(routes.player)
    }

    const handleGuestLoginSucces = () => {
        dispatch(setIsGuest(true));
        navigate(routes.guest)
    }

    return (<div>
        <b>Welcome<br /><AppleMusicLogin successCallback={handleLoginSuccess} /></b> <br />
        <p>- or -</p>
        <GuestLogin successCallback={handleGuestLoginSucces} />
    </div>)
}

export default WelcomePage