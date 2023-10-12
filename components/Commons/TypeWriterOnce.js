import { useState, useEffect } from "react";

export default (props) => {
  const [text, setText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const textToType = props.text;
    const typingSpeed = props.speed || 50;

    if (currentIndex < textToType.length) {
      const timer = setTimeout(() => {
        setText(textToType.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, typingSpeed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, props]);
  return <div>{text}</div>;
};
