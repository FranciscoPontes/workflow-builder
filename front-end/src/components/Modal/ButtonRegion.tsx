import { Box, Button } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

interface IButtonRegionProps {
  id: number;
  tryDelete: () => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  closeFormAfterwards: (value: boolean) => void;
}

const ButtonRegion = ({
  id,
  tryDelete,
  handleSubmit,
  isSubmitting,
  closeFormAfterwards,
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
      {!id && (
        <Button
          variant="contained"
          color="success"
          disabled={isSubmitting}
          type="submit"
          onClick={() => {
            closeFormAfterwards(false);
            handleSubmit();
          }}
          size="small"
        >
          Create & create another
        </Button>
      )}
      <Button
        variant="contained"
        color="primary"
        disabled={isSubmitting}
        type="submit"
        onClick={() => {
          closeFormAfterwards(true);
          handleSubmit();
        }}
        size="small"
        sx={{
          ml: 2,
        }}
      >
        {`${!id ? "Create" : "Save"} & close`}
      </Button>
    </Box>
  );
};

export default ButtonRegion;
