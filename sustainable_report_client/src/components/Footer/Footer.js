/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// material-ui core components
import { List, ListItem } from "@mui/material";
import { makeStyles } from 'tss-react/mui';

// @material-ui/icons
import Favorite from "@mui/icons-material/Favorite";

import styles from "assets/jss/material-kit-react/components/footerStyle.js";

const useStyles = makeStyles()(styles);

export default function Footer(props) {
  const { classes, cx } = useStyles();
  const { whiteFont } = props;
  const footerClasses = cx({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = cx({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  let clr = {color:"inherit"} ;
  if( props.color ){
    clr = {color : props.color} ;
  }
  // console.log(clr) ;
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://www.linkedin.com/in/manikmalik1999"
                className={classes.block}
                style={clr}
                target="_blank"
              >
                About us
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://www.linkedin.com/in/manikmalik1999"
                className={classes.block}
                style={clr}
                target="_blank"
              >
                Blog
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://www.linkedin.com/in/manikmalik1999"
                className={classes.block}
                style={clr}
                target="_blank"
              >
                Services
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="/seller-signup"
                className={classes.block}
                style={clr}
                target="_blank"
              >
                Sell With Us
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="http://localhost:3006/dashboard/"
                className={classes.block}
                style={clr}
                target="_blank"
              >
                Admin Dashboard
              </a>
            </ListItem>
          </List>
        </div>
        <div className={classes.right} style={clr}>
          &copy; {1900 + new Date().getYear()} , made with{" "}
          <Favorite className={classes.icon} /> by{" "}
          <a
            href="https://www.linkedin.com/in/manikmalik1999/"
            className={aClasses}
            style={clr}
            target="_blank"
          >
            Manik Malik
          </a>{" "}
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool
};
