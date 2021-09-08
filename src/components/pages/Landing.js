import React, { useEffect, useState } from "react";
import axios from "axios"
import M from "materialize-css";
import LinearLoadingSymbol from "../layout/LinearLoadingSymbol";
import './Landing.css'

// NASA API key
const nasaApiKey = process.env.REACT_APP_NASA_API_KEY;

function Landing() {

    const [images, setImages] = useState(null);
    const [loading, setLoading] = useState(true);
    const [earthDate, setEarthDate] = useState('2021-09-01')
    const [userLikes, setUserLikes] = useState({})

    useEffect(() => {
        // Check cache for previous images liked by user
        if (localStorage.getItem('userLikes')) {
            setUserLikes(JSON.parse(localStorage.getItem('userLikes')));
        } 

        // Fetch data from NASA API
        getImages().catch(err => console.log(err))
    }, [])

    async function getImages() {
        setLoading(true);
        window.scrollTo(0, 0);
        axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=${nasaApiKey}&earth_date=${earthDate}`)
            .then(response => {
                setLoading(false);
                window.scrollTo(0, 0);
                setImages(response.data.photos);
            })
            .catch(err => {
                setLoading(false);
                window.scrollTo(0, 0);
                console.log(err);
                M.toast({html: 'An error has occurred. Please try again', classes: "red lighten-1"});
            })
    }

    function imageLikeClick(imageId) {
        const newUserLikes = {...userLikes}
        newUserLikes[imageId] = newUserLikes[imageId] ? false : true;
        setUserLikes(newUserLikes);
        localStorage.setItem('userLikes', JSON.stringify(newUserLikes))
    }

    let content;

    // If loading, render loading symbol
    if (loading || images === null) { 
        content = (<React.Fragment>
                        <i className="material-icons logo">public</i>
                        <LinearLoadingSymbol />
                        <h5 className="grey-text text-darken-2">
                            Loading...
                        </h5>
                    </React.Fragment>);
    }
    else if (images.length === 0) {
        content = (<h5 className="no-images grey-text text-darken-2">
                        No images found for this date
                    </h5>)
    }
    else {
        const cards = images.map((image, index) => {
            let likeButtonIcon = userLikes[image.id] ? "favorite" : "favorite_border";
            return (
                <div className="col s12 m6 l4" key={index}>
                    <div className="card sticky-action left-align">
                        <div className="card-image waves-effect waves-light">
                            <img className="activator" src={image.img_src} alt="Mars rover view"/>
                        </div>
                        <div className="card-content">
                            <span className="card-title activator">{`${image.rover.name} - ${image.camera.name}`}</span>
                            <p className="grey-text">{ image.earth_date }</p>
                        </div>
                        <div className="card-action">
                            <button className="like-button btn-floating waves-effect waves-light red lighten-2" onClick={() => imageLikeClick(image.id)}>
                                <i className="material-icons">{likeButtonIcon}</i>
                            </button>
                        </div>
                        <div className="card-reveal">
                            <span className="card-title">{image.rover.name}<i className="material-icons right">close</i></span>
                            <p className="card-description-field grey-text">{ image.earth_date }</p>
                            <p className="card-description-field grey-text">Mars sol: { image.sol }</p>
                            <p className="card-description-field grey-text">Camera: { image.camera.full_name }</p>
                        </div>
                    </div>
                </div>)}
        )

        content = (
            <div className="row">
                { cards }
            </div>
        );
    }

    return (<div className="landing container valign-wrapper">
            <div className="row">
                <div className="col s12 center-align">
                    { content }
                </div>
            </div>
        </div>);
}

export default Landing;