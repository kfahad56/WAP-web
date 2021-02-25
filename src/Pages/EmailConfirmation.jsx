/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { emailSubConfirm } from '../Apis/EmailSub';
import verifyImage from '../components/images/icon/authentication.svg';
const styles = {
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
}

const useStyles = makeStyles(styles)

const EmailConfirmation = (props) => {
  const classes = useStyles()
  const [state, setState] = useState({
    apiCalled: false,
  });
  const [text, setText] = useState('Verifying...');

  const emailConfirmationCall = () => {
    emailSubConfirm(
      props.match.params.token,
      () => {
        if (props.match.params.type) {
          if (props.match.params.type === 'contact-us') {
            setText('We have recieved your query. We will contact you shortly.')
            setTimeout(() => props.history.push('/'), 3000)
          }
        } else {
          setText('Thank you for subscribing to our email service.')
          setTimeout(() => props.history.push('/'), 3000)
        }
      },
      () => {
        setText('Opps... Seems Like Something Went Wrong. Try Again.')
        setTimeout(() => props.history.push('/'), 3000)
      }
    )
  }

  useEffect(() => {
    if (!state.apiCalled) {
      emailConfirmationCall()
      setState((prevState) => ({
        ...prevState, apiCalled: true
      }))
    }
  }, [state.apiCalled])


  return (
    <div className={classes.root}>
      <div style={{
        marginBottom: 20
      }}>
        <img src={verifyImage} style={{ width: 300, height: 300, }} alt="" />
      </div>
      <h1>
        {text}
      </h1>
    </div>
  );
}

export default EmailConfirmation;