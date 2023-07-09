import React from "react"
import AppleMusicLogin from "./components/AppleMusicLogin"
import { useNavigate } from "react-router-dom";
import routes from "../routes";
import GuestLogin from "./components/GuestLogin";
import { useDispatch } from "react-redux";
import { setIsGuest } from "../../features/groupSessions/groupSessionSlice";
import styles from "./welcome.module.css"

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

    return (
    <div className={styles.content}>
        <div className={styles.header}>
            <img src="harmoni-logo-2.svg" className={styles.logo} />
        </div>
        <div className={styles.loginOptionsContainer}>
            <span><i>Select your platform to begin</i></span>
            <div className={styles.loginOptionsList}>
            <AppleMusicLogin successCallback={handleLoginSuccess} /> 
            </div>
        </div>
        <div className={styles.loginOptionsContainer}>
            <span><i>Or Join a Live Session</i></span>
            <GuestLogin successCallback={handleGuestLoginSucces} />
        </div>
    </div>)
}

export default WelcomePage