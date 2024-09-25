import { FaSun, FaMoon } from "react-icons/fa6";
import PropTypes from "prop-types";

export const ThemeToggle = ({ isDarkTheme, setIsDarkTheme }) => {
  const handleToggle = () => {
    setIsDarkTheme(!isDarkTheme);
    const html = document.querySelector("html");
    html.setAttribute("data-bs-theme", isDarkTheme ? "dark" : "light");
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
};

ThemeToggle.propTypes = {
  isDarkTheme: PropTypes.bool.isRequired,
  setIsDarkTheme: PropTypes.func.isRequired,
};
