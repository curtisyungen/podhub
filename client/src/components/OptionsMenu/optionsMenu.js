import React, { Component } from "react";
import Container from "../Container/container";
import Modal from "react-responsive-modal";
import onClickOutside from "react-onclickoutside";
import API from "../../utils/API";
import "./optionsMenu.css";

class OptionsMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null
        }
    }

    componentDidMount = () => {
        this.setState({
            user: this.props.user
        });
    }

    handleClickOutside = (event) => {
        event.preventDefault();
        this.props.hideOptionsMenu();
    }

    logout = () => {
        this.props.logout();
    }

    deleteAccount = () => {
        if (window.confirm("Are you sure?")) {

            alert("Fine then, loser.");

            API.deleteUser(this.state.user)
                .then(res => {
                    this.logout();
                    alert("And don't come back!");
                });
        }
    }

    render() {
        return (
            <Container>

                {/* OPTIONS MENU */}

                <ul className="optionsList">

                    {/* LOG OUT */}
                    <li
                        onClick={this.logout}
                    >
                    Log Out
                    </li>

                    {/* DELETE ACCOUNT */}
                    <li
                        onClick={this.deleteAccount}
                    >
                    Delete Account
                    </li>
                </ul>

            </Container>
        );
    }
};

export default onClickOutside(OptionsMenu);



