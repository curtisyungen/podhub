import React, { Component } from "react";
import Container from "../components/Container/container";
import Row from "../components/Row/row";
import List from "../components/List/list";
import API from "../utils/API";

class Settings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
        }
    }

    componentDidMount = () => {
        this.setState({
            user: this.props.user
        });
    }

    render() {
        return (
            <h4>{this.state.user}</h4>
        );
    }
}

export default Settings;