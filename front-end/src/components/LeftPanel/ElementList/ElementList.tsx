import React from "react";
import { createStyles, Theme, makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { EModalTypes, IModal } from "../../Modal/Modal";
import { actionTypes } from "../../../store/actionTypes";
import { useDispatch } from "react-redux";
import MailIcon from "@mui/icons-material/Mail";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import { EActionTypes } from "../../workflowItems/Action/Action";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "80%",
      //   maxWidth: 360,
      margin: "auto",
      marginTop: "10px",
      //   backgroundColor: theme.palette.background.paper,
      borderRadius: "2%",
    },
    customListItem: {
      justifyContent: "center",
    },
    element: {
      boxShadow: "0px 10px 13px -7px #000000, 5px 5px 15px 5px rgb(0 0 0 / 0%)",
      margin: "10px",
      borderRadius: "5%",
      backgroundColor: "white",
    },

    elementFontSize: {
      textAlign: "center",
      [theme.breakpoints.down("md")]: {
        fontSize: "small",
      },
    },
    actionElement: {
      backgroundColor: "#96b16d",
    },
  })
);

export default function ElementList() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const phaseModalData = {
    title: "New phase",
    description: null,
    type: EModalTypes.phase,
  };

  const StateModalData: IModal = {
    type: EModalTypes.state,
    title: "New State",
    description: "",
  };

  const ActionModalData: IModal = {
    title: "New action",
    description: "",
    type: EModalTypes.action,
  };

  const handleClickPhase = () =>
    dispatch({
      type: actionTypes.showModal,
      data: phaseModalData,
    });

  const handleClickState = () =>
    dispatch({
      type: actionTypes.showModal,
      data: StateModalData,
    });

  const handleClickAction = (actionType: EActionTypes) =>
    dispatch({
      type: actionTypes.showModal,
      data: {
        ...ActionModalData,
        metadata: {
          actionMetadata: {
            action_type: actionType,
          },
        },
      },
    });

  type actionElement = {
    label: string;
    actionType: EActionTypes;
    icon: any;
  };

  const actionElements: Array<actionElement> = [
    {
      label: "Mail",
      actionType: EActionTypes.mail,
      icon: <MailIcon fontSize="small" />,
    },
    {
      label: "State",
      actionType: EActionTypes.stateChange,
      icon: <TrendingFlatIcon fontSize="small" />,
    },
    {
      label: "PL/SQL",
      actionType: EActionTypes.plsql,
      icon: <NewReleasesIcon fontSize="small" />,
    },
  ];

  return (
    <div className={classes.root}>
      <List component="nav">
        <div onClick={handleClickPhase} className={classes.element}>
          <ListItem button>
            <ListItemText
              primary="Phase"
              className={classes.elementFontSize}
              disableTypography
            />
          </ListItem>
        </div>
        <div onClick={handleClickState} className={classes.element}>
          <ListItem button>
            <ListItemText
              primary="State"
              className={classes.elementFontSize}
              disableTypography
            />
          </ListItem>
        </div>
        <List component="div" disablePadding>
          {actionElements.map((el: actionElement) => (
            <div
              onClick={() => handleClickAction(el.actionType)}
              className={[classes.element, classes.actionElement].join(" ")}
              key={el.label}
            >
              <ListItem button className={classes.customListItem}>
                <ListItemIcon
                  className={classes.customListItem}
                  style={{
                    minWidth: "fit-content",
                  }}
                >
                  {el.icon}
                </ListItemIcon>
              </ListItem>
            </div>
          ))}
        </List>
      </List>
    </div>
  );
}
