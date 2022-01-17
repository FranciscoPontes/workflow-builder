import { keyframes } from "@emotion/react";

const borderDance = keyframes`
  from {
    background-position: left top, right bottom, left bottom, right top;
  },
  to {
    background-position: left 15px top, right 15px bottom, left bottom 15px, right top 15px;
  },
`;

export const animatedDropZoneStyles = {
  dropzoneBorder: {
    backgroundImage:
      "linear-gradient(90deg, silver 50%, transparent 50%), linear-gradient(90deg, silver 50%, transparent 50%), linear-gradient(0deg, silver 50%, transparent 50%), linear-gradient(0deg, silver 50%, transparent 50%)",
    backgroundRepeat: "repeat-x, repeat-x, repeat-y, repeat-y",
    backgroundSize: "15px 2px, 15px 2px, 2px 15px, 2px 15px",
    backgroundPosition: "left top, right bottom, left bottom, right top",
    animation: `${borderDance} 1s infinite linear`,
  },
};
