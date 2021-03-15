import React from "react";
import { Checkbox } from "@material-ui/core";
import CircleChecked from "@material-ui/icons/CheckCircleOutline";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";

export default function checkBox() {
  return (
    <Checkbox icon={<CircleUnchecked fontSize="small" />} checkedIcon={<CircleChecked color="primary" fontSize="small" />} size="small" />
  );
}
