import { Box, ListItem, ListItemIcon } from "@mui/material";
import { useDrag } from "react-dnd";
import { dragTypes } from "../../DragAndDrop/dragTypes";
import { useInvokeModal } from "../../Modal/formHooks";
import { EActionTypes } from "../../workflowItems/Action/Action";
import React from "react";
export type TActionElement = {
  label: string;
  actionType: EActionTypes;
  icon: any;
};

interface IActionElement {
  styles: object;
  actionElement: TActionElement;
}

const ActionElement = ({ styles, actionElement }: IActionElement) => {
  const { invokeActionModal } = useInvokeModal();

  const [actionDragObject, actionDrag] = useDrag(() => ({
    type: dragTypes.action,
    item: { actionType: actionElement.actionType },
  }));

  return (
    <Box
      onClick={() => invokeActionModal(actionElement.actionType)}
      sx={styles}
      ref={actionDrag}
    >
      <ListItem button>
        <ListItemIcon sx={{ minWidth: "fit-content" }}>
          {actionElement.icon}
        </ListItemIcon>
      </ListItem>
    </Box>
  );
};

export default ActionElement;
