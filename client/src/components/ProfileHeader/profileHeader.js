import React, { Component } from "react";
import API from "../../utils/API";
import "./profileHeader.css";

class ProfileHeader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            userLocation: "Seattle, WA",
            userBio: "My name is Curtis.",
            editProfile: false,
            newLocation: "",
            newBio: "",
            userIsFollowed: null,
            numPosts: 0,
            numFollowers: 0,
            numFollowing: 0,
            followers: [],
            following: [],
            showFollowersModal: false,
            showFollowingModal: false
        }
    }

    componentDidMount = () => {
        this.getNumFollowers();
        this.getNumFollowing();
        this.isUserFollowed();
        this.setState({
            user: this.props.location.state.user
          });
    }

    // Update profile information if subject user changes
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.location.state.user.id !== this.props.location.state.user.id) {
            this.getNumFollowers();
            this.getNumFollowing();
            this.isUserFollowed();
            this.setState({
                user: this.props.location.state.user
            });
        }

        if (prevState.userIsFollowed !== this.state.userIsFollowed) {
            this.getNumFollowers();
            this.getNumFollowing();
        }
    }


    // SET UP PROFILE
    // =============================================== 

    // Get number of FOLLOWERS for user
    getNumFollowers = () => {
        API.getFollowers(this.props.location.state.user.id)
            .then(res => {
                this.setState({
                    numFollowers: res.data[0].count
                });
            })
            .catch(() => {
                this.setState({
                    numFollowers: 0
                });
            });
    };

    // Get number of other users that current user is FOLLOWING
    getNumFollowing = () => {
        API.getFollowing(this.props.location.state.user.id)
            .then(res => {
                this.setState({
                    numFollowing: res.data[0].count
                });
            })
            .catch(() => {
                this.setState({
                    numFollowing: 0
                });
            });
    };


    // EDIT PROFILE
    // =============================================== 

    editProfile = () => {
        this.setState({
            editProfile: true
        });
    }

    setNewBio = (event) => {
        this.setState({
            newBio: event.target.value
        });
    }

    setNewLocation = (event) => {
        this.setState({
            newLocation: event.target.value
        });
    }

    saveProfile = () => {
        this.setState({
            userBio: this.state.newBio,
            userLocation: this.state.newLocation,
            editProfile: false
        });
    }

    cancelEditProfile = () => {
        this.setState({
            editProfile: false
        });
    }


    // LIST OF FOLLOWERS / FOLLOWINGS, MODALS
    // ===============================================

    // Get list of user's followers
    getFollowers = () => {
        API.isFollowedByUsers(this.state.user.id)
            .then(res => {
                this.setState({
                    followers: res.data,
                }, () => { this.showFollowersModal() });
            });
    }

    // Get list of other users that user is following
    getUsersFollowed = () => {
        API.getUsersFollowed(this.state.user.id)
            .then(res => {
                this.setState({
                    following: res.data
                }, () => { this.showFollowingModal() });
            });
    }

    // Show modal that displays followers
    showFollowersModal = () => {
        this.setState({
            showFollowersModal: true
        });
    }

    // Show modal that displays other users being followed
    showFollowingModal = () => {
        this.setState({
            showFollowingModal: true
        });
    }

    // Hide Followers and Followings modals
    hideFollowersModal = () => {
        this.setState({
            showFollowersModal: false,
            showFollowingModal: false
        });
    }

    // FOLLOW / UNFOLLOW USER
    // ===============================================

    // Checks to see if user is following viewed user
    isUserFollowed = () => {

        // Get current user's ID
        let currUserId = JSON.parse(localStorage.getItem("user")).id;

        // Get list of users followed by current user
        API.getUsersFollowed(currUserId)
            .then(res => {

                let usersFollowed = res.data;

                // Look for viewed user's ID in list of followed users
                usersFollowed.forEach(element => {
                    if (this.state.user.id === element.id) {

                        this.setState({
                            userIsFollowed: true
                        });

                        return;
                    }
                });
            });
    }

    // Follows user if follow button is clicked
    followUser = (userId) => {

        let that = this;
        let currUserId = JSON.parse(localStorage.getItem("user")).id;

        API.followUser(currUserId, userId)
            .then(function (response) {
                that.setState({
                    userIsFollowed: true
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // Unfollows user if unfollow button is clicked
    unfollowUser = (userId) => {

        let that = this;
        let currUserId = JSON.parse(localStorage.getItem("user")).id;

        API.unFollowUser(currUserId, userId)
            .then(function (response) {
                that.setState({
                    userIsFollowed: false
                });
            })
            .catch((err) =>
                console.log(err)
            )
    }


    // OTHER
    // ===============================================

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    // Scrolls to post section when Posts is clicked from profile header
    scrollTo = () => {
        window.scrollTo(0, 500);
    }


    render() {
        return (
            <div className="row userProfile rounded bg-dark text-white">
                <div className="col-3">
                    <img
                        src={this.props.location.state.user.profileImage}
                        alt="User"
                        id="userMainProfileImage"
                        className="rounded border-white"
                    />
                </div>

                <div className="col">

                    {/* User Name */}

                    <Row>
                        <h2 className="paddingTop userName">{this.props.location.state.user.name}</h2>
                    </Row>

                    {/* Follow / Edit Profile Button */}

                    {this.state.user.id !== JSON.parse(localStorage.getItem("user")).id ? (
                        this.state.userIsFollowed ? (
                            <button
                                className="btn btn-outline-light followBtn"
                                onClick={(event) => { event.preventDefault(); this.unfollowUser(this.state.user.id) }}
                            >
                                Unfollow
                        </button>
                        ) : (
                                <button
                                    className="btn btn-outline-light followBtn"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        this.followUser(this.state.user.id)
                                    }}
                                >
                                    Follow
                        </button>
                            )
                    ) : (
                            <button
                                className="btn btn-outline-light editProfileBtn"
                                onClick={(event) => {
                                    event.preventDefault();
                                    this.editProfile();
                                }}
                            >
                                Edit Profile
                      </button>
                        )
                    }

                    {/* User Info: Posts, Followers, Following */}

                    <Row>

                        {this.state.editProfile ? (
                            <form>

                                {/* EDIT LOCATION */}
                                <input
                                    type="text"
                                    className="userLocation"
                                    onChange={this.setNewLocation}
                                    value={this.state.newLocation}
                                >
                                    {this.state.userLocation}
                                </input>

                                {/* EDIT BIO */}
                                <textarea
                                    className="userBioTextarea"
                                    maxLength="160"
                                    onChange={this.setNewBio}
                                    value={this.state.newBio}
                                >
                                    {this.state.userBio}
                                </textarea>

                            </form>

                        ) : (

                                <span>

                                    {/* LOCATION */}
                                    <div id="userLocation">
                                        {this.state.userLocation}
                                    </div>

                                    {/* BIO */}
                                    <div id="userBio">
                                        {this.state.userBio}
                                    </div>

                                </span>
                            )}

                        {/* POSTS */}

                        <div className="btn btn-dark postsBtn" onClick={this.scrollTo}>
                            Posts:&nbsp; {this.state.posts.length}
                        </div>

                        {/* FOLLOWERS */}

                        <button
                            className="btn btn-dark"
                            onClick={this.getFollowers}
                        >
                            Followers:&nbsp;{this.state.numFollowers}
                        </button>

                        {/* FOLLOWING */}

                        <button
                            className="btn btn-dark"
                            onClick={this.getUsersFollowed}
                        >
                            Following:&nbsp;{this.state.numFollowing}
                        </button>

                        {/* FOLLOWERS MODAL */}

                        <Modal
                            open={this.state.showFollowersModal}
                            onClose={this.hideFollowersModal}
                            classNames={{ modal: "followersModal" }}
                        >
                            <h4 className="modalTitle">Followers</h4>

                            {this.state.followers.length ? (
                                <List>
                                    {this.state.followers.map(user =>
                                        <div className="container tile m-2 userList" key={user.id}>
                                            <User
                                                userId={user.id}
                                                userName={user.name}
                                                userImage={user.image}
                                                handler={this.hideFollowersModal}
                                            />
                                        </div>
                                    )}
                                </List>
                            ) : (
                                    this.state.message !== "Loading..." ? (
                                        <h2>No followers found.</h2>
                                    ) : (
                                            <></>
                                        )
                                )}

                            <h2>{this.state.message}</h2>

                        </Modal>

                        {/* FOLLOWING MODAL */}

                        <Modal
                            open={this.state.showFollowingModal}
                            onClose={this.hideFollowersModal}
                            classNames={{ modal: "followersModal" }}
                        >
                            <h4 className="modalTitle">Following</h4>

                            {this.state.following.length ? (
                                <List>
                                    {this.state.following.map(user =>
                                        <div className="container tile m-2 userList" key={user.id}>
                                            <User
                                                userId={user.id}
                                                userName={user.name}
                                                userImage={user.profileImage}
                                                handler={this.hideFollowersModal}
                                            />
                                        </div>
                                    )}
                                </List>
                            ) : (
                                    this.state.message !== "Loading..." ? (
                                        <h2>User is not following anyone.</h2>
                                    ) : (
                                            <></>
                                        )
                                )}

                            <h2>{this.state.message}</h2>

                        </Modal>
                    </Row>
                </div>
            </div>
        );
    }

}

export default ProfileHeader;