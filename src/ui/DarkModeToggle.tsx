import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../context/DarkModeContext";
import { useEffect } from "react";

export default function DarkModeToggle() {
    const {isDarkMode, toggleDarkMode} = useDarkMode();

    useEffect(() => {
        document.documentElement.classList.toggle('dark-mode')
    }, [isDarkMode])

    return <ButtonIcon onClick={toggleDarkMode}>
        {isDarkMode ? <HiOutlineSun/> : <HiOutlineMoon />}
    </ButtonIcon>
}