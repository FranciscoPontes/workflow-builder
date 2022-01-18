import { Box } from "@mui/material";
import React from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface IOrderingBox {
  applyChangesCallback: (data: Object | []) => void;
  currentElementIndex: number;
  elementArray: { sort_order: number }[];
}

const styles = {
  icon: {
    color: "text.primary",
    cursor: "pointer",
  },
};

const OrderingBox = ({
  applyChangesCallback,
  currentElementIndex,
  elementArray,
}: IOrderingBox) => {
  const elementArrayLength = elementArray.length;

  const changeOrder = (increment: number) => {
    const sortOrderOfThisPhase = elementArray[currentElementIndex].sort_order;
    const sortOrderOfSiblingPhase =
      elementArray[currentElementIndex + increment].sort_order;

    let modifiedPhases = [...elementArray];

    modifiedPhases[currentElementIndex].sort_order = sortOrderOfSiblingPhase;
    modifiedPhases[currentElementIndex + increment].sort_order =
      sortOrderOfThisPhase;

    applyChangesCallback(modifiedPhases);
  };

  const changeOrderUp = async () => {
    if (currentElementIndex + 1 !== elementArrayLength) changeOrder(1);
  };

  const changeOrderDown = async () => {
    if (currentElementIndex !== 0) changeOrder(-1);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box onClick={changeOrderDown}>
        <ArrowUpwardIcon
          sx={{
            ...styles.icon,
            cursor: currentElementIndex !== 0 ? "pointer" : "default",
            color:
              currentElementIndex !== 0 ? "text.primary" : "action.disabled",
          }}
        />
      </Box>
      <Box onClick={changeOrderUp}>
        <ArrowDownwardIcon
          sx={{
            ...styles.icon,
            cursor:
              currentElementIndex + 1 !== elementArrayLength
                ? "pointer"
                : "default",
            color:
              currentElementIndex + 1 !== elementArrayLength
                ? "text.primary"
                : "action.disabled",
          }}
        />
      </Box>
    </Box>
  );
};

export default OrderingBox;
