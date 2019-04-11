import React, { Component } from "react";
import Container from "../Container/container";
import Modal from "react-responsive-modal";
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

    openSettings = (event) => {
        event.preventDefault();
        this.props.hideOptionsMenu();
        
        this.setState({
            showSettingsMenu: true
        }, () => {console.log(this.state);});
    }

    closeSettings = () => {
        this.setState({
            showSettingsMenu: false
        });
    }

    render() {
        return (
            <Container>

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
                    // classNames={{ modal: "customModal", overlay: "customOverlay", closeButton: "customCloseButton" }}
                >   
                    <div>
                        Modal
                    </div>
                </Modal>

            </Container>
        );
    }
};

export default OptionsMenu;



