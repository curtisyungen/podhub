import React, { Component } from "react";
// import Container from "../components/Container/container";
import API from "../utils/API";

class PodcastSearch extends Component {

    constructor(props) {
        super(props);

        this.state = {
            podcasts: [],
            message: ""
        }
    }

    componentDidMount = () => {
        this.getPodcasts();
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
            this.state.podcasts.length > 0 ? (
                podcasts.map((podcast) => {
                    <Podcast 
                        key={podcast.id}
                        podcastId={podcast.id}
                        podcastName={podcast.title_original}
                        podcastLogo={podcast.image}
                        thumbnail={podcast.thumbnail}
                    />
                })
            ) : (
                <h4>{this.state.message}</h4>
            )
        );
    }
}

export default PodcastSearch;