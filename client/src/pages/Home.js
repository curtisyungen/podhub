import React, { Component } from "react";
import Container from "../components/Container/container";
import Row from "../components/Row/row";
//import Col from "../components/Col/col";
import API from "../utils/API";
import PostCard from "../components/PostCard/postCard";
var moment = require('moment');

class Home extends Component {

    state = {
        posts: [],
        message: "Loading..."
    };
    
    componentDidMount() {
        this.getPosts();
    };

    // Add function to call getPost function every time when something is posted or every 2 mins or so

    // API request to get the user's and his follower's posts
    getPosts = () => {
        API.getFollowingsPosts(this.props.user.id)
            .then(res => {
                this.setState({
                    posts: res.data
                });
            })
            .catch(() => {
                this.setState({
                    posts: [],
                    message: "No podcast found, please post something or follow someone to see the feeds."
                });
            });
    };

    render() {
        return (
            <div className="container bg-dark rounded">
                <Row>
                    {this.state && this.state.posts && this.state.posts.length > 0 ? (
                        <Container>
                            {this.state.posts.map(post => (
                                <PostCard
                                    key={post.id}
                                    userPhoto={post.userImage}
                                    userName={post.userName}
                                    date={moment(post.createdAt).format("LLL")}
                                    podcastName={post.podcastName}
                                    podcastLogo={post.podcastLogo}
                                    episodeName={post.episodeName}
                                    description={post.description}
                                    audioLink={post.audioLink}
                                    userMessage={post.userMessage}
                                    likes={post.numberOfLikes}
                                    comments={post.numberOfComments}
                                    handlePostDelete={this.handlePostDelete}
                                />
                            ))}
                        </Container>
                    ) : (
                            <h4 className="text-center">{this.state.message}</h4>
                        )}
                </Row>
            </div>
        )
    }
}

export default Home;
