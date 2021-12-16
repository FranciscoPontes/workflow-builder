import React from "react";
import { createStyles, Theme, makeStyles } from "@mui/material/styles";
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
import { Box } from "@mui/material";

const useStyles = {
  root: {
    width: 0.9,
    //   maxWidth: 360,
    margin: "auto",
    marginTop: "10px",
    //   backgroundColor: theme.palette.background.paper,
    borderRadius: "2%",
  },
  element: {
    boxShadow: "0px 10px 13px -7px #000000, 5px 5px 15px 5px rgb(0 0 0 / 0%)",
    m: "auto",
    my: "10px",
    borderRadius: "5%",
    bgcolor: "action.hover",
    color: "text.primary",
    width: 0.9,
  },

  elementFontSize: {
    "& .MuiTypography-root": {
      textAlign: "center",
      fontSize: { sm: "small", xs: "small" },
    },
  },
  actionElement: {
    backgroundColor: "#96b16d",
    px: "10px",
    width: 0.9 / 3,
    "& .MuiListItem-root": {
      justifyContent: "center",
    },
  },
};

export default function ElementList() {
  const classes = useStyles;
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
    <Box sx={{ ...classes.root }}>
      <List component="nav">
        <Box onClick={handleClickPhase} sx={{ ...classes.element }}>
          <ListItem button>
            <ListItemText primary="Phase" sx={{ ...classes.elementFontSize }} />
          </ListItem>
        </Box>
        <Box onClick={handleClickState} sx={{ ...classes.element }}>
          <ListItem button>
            <ListItemText primary="State" sx={{ ...classes.elementFontSize }} />
          </ListItem>
        </Box>
        <List
          component="div"
          disablePadding
          sx={{
            display: "flex",
            // flexFlow: { lg: "row", md: "column", sm: "column", xs: "column" },
            flexFlow: "row",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {actionElements.map((el: actionElement) => (
            <Box
              onClick={() => handleClickAction(el.actionType)}
              sx={{ ...classes.element, ...classes.actionElement }}
              key={el.label}
            >
              <ListItem button>
                <ListItemIcon sx={{ minWidth: "fit-content" }}>
                  {el.icon}
                </ListItemIcon>
              </ListItem>
            </Box>
          ))}
        </List>
      </List>
    </Box>
  );
}
