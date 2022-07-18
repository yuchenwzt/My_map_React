import './App.css';
import React from 'react';
import { mapDefaultConfig } from "./config";
import { History } from "./history";
import Map from "./Map";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [],
            location: {
                lat: null,
                lng: null,
            },
            clicklocation: {
                lat: null,
                lng: null,
            },
        };
    }

    render() {
        console.log("center: " + mapDefaultConfig.center.lat + "," + mapDefaultConfig.center.lng + ", zoom: " + mapDefaultConfig.zoom);
        // console.log("history: "+this.state.history);
        return (
            <div className="main-wrapper">
                <div>
                    <LocationButton
                        setCurrentLocation={this.setCurrentLocation} />
                </div>
                <div>
                    <Map
                        center={mapDefaultConfig.center}
                        zoom={mapDefaultConfig.zoom}
                        history={this.state.history}
                        addRecord={(h) => this.addRecord(h)}
                        location={this.state.location}
                        clicklocation={this.state.clicklocation}
                        setClickLocation={(loc) => this.setClickLocation(loc)}
                        setCurrentLocation={this.setCurrentLocation} />
                </div>
                <div>
                    <History
                        history={this.state.history}
                        deleteRecord={() => this.deleteRecord()}
                        onCheckboxChange={(num) => this.onCheckboxChange(num)} />
                </div>
            </div>

        );
    }

    deleteRecord() {
        console.log("Delete history");
        var history = this.state.history.slice();
        var new_history = []
        for (let h of history) {
            console.log(h.num, h.checked);
            if (h.checked === false) {
                console.log("add history: " + h.num);
                new_history.push(h);
            }
        }
        // console.log(new_history);
        this.setState({ history: new_history });
    }

    addRecord(new_history) {
        console.log("Add history " + new_history.num);
        var history = this.state.history.slice();
        new_history.num = history.length > 0 ? history[history.length - 1].num + 1 : 0;
        history.push(new_history);
        this.setState({ history: history });
    }

    onCheckboxChange(num) {
        console.log("onCheckboxChanged " + num);
        var history = this.state.history.slice();
        for (var h of history) {
            if (h.num === num) {
                // console.log("ccccc");
                h.checked = !h.checked;
            }
        }
        this.setState({ history: history });
    }

    setCurrentLocation = () => {
        console.log("setCurrentLocation: " + this === App);
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log("current location: " + position.coords.latitude + ", " + position.coords.longitude);
                this.setState({
                    location: { lat: position.coords.latitude, lng: position.coords.longitude },
                });
            });
        }
    }

    setClickLocation(loc) {
        this.setState({ clicklocation: loc });
    }
}

class LocationButton extends React.Component {
    onClick() {
        console.log("get location");
        this.props.setCurrentLocation();
    }

    render() {
        return (
            <button
                className="searchbutton"
                onClick={this.onClick}>
                Get Location
            </button>
        )
    }
}

export default App;