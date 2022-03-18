import { useState, useEffect, useRef } from "react";

export default function useClickOutside(initialIsVisible, element) {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };
  if (!element) element = document

  useEffect(() => {
    element.addEventListener("click", handleClickOutside, true);
    return () => {
      element.removeEventListener("click", handleClickOutside, true);
    };
  }, [element]);

  return { ref, isComponentVisible, setIsComponentVisible };
}
