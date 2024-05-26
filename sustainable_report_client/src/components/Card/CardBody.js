import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from 'tss-react/mui';

// @material-ui/icons

// core components
import styles from "assets/jss/material-kit-react/components/cardBodyStyle.js";

const useStyles = makeStyles()(styles);

export default function CardBody(props) {
  const { classes, cx } = useStyles();
  const { className, children, ...rest } = props;
  const cardBodyClasses = cx({
    [classes.cardBody]: true,
    [className]: className !== undefined
  });
  return (
    <div className={cardBodyClasses} {...rest}>
      {children}
    </div>
  );
}

CardBody.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};
