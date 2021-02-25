/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { Map, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import viewall from '../../components/images/viewall.png';
import TestimonialSlider from '../../components/TestimonialSlider/TestimonialSlider';
import TestimonialCard from '../../components/TestimonialCard/TestimonialCard';
import security from '../../components/images/icon/security.png';
import Amenitiescard from '../../components/AmenitiesCard/AmenitiesCard';
import SimilarWarehouseCard from '../../components/SimilarWarehouseCard/SimilarWarehouseCard';
import AddOnServiceSlider from '../../components/AddOnServiceSilder/AddOnServiceSlider';
import AddOnserviceCard from '../../components/AddOnServiceCard/AddOnServiceCard';
import BlogButton from '../../components/BlogButton/BlogButton';
import mapImage from '../../components/images/viewmap.png';
import AmenitiesPopSlider from '../../components/AmenitiesPopSlider/AmenitiesPopSlider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ImageTextTile from '../../components/ImageTextTile/ImageTextTile';
import TestMap from '../../components/MapBox/DetailsMap';
import truck from '../../components/images/icon/truck.png';
import "./MobAccordian.css"
import * as icons from '../../Pages/icons';
const Accordion = withStyles({
  root: {
    // border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);
const mapStyles = {
  width: '88.95833vw',
  height: '109.21875vw'
};

const AccordionSummary = withStyles({
  root: {
    backgroundColor: '#ffffff',
    borderBottom: '',
    marginBottom: -1,
    minHeight: 56,

    '&$expanded': {
      minHeight: 56,
      color: "#0055ff"
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export default function CustomizedAccordions(props) {
  const defaultState = {
    marker: []
  }
  const [state, setState] = useState(defaultState);
  const [expanded, setExpanded] = React.useState('');
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const sampleslider = () => {
    let loop = Math.ceil(props.amenity.length / 8);
    let output = [];
    // console.log(this.state.getAmenity.length);
    for (let i = 0; i < loop; i++) {
      output.push(<TestimonialCard>
        {props.amenity.map((item, index) => {
          if (Math.floor(index / 8) == i)
            return <Amenitiescard icon={icons.amenityIcons(item.code)} amenitiesTtext={item.name} />
        })}
      </TestimonialCard>)
    }
    return <TestimonialSlider>
      {output}
    </TestimonialSlider>;
  }

  const addonSlider = () => {
    let count = Math.ceil(props.addonslider.length / 8);
    let result = [];
    for (let i = 0; i < count; i++) {
      result.push(<TestimonialCard>
        {props.addonslider.map((item, index) => {
          if (Math.floor(index / 8) == i)
            return <Amenitiescard icon={icons.serviceIcons(item.code)} amenitiesTtext={item.name} />
        })}
      </TestimonialCard>)
    }
    return <TestimonialSlider>{result}</TestimonialSlider>
  }
  const getSimilarWarehouses = () => {
    let index = 0
    let cardArr = []
    let data = props.similarWarehouse
    while (index <= 2) {
      const len = data.length - 1
      // console.log(data[index], data.length, index)
      // 1 < 2
      if (len < index) {
        cardArr.push(<SimilarWarehouseCard whiteArrow={true} />)
      } else {
        let temp = data[index]
        cardArr.push(<SimilarWarehouseCard
          onArrowClick={() => {
            window.location = `/viewwarehouse/${temp.warehouseVersionId}`
          }}
          whiteArrow={true}
          title={temp.name}
          imgSRC={temp.image.file}
          location={temp.state}
        />)
      }
      index++;
    }
    return cardArr.map((item, index) => item)
  }
  // useEffect(() => setState((prevState) => ({
  //   ...prevState,
  //   marker: [{ lat: props.latitude, lng: props.longitude }]
  // })));
  return (
    <div className="dropdown">
      <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" expandIcon={<ExpandMoreIcon />}>
          {/* <Typography>Location</Typography> */}
          <h4 className="adjusth4">Location</h4>
        </AccordionSummary>
        <AccordionDetails className="MobAccordionMap">
          <p>{props.city}, {props.state}, Pin-code : {props.pincode}</p>
          <div className="MapImage">
            {/* {console.log(props.latitude, props.longitude)} */}
            <TestMap
              mapStyles={mapStyles}
              center={props.center}
              markers={[{ lng: props.longitude, lat: props.latitude }]}
              highlightCard={() => { }}
              mobile={true}
              navigation={false}
            />
          </div>
          {/* <div className="MapImage">
          <img src={mapImage} alt="" />
          </div> */}
        </AccordionDetails >
      </Accordion >
      <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" expandIcon={<ExpandMoreIcon />}>
          <h4 className="adjusth4">Locality</h4>
        </AccordionSummary>
        <AccordionDetails>
          <div className="localityContainer">
            <div className="descText">
              {props.locality.map(item => {
                return <p>{item.name} (less than {item.distance} km away)</p>
              })}
              {/* <p>Railway Station (less than 3 km away)</p>
              <p>Ferry (less than 2 km away)</p>
              <p>Local Market (less than 3.5 km away)</p>
              <p>Bus Station (less than 1 km away)</p> */}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header" expandIcon={<ExpandMoreIcon />}>
          <h4 className="adjusth4">Amenities</h4>
        </AccordionSummary>
        <AccordionDetails>
          <div className="amenitiesContainer">
            {/* <div className="viewAllContainer">
              <div className="viewalltText" onClick={() =>
                props.onClick
              }
              >View All</div>
              <div>  </div>
              <div className="arrow">
                <img src={viewall} alt="" />
              </div>
            </div> */}
            <div className="amenitiesCardSliderSection">
              {sampleslider()}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header" expandIcon={<ExpandMoreIcon />}>
          <h4 className="adjusth4">Add On Services</h4>
        </AccordionSummary>
        <AccordionDetails>
          <div className="amenitiesContainer">
            <div className="amenitiesCardSliderSection">
              {addonSlider()}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      {/* <Accordion square expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
        <AccordionSummary aria-controls="panel7d-content" id="panel7d-header" expandIcon={<ExpandMoreIcon />}>
          <h4 className="adjusth4">Certifications</h4>
        </AccordionSummary>
        <div className="certificateContainer">
          <div className="certificateTextContainer">
            {props.MobCert.map(item => {
              return <a className="certificateText" href={item.file}>{item.description}</a>
            })}
          </div>
        </div>
      </Accordion> */}
      <Accordion square expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
        <AccordionSummary aria-controls="panel6d-content" id="panel6d-header" expandIcon={<ExpandMoreIcon />}>
          <h4 className="adjusth4">Industry Tag</h4>
        </AccordionSummary>
        <AccordionDetails>
          <div className="certificateContainer">
            <div className="industryTagContainerAdjust">
              {props.certTag.map(item => {
                return <BlogButton tags={item.name} />
              })}
            </div>
            <div className="MobSlider">
              <div className="MobInnerSlider"></div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
        <AccordionSummary aria-controls="panel8d-content" id="panel8d-header" expandIcon={<ExpandMoreIcon />}>
          <h4 className="adjusth4">Similar Warehouses</h4>
        </AccordionSummary>
        <AccordionDetails>
          {props.similarWarehouse.length > 0 ?
            <div className="row">{getSimilarWarehouses()} </div> : <div>No Similar Warehouses</div>}
        </AccordionDetails>
      </Accordion>
    </div >
  );
}
