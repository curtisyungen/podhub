import React, { Component } from "react";
import Container from "../components/Container/container";
import Row from "../components/Row/row";
import Post from "../components/Post/post";
import API from "../utils/API";
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import "./Home.css";

library.add(faComment);
library.add(faHeart);

let moment = require("moment");

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            message: "",
            user: null,
            scrollToPost: false,
            scrollToPostId: "",
        }
    }

    componentDidMount() {
        this.getPosts();
        console.log(this.props.location)
        if (this.props.location.state !== undefined) {
            this.setState({
                user: this.props.location.state.user,
                scrollToPost: this.props.location.state.scrollToPost,
                scrollToPostId: this.props.location.state.scrollToPostId
            });
            if (this.props.location.state.scrollToPost !== undefined && this.props.location.state.scrollToPostId !== undefined) {
                this.scrollToElement();
            }
        }
    }


    // POSTS
    // ===============================================

    // Get posts from user and those that user is following
    getPosts = () => {
        this.setState({
            message: "Getting posts..."
        });

        API.getFollowingsPosts(this.props.user.id)
            .then(res => {
                var message = "";

                if (res.data.length === 0) {
                    message = "No posts found.";
                }

                this.setState({
                    message: message,
                    posts: res.data
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    message: "No posts found.",
                    posts: []
                });
            });
    };


    // OTHER
    // ===============================================

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    // Takes (True, Audio Link) and passes them to App.js
    toHomeAndProfile = (value, link, podName, epName) => {
        this.props.toApp(value, link, podName, epName);
    }

    // Handle SCROLLING to specific post
    scrollToElement = () => {
        {
            setTimeout(() => {
                var id = this.state.scrollToPostId;
                var element = document.getElementById(id);
                element.scrollIntoView(true);
                window.scrollBy(0, -100)
                this.setScrollToPostFalse();
            }, 1000)
        }
    }

    setScrollToPostFalse = () => {
        this.setState({
            scrollToPost: false,
            scrollToPostId: ""
        })
    }

    render() {
        return (
            <div className={`container bg-${this.props.theme} rounded`} id="post-container">
                <Row>
                    {this.state.posts.length > 0
                        ? (
                            <Container>
                                {this.state.posts.map(post => (
                                    <Post
                                        key={post.id}
                                        userId={post.postedBy}
                                        userName={post.userName}
                                        userImage={post.userImage}
                                        date={moment(post.createdAt).format("LLL")}
                                        podcastId={post.podcastId}
                                        podcastName={post.podcastName}
                                        podcastLogo={post.podcastLogo}
                                        episodeId={post.episodeId}
                                        episodeName={post.episodeName}
                                        description={post.description}
                                        audioLink={post.audioLink}
                                        userMessage={post.userMessage}
                                        numLikes={post.numberOfLikes}
                                        numComments={post.numberOfComments}
                                        postId={post.id}
                                        updateParentState={this.getPosts}
                                        toHomeAndProfile={this.toHomeAndProfile}
                                        theme={this.props.theme}
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
        );
    }
}

export default Home;
