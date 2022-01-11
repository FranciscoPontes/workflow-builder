import { Box, Button } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

interface IButtonRegionProps {
  id: number;
  tryDelete: () => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
}

const ButtonRegion = ({
  id,
  tryDelete,
  handleSubmit,
  isSubmitting,
}: IButtonRegionProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: id ? "space-between" : "right",
        m: "20px",
      }}
    >
      {id ? (
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={tryDelete}
          size="small"
        >
          delete
        </Button>
      ) : null}
      <Button
        variant="contained"
        color="primary"
        disabled={isSubmitting}
        type="submit"
        onClick={handleSubmit}
        size="small"
      >
        Save
      </Button>
    </Box>
  );
};

export default ButtonRegion;
