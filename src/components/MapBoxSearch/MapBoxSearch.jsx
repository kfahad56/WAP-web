/* eslint-disable */
import React, { useState } from 'react';
import './mapboxsearcher.css';
import close from '../../components/images/close.png';
import { TextField, MenuList, MenuItem, InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    // width: '100% absolute'
  },
  dropdownContent: {
    position: 'absolute',
    width: "29.22917vw",
    // height: 250,
    zIndex: 1000,
    background: "#fff",
    marginTop: "-2.22708vw",
    marginLeft: "-3vw"
  },
  nakedVariant: {
    marginLeft: "3vw",
    position: 'relative',
    zIndex: 10,
    width: '80%'
  },
  nakedInput: {
    width: '80%'
  },
  activeBorder: {
    borderRadius: "4px",
    border: '1px solid #0055ff',
    zIndex: 100,
    width: '100%'
  }
}

const useStyles = makeStyles(styles)

const MapBoxSearch = (props) => {
  let timeoutId = null;
  const classes = useStyles()
  const defaultState = {
    search: props.naked ? "" : "Mumbai, Maharashtra",
    isLoading: "",
    results: [],
    close: false,
    border: false,
    didMount: false,
    matches: window.matchMedia("(min-width: 480px)").matches,
  }
  const [state, setState] = useState(defaultState);

  if (!state.didMount) {
    const handler = e => setState({ matches: e.matches });
    window.matchMedia("(min-width: 480px)").addListener(handler);
    setState((prevState) => ({
      ...prevState,
      didMount: true
    }))
  }
  const performSearch = async () => {
    if (state.search === "") {
      setState((prevState) => ({
        ...prevState,
        results: [],
        isLoading: false
      }))
      return
    }
    let response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${state.search}.json?country=in&access_token=pk.eyJ1IjoibWNvb2w0MTUxIiwiYSI6ImNrZTVwbjJjdzBiNDIyeW41dmc4bmExcTkifQ.gtlBKhY-JUZTQepkMWOAfg`, {
      method: 'GET',
    })
    const json = await response.json()

    setState((prevState) => ({
      ...prevState,
      results: json.features,
      isLoading: false
    }))
  }

  const handleSearchChange = (value) => {
    setState((prevState) => ({
      ...prevState,
      search: value,
      isLoading: true
    }))

    // Stop the previous setTimeout if there is one in progress
    clearTimeout(timeoutId)

    // Launch a new request in 1000ms
    timeoutId = setTimeout(() => {
      performSearch()
    }, 1000)
  }

  const handleItemClicked = (item) => {
    console.log('heyy')
    setState((prevState) => ({
      ...prevState,
      search: item.place_name,
      results: []
    }))
    props.onSelect(item)
  }

  return (
    <div className={props.naked ? classes.nakedVariant : classes.root}>
      {
        props.naked ?
          <InputBase
            style={{ zIndex: "1310" }}
            className={state.border ? classes.activeBorder : "adjustDropdownInput " + classes.nakedInput}
            id="outlined-select-currency-native"
            label="Location"
            placeholder={props.placeholder}
            name="location"
            value={state.search}
            defaultValue={props.placeholder}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => setState((prevState) => ({ ...prevState, search: "", border: true }))}
            onBlur={() => setState((prevState) => ({ ...prevState, border: false }))}
            autoComplete='off'
            options={{
              componentRestrictions: { country: 'in' }
            }}
            inputProps={{ 'aria-label': 'naked' }}
            inputProps={props.inputProps}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          : <React.Fragment>
            <input type="location" name="location" placeholder="Mumbai Maharashtra" style={{ zIndex: "1200", position: "relative", outline: "none" }} value={state.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => setState((prevState) => ({ ...prevState, search: "" }))}
              onBlur={() => setTimeout(() => setState((prevState) => ({ ...prevState, results: [] })), 100)}
              options={{
                componentRestrictions: { country: 'in' }
              }}
              autoComplete='off'
            />
            <label style={{ zIndex: "1200" }}>Location</label>
          </React.Fragment>
        // <TextField
        //   className="adjustDropdownInput"
        //   id="outlined-select-currency-native"
        //   label="Location"
        //   placeholder={props.placeholder}
        //   name="location"
        //   value={state.search}
        //   onChange={(e) => handleSearchChange(e.target.value)}
        //   onFocus={() => setState((prevState) => ({ ...prevState, search: "" }))}
        //   onBlur={() => setTimeout(() => setState((prevState) => ({ ...prevState, results: [] })), 100)}
        //   autoComplete='off'
        // options={{
        //   componentRestrictions: { country: 'in' }
        // }}
        //   InputLabelProps={{
        //     shrink: true,
        //   }}
        //   variant="outlined"
        // />
      }
      {
        state.results.length === 0 ? <React.Fragment /> :
          <MenuList variant={'menu'} className={"MenuListContainer " + classes.dropdownContent}>
            <div className="closeButtonContainer" onClick={() => setState({ results: [], search: "" })}>
              <img src={close} alt="" />
            </div>
            {state.results.map((item, index) =>
              <MenuItem className="suggestionData"
                onClick={() => handleItemClicked(item)}
                onClickCapture={() => handleItemClicked(item)}
                onMouseDownCapture={() => handleItemClicked(item)}
              >
                <div className="otherData">
                  <div className="fas fa-map-marker-alt"></div>
                  <div className="Data">{item.place_name}</div>
                </div>
              </MenuItem>
            )}
          </MenuList>
      }
    </div>
  );
}

export default MapBoxSearch;