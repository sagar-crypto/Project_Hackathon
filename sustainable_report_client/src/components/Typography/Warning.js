import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from 'tss-react/mui';

// core components
import styles from "assets/jss/material-kit-react/components/typographyStyle.js";

const useStyles = makeStyles()(styles);

export default function Warning(props) {
  const { classes } = useStyles();
  const { children } = props;
  return (
    <div className={classes.defaultFontStyle + " " + classes.warningText}>
      {children}
    </div>
  );
}

Warning.propTypes = {
  children: PropTypes.node
};