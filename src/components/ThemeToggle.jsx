import { FaSun, FaMoon } from "react-icons/fa6";
import { useState } from 'react'

export const ThemeToggle = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleToggle = () => {
    setIsDarkTheme(!isDarkTheme);
    const html = document.querySelector('html');
    html.setAttribute('data-bs-theme', isDarkTheme ? 'dark' : 'light');
  };

  return (
    <label className="form-check-label">
      <input
        type="checkbox"
        className="form-check-input"
        checked={isDarkTheme}
        onChange={handleToggle}
      />
      <FaSun className="sun" />
      <FaMoon className="moon" />
      <span className="toggle"></span>
    </label>
  );
}
