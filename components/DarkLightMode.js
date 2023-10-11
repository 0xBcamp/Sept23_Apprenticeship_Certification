import { useState } from "react";
import Link from "next/link";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);

    const root = document.documentElement;
    if (isDarkMode) {
      root.style.setProperty("--background-color", "#f0f0f0");
      root.style.setProperty("--text-color", "rgb(15 23 42)");

      // root.style.setProperty("--background-colorh", "#284b63");
      // root.style.setProperty("--text-colorh", "rgb(255 255 255)");
    } else {
      root.style.setProperty("--background-color", "rgb(15 23 42)");
      root.style.setProperty("--text-color", "#ffffff");

      // root.style.setProperty("--background-colorh", "rgb(15 23 42)");
      // root.style.setProperty("--text-colorh", "#284b63");
    }
  };
  const light = "/sun.svg";
  const dark = "/moon.svg";
  return (
    <div>
      <Link href="#" onClick={toggleDarkMode}>
        <img src={isDarkMode ? light : dark} width={"30"} height={"30"} />
      </Link>
    </div>
  );
};

export default DarkModeToggle;
