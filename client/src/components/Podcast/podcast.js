import React from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import "./podcast.css";

// PODCAST COMPONENT
// This component represents an individual Podcast.
// It contains a link that will redirect the user to the Episode List page.
// Upon redirecting it will send along information on the Podcast ID, Name, and Logo for use down the line. 
// It also contains an onClick event handler which is passed down from App.js. This handler hides the Search Results dropdown.

function Podcast ({ podcastId, podcastName, podcastLogo, thumbnail, hide }) {

    return (
        
        <Redirect to={{
            pathname: "/episodeList", 
            state: {
                podcastId: podcastId,
                podcastName: podcastName,
                podcastLogo: podcastLogo
            }
            }} 
            className="podcast"
            onClick={hide}
        >
        <span><img className="podcastLogoSmall" src={thumbnail} alt="Podcast Logo"/></span>
        <span><p className="podcastTitle">{podcastName}</p></span>
        </Redirect>
    );
};

export default Podcast;
