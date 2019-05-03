import React, { Component } from "react";
import Container from "../components/Container/container";
import API from "../utils/API";

class Contact extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
        }
    }

    componentDidMount = () => {
        this.setState({
            user: this.props.location.state.user,
            theme: this.props.location.state.theme
        }, () => {console.log(this.state)});
    }

    render() {
        return (
            <Container>
                <div>
                    Curtis Yungen
                </div>
            </Container>
        );
    }
}

export default Contact;