import React from "react";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchClassKey, SwitchProps } from "@mui/material/Switch";
import { ESwitch } from "../types/types";

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

interface Props extends SwitchProps {
  classes: Styles;
}

const IOSSwitch = styled(Switch)(({ theme }) => ({
  root: {
    sm: {
      width: 36,
      height: 20,
      fontSize: "x-small",
    },
    md: {
      width: 42,
      height: 26,
    },
    p: 0,
    m: 1,
    overflow: "initial",
  },
  switchBase: {
    p: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#52d869",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff",
    },
  },
  thumb: {
    sm: {
      width: 18,
      height: 18,
    },
    md: {
      width: 24,
      height: 24,
    },
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}));

interface ICustomSwitchProps {
  active: ESwitch;
  label: string;
  onChange: () => void;
}

const CustomSwitch = (props: ICustomSwitchProps) => {
  const handleChange = () => {
    props.onChange();
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <IOSSwitch
            checked={props.active === ESwitch.y}
            onChange={handleChange}
            disableRipple
          />
        }
        label={props.label}
      />
    </FormGroup>
  );
};

export default CustomSwitch;
