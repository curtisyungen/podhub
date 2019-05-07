import React, { Component } from "react";
import Container from "../components/Container/container";
// import Row from "../components/Row/row";
// import List from "../components/List/list";
import API from "../utils/API";
import "./Settings.css";

class Settings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: "",
            newName: null,
        }
    }

    componentDidMount = () => {
        this.setState({
            user: this.props.location.state.user
        }, () => {
            this.props.location.hideOptionsMenu();
        });
    }

    changeName = (event) => {
        this.setState({
            newName: event.target.value
        });
    }

    saveName = (event) => {
        event.preventDefault();
        console.log(this.state.newName);
    }

    deleteAccount = () => {
        if (window.confirm("Are you sure?")) {

            API.deleteUser(this.state.user)
                .then(res => {
                    this.logout();
                })
                .catch((err) => {
                    console.log("Error deleting user: ", err);
                });
        }
    }

    render() {
        return (
            <Container>
                <div
                    className={`bg-${this.props.theme} settings-bg-${this.props.theme}`}
                >

                    {/* USER NAME */}
                    <h4>{this.state.user.name} || {this.props.location.state.user}</h4>
                    <br/>

                    {/* NAME */}
                    <div>
                        <label>Change Name </label>
                        <form id="changeNameForm">
                            <input 
                                type="text" 
                                className="rounded"
                                placeholder={this.props.location.state.user.name}
                                onChange={this.changeName}
                                value={this.state.newName}
                            />
                            <button
                                className="btn btn-success btn-sm"
                                onClick={this.saveName}
                            >
                                Save
                            </button>
                        </form>
                    </div>
                    
                    {/* PHOTO */}
                    {/* <div>
                        <label>Change Photo</label>
                        <form>
                            <input type="file"/>
                        </form>
                    </div> */}
                    
                    {/* THEME */}
                    <div>
                        <label>Theme </label>
                        <button
                            className="btn btn-dark btn-sm theme dark"
                            name="dark"
                            onClick={this.props.darkTheme}
                        >
                        Dark 
                        </button>
                        <button
                            className="btn btn-light btn-sm theme light"
                            name="light"
                            onClick={this.props.lightTheme}
                        >
                        Light
                        </button>
                    </div>

                    {/* DELETE ACCOUNT */}
                    <p
                        className="deleteAcct"
                        onClick={this.deleteAccount}
                    >
                    Delete Account
                    </p>

                </div>
            </Container>
        );
    }
}

export default Settings;