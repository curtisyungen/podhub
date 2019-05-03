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
                    <div className="teamMember">
                        <img src="" />
                        <p>Carson Wack</p>
                        <p></p>
                        <a href="" target="_blank"></a>
                    </div>

                    <div className="teamMember">
                        <img src="" />
                        <p>Curtis Yungen</p>
                        <p>curtisyungen@gmail.com</p>
                        <a href="https://linkedin.com/in/curtisyungen" target="_blank">LinkedIn</a>
                    </div>

                    <div className="teamMember">
                        <img src="" />
                        <p>Joseph Bizar</p>
                        <p></p>
                        <a href="" target="_blank"></a>
                    </div>

                    <div className="teamMember">
                        <img src="" />
                        <p>Meri Arzumanyan</p>
                        <p></p>
                        <a href="" target="_blank"></a>
                    </div>

                    <div className="teamMember">
                        <img src="" />
                        <p>Swapna Lia Anil</p>
                        <p></p>
                        <a href="" target="_blank"></a>
                    </div>

                    <div className="teamMember">
                        <img src="" />
                        <p>Vahe Minasyan</p>
                        <p></p>
                        <a href="" target="_blank"></a>
                    </div>
                </div>
            </Container>
        );
    }
}

export default Contact;