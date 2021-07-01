import { useTheme } from "../hooks/useTheme";
import {BiSun,BiMoon} from "react-icons/bi" 

export function ButtonTheme(){
    const {theme,toggleTheme} = useTheme(); 

    document.body.style.backgroundColor = theme === "light" ? "#FFF" : "#060725";

    return (
        <button className={`change-theme ${theme}` }onClick={toggleTheme}>
            {theme === "light" ? <BiSun size="30px" /> : <BiMoon size="30px"/> }
        </button>
    );
}