import { FaArrowUp } from "react-icons/fa6";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

export const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 100 ? setShowTopBtn(true) : setShowTopBtn(false);
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="top-to-btm">
      {" "}
      {showTopBtn && (
        <Button
          className="icon-position border-4"
          variant="outline-primary"
          onClick={goToTop}>
          <FaArrowUp className="position-absolute top-50 start-50 translate-middle fs-3" />
        </Button>
      )}{" "}
    </div>
  );
};
