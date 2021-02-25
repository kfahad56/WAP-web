/* eslint-disable */
import React, { useState } from 'react';
import { DialogContent, Dialog } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

export const Popup = (props) => {
  const handleClose = () => {
    props.handleClose()
  }

  setTimeout(() => handleClose(), 3000)

  return (
    <div>
      <Dialog onClose={handleClose} open={true} maxWidth='xs'>
        <DialogContent dividers
          style={props.contentContainerStyle ? props.contentContainerStyle : {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <img style={props.imgStyle ? props.imgStyle : { width: 100, height: 100, marginBottom: 20 }} src={props.illustration} alt="" />
          <Typography style={props.textStyle ? props.textStyle : { fontSize: 20, fontWeight: 600, fontFamily: "Roboto-regular", textAlign: 'center' }}>{props.text}</Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
}
