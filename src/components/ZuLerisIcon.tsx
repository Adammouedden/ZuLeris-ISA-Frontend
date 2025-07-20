import React from "react";

type Props = {
  size?: number;
  className?: string;
};

const ZuLerisIcon: React.FC<Props> = ({ size = 32, className = "" }) => (
  <img
    src="/ZulerisIcon.png"
    width={size}
    height={size}
    alt="Zuleris Icon"
    className={`object-contain rounded-md ${className}`}
    style={{ filter: "none" }} // ensure no grayscale
  />
);

export default ZuLerisIcon;