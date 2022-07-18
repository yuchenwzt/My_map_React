import React from 'react';
import Script from 'react-load-script';
import { apikey } from "./config";

const url = "https://maps.google.com/maps/api/js?key=" + apikey + "&libraries=places";

class GoogleScript extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scriptStatus: 'no'
        }
    }

    handleScriptCreate() {
        this.setState({ scriptLoaded: false })
    }

    handleScriptError() {
        this.setState({ scriptError: true })
    }

    handleScriptLoad() {
        this.setState({ scriptLoaded: true, scriptStatus: 'yes' })
    }

    render() {
        console.log("map api " + url);
        return (
            <>
                <Script
                    url={url}
                    onCreate={this.handleScriptCreate.bind(this)}
                    onError={this.handleScriptError.bind(this)}
                    onLoad={this.handleScriptLoad.bind(this)}
                />
            </>
        );
    }
}

export default GoogleScript;
export {url};