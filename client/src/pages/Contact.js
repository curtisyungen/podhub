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
                            Carson Wack
                            Email
                            LinkedIn
                        </li>
                        <li>
                            Curtis Yungen
                            curtisyungen@gmail.com
                            linkedin.com/in/curtisyungen
                        </li>
                        <li>
                            Joseph Bizar
                            Email
                            LinkedIn
                        </li>
                        <li>
                            Meri Arzumanyan
                            Email
                            LinkedIn
                        </li>
                        <li>
                            Swapna Lia Anil
                            Email
                            LinkedIn
                        </li>
                        <li>
                            Vahe Minasyan
                            Email
                            LinkedIn
                        </li>
                    </ul>
                </div>
            </Container>
        );
    }
}

export default Contact;