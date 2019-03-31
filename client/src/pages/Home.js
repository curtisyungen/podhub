import React, { Component } from "react";
import Container from "../components/Container/container";
import Row from "../components/Row/row";
//import Col from "../components/Col/col";
import API from "../utils/API";
import PostCard from "../components/PostCard/postCard";

class Home extends Component {
    state = {
        posts: [],
        message: "Loading ..."
    };
    componentDidMount() {
        this.getPosts();
        console.log(this.props.user.id)
    };

    // Add function to call getPost function every time when something is posted or every 2 mins or so


    // API request to get the user's and his follower's posts
    getPosts = () => {
        API.getFollowingsPosts(this.props.user.id)
            .then(res =>
                this.setState({
                    posts: res.data
                })
                //console.log(res.data)
            )
            .catch(() =>
                this.setState({
                    posts: [],
                    message: "No podcast found, please post something or follow someone to see the feeds."
                })
            );
    };

    render() {
        console.log(this.props.user.id)
        console.log(this.state.posts.length)
        return (
            <div>
                <div>
                    {!!this.state && !!this.state.posts && this.state.posts.length > 0 ? (
                        <div>
                            {this.state.posts.map(post => (
                                <PostCard
                                    key={post.id}
                                    photo={this.props.user.profileImage}
                                    name={post.name}
                                    date={post.createdAt}
                                    message={post.message}
                                    icon={post.imageIcon}
                                    title={post.title}
                                    description={post.details}
                                    link={post.link}
                                    likes={post.numberOfLikes}
                                    comments={post.numberOfComments}
                                />
                            ))}
                        </div>
                    ) : (
                            <h4 className="text-center">{this.state.message}</h4>
                        )}
                </div>
            </div>
        )
    }
}

export default Home;
