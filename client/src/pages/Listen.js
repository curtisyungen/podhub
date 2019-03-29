import React, { Component } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container/container";
import Row from "../components/Row/row";
import Modal from "react-responsive-modal";
import AudioPlayer from "../components/AudioPlayer/audioPlayer";
import Portal from "../components/Portal/portal";
import API from "../utils/API";

// LISTEN TO PODCAST PAGE
// This page allows a user to listen to a podcast.
// It renders a ListenView component which contains all relevant info on the podcast as well as the audio player.

class Listen extends Component {

    state = {
        podcastId: "",
        podcastName: "",
        podcastLogo: "",
        episodeId: "",
        episodeName: "",
        date: "",
        description: "",
        audioLink: "",
        showModal: false,
        showPortal: false,
        speed: 1.0,
    };

    componentDidMount = () => {
        this.setState({
            podcastId: this.props.location.state.podcastId,
            podcastName: this.props.location.state.podcastName,
            podcastLogo: this.props.location.state.podcastLogo,
            episodeId: this.props.location.state.episodeId,
            episodeName: this.props.location.state.episodeName,
            date: this.props.location.state.date,
            description: this.props.location.state.description,
            audioLink: this.props.location.state.audioLink
        });
    }

    // Opens the Share Episode modal
    // Executed upon user clicking "Share" button on page
    handleShowModal = event => {
        event.preventDefault();
        this.setState({
            showModal: true
        });
    }

    // Closes Share Episode modal
    // Executed upon user clicking "Share" button in modal
    handleCloseModal = () => {
        this.setState({
            showModal: false
        });
    }

    // Shares episode as new post on user's profile
    // Executes when user clicks "Share" in modal
    // Closes modal
    handleShareEpisode = event => {
        event.preventDefault();
        this.handleCloseModal();
        alert("shared");
        // Call Share Episode sequence
    }

    // Adds this episode to User's list of Favorite Episodes
    addToFavorites = event => {
        event.preventDefault();
        API.addEpisodeToFavorites(this.state.episodeId);
        alert("Favorited!");
    }

    // Activates pop-out window with podcast audio
    togglePortal = event => {
        event.preventDefault();
        this.setState({
            showPortal: !this.state.showPortal
        });
    }

    changeSpeed = (event) => {
        this.setState({
            speed: event.target.value
        })
    }

    render() {
        return (
            <Container>
                <Row>
                    <Link
                        to={{
                            pathname: "/episodeList",
                            state: {
                                podcastId: this.state.podcastId,
                                podcastName: this.state.podcastName,
                                podcastLogo: this.state.podcastLogo
                            }
                        }}
                    >
                        {this.state.podcastName}
                    </Link>
                    <img src={this.state.podcastLogo} alt="Podcast Logo" />
                </Row>

                <Row>

                    <div>
                        <h4>{this.state.episodeName} &nbsp;|&nbsp; {this.state.date}</h4>

                        <AudioPlayer
                            audioLink={this.state.audioLink}
                            playbackRate={this.state.speed}
                        />
                        <input
                            type="range"
                            min="1"
                            max="2.35"
                            value={this.state.speed}
                            onChange={this.changeSpeed}
                            step=".15"
                            list="steplist"
                        />
                        <label htmlFor="steplist">Speed</label>

                    </div>
                </Row>

                <Row>
                    <div>
                        <p>{this.state.description.replace(/<\/?[^>]+(>|$)/g, "")}</p>
                    </div>

                    <button className="btn btn-primary" onClick={this.handleShowModal}>Share</button>
                    <button className="btn btn-danger" onClick={this.addToFavorites}>Favorite</button>
                    <button className="btn btn-dark" onClick={this.togglePortal}>Open Portal</button>
                </Row>

                {this.state.showPortal && (
                    <Portal>
                        <h4>{this.state.podcastName}</h4>
                        <p>{this.state.episodeName}</p>

                        <AudioPlayer
                            audioLink={this.state.audioLink}
                            playbackRate={this.state.speed}
                        />

                        <input
                            type="range"
                            min="1"
                            max="2.35"
                            value={this.state.speed}
                            onChange={this.changeSpeed}
                            step=".15"
                            list="steplist"
                        />

                        <label for="steplist">Speed</label>

                        <br />

                        <button
                            className="btn btn-primary"
                            onClick={this.togglePortal}
                        >
                            {this.state.podcastName}
                        </button>
                    </Portal>
                )}

                <Modal open={this.state.showModal} onClose={this.handleCloseModal} center>

                    <Container>
                        <div>
                            <h4>{this.state.podcastName}</h4>
                            <img src={this.state.podcastLogo} alt="Podcast Logo" />
                            <p>{this.state.episodeName}</p>
                        </div>

                        <form>
                            <input className="userPostInput" placeholder="Enter message"></input>
                        </form>

                        <button
                            className="btn btn-primary"
                            onClick={this.handleShareEpisode}
                        >
                            Share
                        </button>
                    </Container>

                </Modal>

            </Container>
        )
    }
}

export default Listen;
