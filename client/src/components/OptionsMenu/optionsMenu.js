import React, { Component } from "react";
import { Link } from "react-router-dom";
import Container from "../Container/container";
import onClickOutside from "react-onclickoutside";
import API from "../../utils/API";
import "./optionsMenu.css";

class OptionsMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            openSettings: false
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

    openSettings = () => {
        this.setState({
            openSettings: true
        });
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

                    {/* PROFILE SETTINGS */}
                    <li 
                        onClick={this.openSettings}
                    >
                    Settings
                    </li>

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

                {this.state.openSettings ? (
                    <Link 
                        to={{
                            pathname: "/settings",
                            state: {
                                user: this.state.user
                            }
                        }}
                    />
                ) : (
                    <></>
                )}

            </Container>
        );
    }
};

export default onClickOutside(OptionsMenu);



