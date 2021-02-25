/* eslint-disable */
import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Link } from "react-router-dom";
import image from '../components/images/page_not_found.svg';
const styles = {
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  textContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column"
  },
  messageContainer: {
    marginBottom: 50
  },
  goHomeContainer: {
    display: "flex",
    justifyContent: "center",
  },
  goHome: {
    color: "#F9A826",
  }
}

const useStyles = makeStyles(styles)

const NotFound = (props) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className="mobileImageAdjust" style={{ marginBottom: 75 }}>
        <img src={image} alt="" />
      </div>
      <div className={classes.textContainer}>
        <h2 className={"errorTextAdjust " + classes.messageContainer}>
          Oops Seems Like You Are Lost...
        </h2>
        <div className={classes.goHomeContainer}>
          <Link to="/" className={classes.goHome}><h5><b>Go Home</b></h5></Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;