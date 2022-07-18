import React from 'react';
import ReactDOM from 'react-dom';
import GoogleMapReact from 'google-map-react';
import { API_KEY } from "./config";
import { ClickLocationIcon, LocationIcon, Marker } from "./MapIcons";



class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            center: {
                lat: this.props.center.lat,
                lng: this.props.center.lng,
            },
            zoom: this.props.zoom,
            mapApiLoaded: false,
            mapInstance: null,
            mapApi: null,
        }
    }

    componentDidMount() {
        this.props.setCurrentLocation();
    }

    render() {
        // console.log("center: " + this.state.center.lat + "," + this.state.center.lng + ", zoom: " + this.state.zoom);
        var location_text = <div><b>location</b> unknown</div>;
        if (this.props.location.lat != null) {
            location_text = <div><b>location</b> {this.props.location.lat}, {this.props.location.lng}</div>
        }

        var clicklocation_text = <div></div>;
        if (this.props.clicklocation.lat != null) {
            clicklocation_text = <div><b>clicked location</b> {this.props.clicklocation.lat}, {this.props.clicklocation.lng}</div>
        }

        return (
            <div className="map-wrapper">
                <div>
                    <SearchInput
                        mapApiLoaded={this.state.mapApiLoaded}
                        map={this.state.mapInstance}
                        mapApi={this.state.mapApi} />
                    <SearchButton />
                </div>
                <div style={{ height: '70vh', width: '100%' }}>
                    <GoogleMapReact
                        className="map"
                        bootstrapURLKeys={{ key: API_KEY, libraries: ['places', 'geometry'] }}
                        center={this.state.center}
                        zoom={this.state.zoom}
                        draggable={true}
                        yesIWantToUseGoogleMapApiInternals
                        onChange={({ center, zoom }) => this.onChange({ center, zoom })}
                        onClick={(loc) => this.onClick(loc)}
                        onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}>
                        <ClickLocationIcon
                            lat={this.props.clicklocation.lat}
                            lng={this.props.clicklocation.lng}
                        />
                        <LocationIcon
                            lat={this.props.location.lat}
                            lng={this.props.location.lng}
                        />
                    </GoogleMapReact>
                </div>
                <div className="map-info">
                    {location_text}
                    {clicklocation_text}
                </div>
            </div>
        )
    }

    onChange = ({ center, zoom }) => {
        this.setState({
            center: center,
            zoom: zoom,
        })
    }

    onClick = (loc) => {
        console.log("New location: %d, %d", loc.lat, loc.lng);
        this.props.setClickLocation(loc);
        this.setState({
            clicklocation: loc,
        })
        var new_history = {
            num: 0,
            checked: false,
            name: "nowhere",
            location: loc,
        }
        this.props.addRecord(new_history);
    }

    apiHasLoaded = (map, maps) => {
        console.log("apiHasLoaded");
        this.setState({
            mapApiLoaded: true,
            mapInstance: map,
            mapApi: maps,
        });
    }
}

class SearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.searchInput = null;
        this.searchInputRef = element => {
            this.searchInput = element;
        }
        this.focusSearchInput = () => {
            if (this.searchInput) {
                this.searchInput.focus();
            }
        }
        this.state = {
            value: "",
        }
    }

    render() {
        const value = this.state.value;
        return (
            <div>
                <input
                    className="searchinput"
                    type="text"
                    ref={this.searchInputRef}
                    placeholder="Enter a place to search"
                    value={value}
                    onChange={(e) => this.onChange(e)}>
                </input>
            </div>

        );
    }

    componentDidMount() {
        this.focusSearchInput();
    }

    componentDidUpdate() {
        const mapApiLoaded = this.props.mapApiLoaded;
        const mapApi = this.props.mapApi;
        if (mapApiLoaded) {
            // const options = {types: ['address']};
            // console.log("set searchbox");
            var input = ReactDOM.findDOMNode(this.searchInput);
            this.searchBox = new mapApi.places.SearchBox(input);
            // this.searchBox = new mapApi.places.Autocomplete(input, options);
            this.searchBox.addListener('places_changed', this.onPlaceChanged);
            // this.searchBox.bindTo('bounds', this.props.map);
        }
    }

    componentWillUnmount() {
        // https://developers.google.com/maps/documentation/javascript/events#removing
        const mapApiLoaded = this.props.mapApiLoaded;
        const mapApi = this.props.mapApi;
        if (mapApiLoaded && this.searchBox) {
            mapApi.event.clearInstanceListeners(this.searchBox);
        }
    }

    onPlaceChanged() {
        console.log("onPlaceChanged");
        const place = this.searchBox.getPlaces();
        if (place.length === 0) {
            return;
        }
        place.forEach(p => {
            console.log(p);
        });
    }

    onChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    }
}

class SearchButton extends React.Component {
    render() {
        return (
            <button
                className="searchbutton"
                onClick={() => this.onClick()}>
                search
            </button>
        )
    }

    onClick() {
        console.log("search");
    }
}


export default Map;