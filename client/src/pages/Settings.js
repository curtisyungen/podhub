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
            user: null,
        }
    }

    componentDidMount = () => {
        this.setState({
            user: this.props.location.state.user
        }, () => {
            this.props.location.hideOptionsMenu();
        });
    }

    deleteAccount = () => {
        if (window.confirm("Are you sure?")) {

            API.deleteUser(this.state.user)
                .then(res => {
                    this.logout();
                });
        }
    }

    submitFile = event => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("file", this.state.file[0]);

        let header = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };

        API.uploadImageAWS(this.props.user.id, formData, header)
            .then((res) => {
                console.log(res);
                this.setState({
                    awsImageurl: res.data.Location
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        return (
            <Container>
                <div
                    className={`bg-${this.props.theme} settings-bg-${this.props.theme}`}
                >

                    {/* USER NAME */}
                    <h4>{this.props.location.state.user.name}</h4>
                    <br/>

                    {/* NAME */}
                    {/* <div>
                        <label>Change Name </label>
                        {this.props.location.state.user.name}
                    </div> */}

                    {/* USER IMAGE */}
                    <div>
                        <form onSubmit={this.submitFile}>
                            <input
                                label="upload file"
                                type="file"
                                onChange={this.handleFileUpload}
                            />
                            <button type="submit">Confirm</button>
                        </form>
                    </div>
                    
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
                    {/* <p
                        onClick={this.deleteAccount}
                    >
                    Delete Account
                    </p> */}

                </div>
            </Container>
        );
    }
}

export default Settings;