import React, { CSSProperties } from "react";
import styles from "./button.module.css"
type ButtonProps = {
    fontSize?: string;
    onClick : () => void;
    label: string;
    disabled?: boolean;
}

const Button = (props: ButtonProps) => {
    let inlineStyle : CSSProperties = {};
    if (props.fontSize)
        inlineStyle.fontSize = props.fontSize;
    return (
        <button disabled={props.disabled} style={inlineStyle} className={styles.button} onClick={props.onClick}>{props.label}</button>
    )
}

export default Button;