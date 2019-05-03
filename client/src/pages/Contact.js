import React, { Component } from "react";
import Container from "../components/Container/container";
import API from "../utils/API";
import "./Contact.css";

class Contact extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
        }
    }

    componentDidMount = () => {
        this.setState({
            user: this.props.location.state.user
        }, () => {console.log(this.state)});
    }

    render() {
        return (
            <Container>
                <div
                    className={`bg-${this.props.theme} contacts-bg-${this.props.theme}`}
                >
                    <ul>
                        <li>Carson Wack</li>
                        <li>Curtis Yungen</li>
                        <li>Joseph Bizar</li>
                        <li>Meri Arzumanyan</li>
                        <li>Swapna Lia Anil</li>
                        <li>Vahe Minasyan</li>
                    </ul>
                </div>
            </Container>
        );
    }
}

export default Contact;