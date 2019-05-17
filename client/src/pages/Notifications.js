import React, { Component } from "react";
import Container from "../components/Container/container";
import Row from "../components/Row/row";
import API from "../utils/API";
import "./Notifications.css"
import NotificationComponent from "../components/Notification/NotificationComponent";

// NOTIFICATION PAGE

class Notification extends Component {

    state = {
        notifications: [
            // {
            //     id: 111,
            //     userId:1,
            //     userName: "Vahe Minasyan",
            //     userImage:"https://via.placeholder.com/150C/O",
            //     postId:26,
            //     date:"2019-04-16 05:30:39",
            //     type:"like"
            // },

            // {
            //     id: 222,
            //     userId:2,
            //     userName: "John Smith",
            //     userImage:"https://via.placeholder.com/150C",
            //     postId:35,
            //     date: "2019-04-18 04:05:01",
            //     type: "comment"
            // },

            // {
            //     id: 2333,
            //     userId:3,
            //     userName:"Ricardo Joe",
            //     userImage:"https://via.placeholder.com/150C/O",
            //     date: "2019-05-10 22:24:35",
            //     type: "follower"
            // },
        ],

        message: "There are no notifications"
    };

    componentDidMount() {
        //console.log(this.props.user.id)
        //this.getNotifications(this.props.user.id)
    };

    // Get all notification history for given user
    getNotifications = userId => {
        API.getNotifications(userId)
            .then(res => {
                this.setState({
                    notifications: res.data
                })
            })
    }

    render() {
        return (
            <div className={`container bg-${this.props.theme} rounded`} id="post-container">
                <Row>
                    {
                        this.state.notifications.length > 0
                            ?
                            (
                                <Container>
                                    {this.state.notifications.map(notification => (
                                        <NotificationComponent
                                            key={notification.id}
                                            userId={notification.userId}
                                            userName={notification.userName}
                                            userImage={notification.userImage}
                                            postId={notification.postId}
                                            date={notification.date}
                                            type={notification.type}
                                            theme={this.props.theme}
                                            loginUser={this.props.user}
                                        />
                                    ))}

                                </Container>
                            )
                            :
                            (
                                <h4 className="text-center">{this.state.message}</h4>
                            )}
                </Row>
            </div>
        )
    }
}

export default Notification;
