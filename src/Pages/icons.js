/* eslint-disable */
import React from 'react';

/*Amenities*/
import WcIcon from '@material-ui/icons/Wc';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import CastConnectedIcon from '@material-ui/icons/CastConnected';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
import SettingsInputCompositeIcon from '@material-ui/icons/SettingsInputComposite';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VideocamIcon from '@material-ui/icons/Videocam';
import WarningIcon from '@material-ui/icons/Warning';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import PanToolIcon from '@material-ui/icons/PanTool';
import RestoreIcon from '@material-ui/icons/Restore';
import BorderAllIcon from '@material-ui/icons/BorderAll';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import SecurityIcon from '@material-ui/icons/Security';
import SpaceBarIcon from '@material-ui/icons/SpaceBar';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';

/*Services*/
import PurchaseOrder from '../components/images/icon/purchase-order.png';
import Lease from '../components/images/icon/lease.png'
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import TimelineIcon from '@material-ui/icons/Timeline';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
export const amenityIcons = (ch) => {
    switch (ch) {
        case 'WC': return <WcIcon />/*toilet */
        case 'KT': return <RestaurantIcon />/*Kitchen */
        case 'PR': return <LocalParkingIcon />/*Parking */
        case 'YR': return <LocalShippingIcon />/*Yard space for arctic trailers*/
        case 'CN': return <LocalBarIcon />/*Canteen/ food stalls*/
        case 'IN': return <CastConnectedIcon />/*Internet */
        case 'OF': return <DesktopMacIcon />/*Office space */
        case 'WT': return <SettingsInputCompositeIcon />/* Water connection */
        case 'EE': return <WbIncandescentIcon />/*Electricity */
        case 'SC': return <VisibilityIcon />/* Security*/
        case 'CT': return <VideocamIcon />/* CCTV*/
        case 'AA': return <WarningIcon />/*Alarmed */
        case 'SI': return <CreditCardIcon />/*Swipe pass */
        case 'GT': return <PanToolIcon />/* Gate access	*/
        case 'SE': return <RestoreIcon />/* 24/7Security*/
        case 'FN': return <BorderAllIcon />/*Fenced yard	*/
        case 'CG': return <AddShoppingCartIcon />/*Caged (High Value Goods storage) */
        case 'EF': return <WhatshotIcon />/*ESFR Sprinkler System */
        // case 'SR': return <AccountBalanceIcon />/*Sprinklered */
        case 'PT': return <SecurityIcon />/*Patrolled */
        case 'BN': return <SpaceBarIcon />/*Bunded */
        case 'FE': return <QueryBuilderIcon />/*Flexible Operating Hours */
    }
}



export const serviceIcons = (ch) => {
    switch (ch) {
        case 'LU': return <i class="fas fa-people-carry"></i>/*Loading / Unloading	*/
        case 'RH': return <i class="fas fa-truck-loading"></i>/*RH & D	*/
        case 'PI': return <i class="fas fa-box-open"></i>/*Picking */
        case 'PC': return <i class="fas fa-gifts"></i>/*Packing	*/
        case 'CP': return <i class="fas fa-cubes"></i>/*Co-packing */
        case 'PW': return <i class="fas fa-gift"></i>/*Pallet wrapping	*/
        case 'DS': return <i class="fas fa-shipping-fast"></i>/*Dispatching	*/
        case 'LA': return <LocalShippingIcon />/*Loading*/
        case 'SU': return <i class="fas fa-shuttle-van"></i>/*Shunting */
        case 'CM': return <i class="fas fa-cubes"></i>/* Co-manufacturing	*/
        case 'LD': return <i class="fas fa-tags"></i>/* Labelling and documentation	*/
        case 'SM': return <i class="fas fa-pallet"></i>/*Stock Management	*/
        case 'SD': return <i class="fas fa-shipping-fast"></i>/*Secondary distribution	*/
        case 'RM': return <i class="fas fa-recycle"></i>/*Returns management	*/
        case 'VI': return <i class="fas fa-chart-line"></i>/*Value added services- Inventory Management*/
        case 'OF': return <div className="purchaseIcon">
            <img src={PurchaseOrder} alt="" />
        </div> /*Order fulfilment	*/
        case 'DR': return <i class="fas fa-shipping-fast"></i>/*Delivery to retail- Milkrun*/
        case 'SM': return <i class="fas fa-shipping-fast"></i>/*Same day delivery	*/
        case 'BD': return <i class="fas fa-pallet"></i>/*Bulk Distribution	*/
        case 'IN': return <div className="leaseIcon">
            <img src={Lease} alt="" />
        </div> /*Insurance */
        case 'IT': return <i class="fas fa-microchip"></i>/*IoT enabled tracking */
        case 'AM': return <i class="fas fa-thumbtack"></i>/*Asset monitoring*/
        case 'TT': return <i class="fas fa-route"></i>/*Track and Trace*/
    }
}