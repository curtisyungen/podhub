import React, { Component } from "react";
import Container from "../Container/container";
import "./optionsMenu.css";

class OptionsMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null
        }
    }

    componentDidMount = () => {
        console.log(this.props);
        this.setState({
            user: this.props.user
        });
    }

    render() {
        return (
            <Container>
                <ul className="optionsList">
                    <li

                    >
                    Settings
                    </li>

                    <li
                        onClick={this.props.logout}
                    >
                    Log Out
                    </li>
                </ul>

            </Container>
        );
    }
};

export default OptionsMenu;



