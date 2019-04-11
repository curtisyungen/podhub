import React, { Component } from "react";
import Container from "../Container/container";
import Modal from "react-responsive-modal";
import API from "../../utils/API";
import "./optionsMenu.css";

class OptionsMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            showSettingsMenu: false
        }
    }

    componentDidMount = () => {
        this.setState({
            user: this.props.user
        });
    }

    openSettings = () => {
        this.setState({
            showSettingsMenu: true
        }, () => {this.props.hideOptionsMenu()});
    }

    closeSettings = () => {
        this.setState({
            showSettingsMenu: false
        });
    }

    deleteAccount = () => {
        if (window.confirm("Are you sure?")) {

            alert("Fine then, loser.");

            API.deleteUser(this.state.user)
                .then(function() {
                    this.props.logout();
                    alert("And don't come back!");
                });
        }
    }

    render() {
        return (
            <span>

                {/* OPTIONS MENU */}

                <ul className="optionsList">
                    <li
                        onClick={this.openSettings}
                    >
                    Settings
                    </li>

                    <li
                        onClick={this.props.logout}
                    >
                    Log Out
                    </li>
                </ul>

                {/* SETTINGS MENU MODAL */}

                <Modal
                    open={this.state.showSettingsMenu}
                    onClose={this.closeSettings}
                >   
                    <p class="border-bottom">Profile</p>

                    <p class="border-bottom">Account</p>
                    <p 
                        id="deleteAccount"
                        onClick={this.deleteAccount}
                    >
                    Delete Account
                    </p>

                </Modal>

            </span>
        );
    }
};

export default OptionsMenu;



