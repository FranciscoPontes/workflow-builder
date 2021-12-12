import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { EModalTypes, IModal } from "../../Modal/Modal";
import { actionTypes } from "../../../store/actionTypes";
import { useDispatch } from "react-redux";
import styles from "./ElementList.module.css";
import MailIcon from "@material-ui/icons/Mail";
import TrendingFlatIcon from "@material-ui/icons/TrendingFlat";
import NewReleasesIcon from "@material-ui/icons/NewReleases";
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
        <div onClick={handleClickPhase} className={styles.element}>
          <ListItem button>
            <ListItemText primary="Phase" className={styles.elementFontSize} />
          </ListItem>
        </div>
        <div onClick={handleClickState} className={styles.element}>
          <ListItem button>
            <ListItemText primary="State" className={styles.elementFontSize} />
          </ListItem>
        </div>
        <List component="div" disablePadding>
          {actionElements.map((el: actionElement) => (
            <div
              onClick={() => handleClickAction(el.actionType)}
              className={[styles.element, styles.actionElement].join(" ")}
              key={el.label}
            >
              <ListItem button classes={styles.customListItem}>
                <ListItemIcon
                  style={{
                    minWidth: "fit-content",
                    marginRight: "5px",
                  }}
                >
                  {el.icon}
                </ListItemIcon>
                {/* <ListItemText
                  primary={el.label}
                  className={styles.elementFontSize}
                /> */}
              </ListItem>
            </div>
          ))}
        </List>
      </List>
    </div>
  );
}
