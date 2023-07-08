import { CSSProperties } from "react";
import styles from "./input.module.css"

type InputProps = {
    value: string | null,
    setValue: (value: string) => void,
    className?: string;
    placeholder?: string;
    label?: string;
    id?:string;
    fontSize?: string;
}

const Input = (props: InputProps) => {
    let inlineStyle : CSSProperties = {};

    if (props.fontSize) {
        inlineStyle.fontSize = props.fontSize
    }
    return (<div><label className={styles.label} htmlFor={props.id}>{props.label}</label><input 
        id={props.id}
        className={`${styles.input} ${props.className}`} 
        value={props.value ?? ""} 
        onChange={(e) => props.setValue(e.target.value)} 
        placeholder={props.placeholder}
        style={inlineStyle}
    /></div>)
}

export default Input;