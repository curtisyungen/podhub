import React, { Component } from "react";
import Container from "../components/Container/container";
import Podcast from "../components/Podcast/podcast";
import API from "../utils/API";
import "./PodcastSearch.css";

class PodcastSearch extends Component {

    constructor(props) {
        super(props);

        this.state = {
            podcastSearch: "",
            podcasts: [],
            message: ""
        }
    }

    componentDidMount = () => {
        console.log(this.props);
        this.setState({
            podcastSearch: this.props.userQuery,
        }, () => this.getPodcasts());
    }

    getPodcasts = () => {
        API.getPodcasts(this.state.podcastSearch)
          .then(res => {
            this.setState({
              podcasts: res.data.results
            });
          })
          .catch((error) => {
            console.log("Error getting podcasts", error);
            this.setState({
              podcasts: [],
              message: "We couldn't find a match."
            })
          });
      };

    render() {
        return (
            <Container>
                {this.state.podcasts.length > 0 ? (
                    this.state.podcasts.map((podcast) => 
                        <span className="podcastResult">
                            <Podcast 
                                key={podcast.id}
                                podcastId={podcast.id}
                                podcastName={podcast.title_original}
                                podcastLogo={podcast.image}
                                thumbnail={podcast.thumbnail}
                            />
                        </span>
                    )
                ) : (
                    <h4>{this.state.message}</h4>
                )}
            </Container>
        );
    }
}

export default PodcastSearch;