import React, { useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const ConfettiEffect = ({ trigger }) => {
  const { width, height } = useWindowSize();
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  React.useEffect(() => {
    if (trigger) {
      setIsConfettiActive(true);
      setTimeout(() => setIsConfettiActive(false), 3000); // Auto-stop after 3s
    }
  }, [trigger]);

  return isConfettiActive ? <Confetti width={width} height={height} /> : null;
};

export default ConfettiEffect;
