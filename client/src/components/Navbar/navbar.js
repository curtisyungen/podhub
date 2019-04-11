import React, { Component } from "react";
import { Link } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser, faHome, faCog } from '@fortawesome/free-solid-svg-icons'
import Logo from "./purple_back.png";
import NavbarAudio from "../NavbarAudio/navbarAudio";
import Popup from "reactjs-popup";
import OptionsMenu from "../OptionsMenu/optionsMenu";
import "./navbar.css";

library.add(faSearch, faUser, faHome, faCog);

// NAVBAR COMPONENT
// Rendered by App.js on every page
// Contains Logo, links to Home, Profile, User Search, Podcast Search form, and logout button
// Can also display audio player

class Navbar extends Component {

  state = {
    remove: false,
    speed: 1.0,
    showOptionsMenu: false
  };


  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick);
  }

  handleClick = (event) => {
    if (this.menuRef && !this.menuRef.contains(event.target)) {
      this.hideOptionsMenu();
    }
  }

  // NAVBAR AUDIO PLAYER
  // ====================================

  // Change speed of audio playback
  changeSpeed = (event) => {
    this.setState({
      speed: event.target.value
    });
  }


  // OPTIONS MENU
  // ====================================

  showOptionsMenu = () => {
    this.setState({
      showOptionsMenu: true
    });
  }

  hideOptionsMenu = () => {
    this.setState({
      showOptionsMenu: false
    });
  }


  // OTHER
  // ====================================

  // Prevent Enter keypress from refreshing window
  suppressEnter = (event) => {
    if (window.event.keyCode === 13) {
      event.preventDefault();
    }
  }


  render() {

    const { podcastSearch, handleInputChange, hidePodcasts, logout, user, showAudio, hideAudio } = this.props;

    return (

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container fluid">

          {/* Podhub Logo */}

          <div className="navbar-header">
            <Link className="navbarText navbar-brand" to="/home">
              <img src={Logo} alt="logo" id="size" />
            </Link>
          </div>

          {/* Hamburger Menu */}

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation Menu */}

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav">

              {/* Home */}

              <li className="nav-item">
                <Link
                  to="/home"
                  className={
                    window.location.pathname === "/home"
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  <FontAwesomeIcon icon="home" />
                  &nbsp; Home
                </Link>
              </li>

              {/* Profile */}

              <li className="nav-item">
                <Link
                  to={{
                    pathname: "/profile",
                    state: {
                      user: user
                    }
                  }}
                  className={
                    window.location.pathname === "/profile"
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  <FontAwesomeIcon icon="user" />
                  &nbsp; Profile
                </Link>
              </li>

              {/* Find Users */}

              <li className="nav-item">
                <Link
                  to={{
                    pathname: "/userSearch",
                  }}
                  className="nav-link"
                >
                  <FontAwesomeIcon icon="search" />
                  <span>&nbsp; Find Users</span>
                </Link>
              </li>
            </ul>

            {/* Show Audio Player in Nav Bar */}

            {showAudio ? (
              <div>
                <Popup
                  trigger={
                    <span>
                      <NavbarAudio
                        audioLink={this.props.audioLink}
                        playbackRate={this.state.speed}
                        changeSpeed={this.changeSpeed}
                        initialSpeed={this.state.speed}
                        remove={this.state.remove}
                        aCurrentTime={this.props.rawCurrentTime}
                      />
                    </span>
                  }
                  on="hover"
                  position="bottom center"
                  className="navbarAudioPopup"
                  closeDocumentOnClick
                >
                    <p className="navbarPopupText" id="topPopupText">
                        {this.props.podcastName}
                    </p>
                    
                    <p className="navbarPopupText">
                        {this.props.episodeName}
                    </p>

                    <button className="btn btn-dark btn-sm hideAudioBtn" onClick={hideAudio}>
                      Hide Audio Player
                    </button>
                </Popup>
              </div>
              ) : (
                <></>
              )
            }

            {/* Podcast Search form */}

            <ul className="navbar-nav ml-auto">
              <li>
                <form className="form-inline my-2 my-lg-0 searchPodcastForm">
                  <input className="form-control mr-sm-2 searchPodcastInput"
                    type="search"
                    placeholder="Search Podcasts"
                    aria-label="Search"
                    id="podcastInput"
                    value={podcastSearch}
                    name="podcastSearch"
                    autoComplete="off"
                    onBlur={hidePodcasts}
                    onKeyPress={this.suppressEnter}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    required
                  />
                </form>
              </li>

              {/* Logout Button */}

              <li>

                {/* <button
                  onClick={logout}
                  className="logoutButton btn btn-dark"
                >
                  Logout
                </button> */}

                <FontAwesomeIcon 
                  className="faCog fa-2x" 
                  icon="cog" 
                  onClick={this.showOptionsMenu}
                />

                {this.state.showOptionsMenu ? ( 
                  <OptionsMenu 
                    user={this.props.user}
                    hideOptionsMenu={this.hideOptionsMenu}
                    logout={logout}
                    ref={this.menuRef}
                  />
                ) : (
                  <></>
                )}

              </li>

            </ul>
          </div>
        </div>
      </nav>
    )
  }
};

export default Navbar;
