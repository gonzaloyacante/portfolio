import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

export const Section = ({ title, id, className, children }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          currentRef.classList.add("animate__animated", "animate__zoomIn");
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`d-flex flex-column justify-content-center align-items-center min-vh-100 px-4 ${className}`}>
      {title && <h2 className="text-start w-100 my-5">{title}</h2>}
      {children}
    </section>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};
