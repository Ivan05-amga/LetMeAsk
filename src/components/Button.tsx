import {ButtonHTMLAttributes} from "react"
import { useTheme } from "../hooks/useTheme";

import "../styles/buttons.scss";

type ButtonsProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlinded?: boolean
};

export const Button = ({isOutlinded = false,...props}:ButtonsProps) =>{
    const {theme} = useTheme();
    
    return(
        <button className={`button ${theme} ${isOutlinded ? 'outlined' : '' }`} {...props}/>
    );
}