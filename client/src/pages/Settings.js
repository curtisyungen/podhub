import React, { Component } from "react";
import Container from "../components/Container/container";
import Row from "../components/Row/row";
import List from "../components/List/list";
import API from "../utils/API";

class Settings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
        }
    }

    componentDidMount = () => {
        this.setState({
            user: this.props.user
        });
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
            <span>
                <h4>{this.props.user}</h4>
                <br/>

                <h4 className="border-bottom">Profile</h4>
                <br/>
                <p>Change Name</p>
                <p>Change Photo</p>

                <h4 className="border-bottom">Account</h4>
                <p
                    onClick={this.deleteAccount}
                >
                Delete Account
                </p>
                
            </span>
        );
    }
}

export default Settings;