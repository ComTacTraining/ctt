import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { green, red } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import Yes from "@material-ui/icons/AddCircle";
import No from "@material-ui/icons/RemoveCircle";

const useStyles = makeStyles(theme => ({
  option: {
    display: "flex",
    alignItems: "center"
  }
}));

const YesNoOption = ({ label, value }) => {
  const classes = useStyles();
  return (
    <Typography
      key={`caption-${value}`}
      variant="caption"
      className={classes.option}
    >
      {value ? (
        <Yes style={{ color: green[500], fontSize: "small" }} />
      ) : (
        <No style={{ color: red[500], fontSize: "small" }} />
      )}{" "}
      {label}
    </Typography>
  );
};

YesNoOption.propTypes = {
  label: PropTypes.string,
  value: PropTypes.bool
};

export default YesNoOption;
