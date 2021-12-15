import React from "react";
import { withStyles, Theme, createStyles, makeStyles } from "@mui/styles";
import { purple } from "@mui/material/colors";
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

const wrapperClasses = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.down("md")]: {
        width: 36,
        height: 20,
        fontSize: "x-small",
      },
      [theme.breakpoints.up("md")]: {
        width: 42,
        height: 26,
      },
    },
  })
);

const IOSSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.down("md")]: {
        width: 36,
        height: 20,
        fontSize: "x-small",
      },
      [theme.breakpoints.up("md")]: {
        width: 42,
        height: 26,
      },
      padding: 0,
      margin: theme.spacing(1),
      overflow: "initial",
    },
    switchBase: {
      padding: 1,
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
      [theme.breakpoints.down("md")]: {
        width: 18,
        height: 18,
      },
      [theme.breakpoints.up("md")]: {
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
  })
)(({ classes, ...props }: Props) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

interface ICustomSwitchProps {
  active: ESwitch;
  label: string;
  onChange: () => void;
}

const CustomSwitch = (props: ICustomSwitchProps) => {
  const handleChange = () => {
    props.onChange();
  };

  const classWrapper = wrapperClasses();

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <IOSSwitch
            checked={props.active === ESwitch.y}
            onChange={handleChange}
          />
        }
        label={props.label}
        // className={classWrapper.root}
      />
    </FormGroup>
  );
};

export default CustomSwitch;
