import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CommercialIcon from "@material-ui/icons/Storefront";
import IndustrialIcon from "@material-ui/icons/Store";
import SingleFamilyIcon from "@material-ui/icons/Home";
import MultiFamilyIcon from "@material-ui/icons/Apartment";

const useStyles = makeStyles(theme => ({
  container: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const CategoryLinks = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<CommercialIcon />}
        component={Link}
        to="/evolution/commercial"
        key="Commercial"
      >
        Commercial
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<IndustrialIcon />}
        component={Link}
        to="/evolution/industrial"
        key="Industrial"
      >
        Industrial
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<SingleFamilyIcon />}
        component={Link}
        to="/evolution/single-family"
        key="Single Family"
      >
        Single Family
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<MultiFamilyIcon />}
        component={Link}
        to="/evolution/multi-family"
        key="Multi Family"
      >
        Multi Family
      </Button>
    </div>
  );
};

export default CategoryLinks;
