import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from 'tss-react/mui';

// @material-ui/icons

// core components
import styles from "assets/jss/material-kit-react/components/cardHeaderStyle.js";

const useStyles = makeStyles()(styles);

export default function CardHeader(props) {
  const { classes, cx } = useStyles();
  const { className, children, color, plain, ...rest } = props;
  const cardHeaderClasses = cx({
    [classes.cardHeader]: true,
    [classes[color + "CardHeader"]]: color,
    [classes.cardHeaderPlain]: plain,
    [className]: className !== undefined
  });
  return (
    <div className={cardHeaderClasses} {...rest}>
      {children}
    </div>
  );
}

CardHeader.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf(["warning", "success", "danger", "info", "primary"]),
  plain: PropTypes.bool,
  children: PropTypes.node
};
