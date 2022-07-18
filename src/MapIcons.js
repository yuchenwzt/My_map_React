import { AiFillEnvironment } from 'react-icons/ai';
import { TbCurrentLocation } from "react-icons/tb";
import React from 'react';

const ClickLocationIcon = () => <AiFillEnvironment className="location-icon" />;
const LocationIcon = () => <TbCurrentLocation className="location-icon" />;
const Marker = ({ name }) => <div>
    <AiFillEnvironment className="marker" />
    <div className="marker-text">
        {name}
    </div>
</div>;

export { ClickLocationIcon, LocationIcon, Marker };