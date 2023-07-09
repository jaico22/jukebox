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
    errorMessages?: string[];
}

const Input = (props: InputProps) => {
    let inlineStyle : CSSProperties = {};

    if (props.fontSize) {
        inlineStyle.fontSize = props.fontSize
    }

    const errorMessage = () => {
        return (<>{props.errorMessages?.forEach(error => {
            return (<p className={styles.error}><i>{error}</i></p>)
        })}</>);
    }
    return (<div className={styles.inputContainer}>
        <label className={styles.label} htmlFor={props.id}>{props.label}</label>
        <input 
        id={props.id}
        className={`${styles.input} ${props.className}`} 
        value={props.value ?? ""} 
        onChange={(e) => props.setValue(e.target.value)} 
        placeholder={props.placeholder}
        style={inlineStyle} />
        {errorMessage()}
    </div>)
}

export default Input;