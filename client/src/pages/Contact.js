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
                    <ul className="contactList">
                        <li>
                            <p>Carson Wack</p>
                            <p>Email</p>
                            <p>LinkedIn</p>
                        </li>
                        <li>
                            <p>Curtis Yungen</p>
                            <p>curtisyungen@gmail.com</p>
                            <p>linkedin.com/in/curtisyungen</p>
                        </li>
                        <li>
                            <p>Joseph Bizar</p>
                            <p>Email</p>
                            <p>LinkedIn</p>
                        </li>
                        <li>
                            <p>Meri Arzumanyan</p>
                            <p>Email</p>
                            <p>LinkedIn</p>
                        </li>
                        <li>
                            <p>Swapna Lia Anil</p>
                            <p>Email</p>
                            <p>LinkedIn</p>
                        </li>
                        <li>
                            <p>Vahe Minasyan</p>
                            <p>Email</p>
                            <p>LinkedIn</p>
                        </li>
                    </ul>
                </div>
            </Container>
        );
    }
}

export default Contact;