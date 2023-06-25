// import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

export const ScrollToTop = () => {
  // const [showTopBtn, setShowTopBtn] = useState(false);

  // useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //     window.scrollY > 400 ? setShowTopBtn(true) : setShowTopBtn(false)
  //   });
  // }, []);

  const goToTop = () => {
      window.scrollTo({
          top: 0,
          behavior: "smooth",
      });
  };

  return (
    <div className="top-to-btm">
            <Button variant="outline-primary" onClick={goToTop}>
              <p>.</p>
            </Button>
    </div>
  )
}
