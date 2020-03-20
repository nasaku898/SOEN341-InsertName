import "../../config";
import axios from "axios";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

import FollowingButton from "../Following/FollowingButton";
import PostImage from "../Post/PostImage";
import Profile from "../Profile/Profile";

import "./User.scss";

export default function User(props) {

    const [errorMsg, setErrorMsg] = useState("");
    const [Pictures, setPictures] = useState([]);

    useEffect(() => {
        const loadUser = () => {
            axios.get(global.config.BACKEND_URL + "/" + props.username + "/pictures")
            .then(
                (response) => {
                    setErrorMsg("");
                    setPictures(response.data.reverse());
                }
            )
            .catch(
                (error) => {
                    setPictures([]);
                    if (error.response && error.response.data && error.response.data.message) {
                        setErrorMsg(error.response.data.message);
                    }
                    else {
                        setErrorMsg("An unknown error occurred.");
                    }
                }
            )
        }
        loadUser();
    }, [props.username])

    return (
        <div className="user-component">
            <div className="profile-wrapper">
                <Profile username={props.username}></Profile>
            </div>
            {!(props.currentUser === props.username) &&
                <FollowingButton {...props} class='following-user'></FollowingButton>
            }
            {errorMsg && <div className="error">{errorMsg}</div>}
            <div className="all-posts">
                {
                    Pictures.map((id) => (
                        <div className="single-post" key={id}>
                            <Link to={`/post/${id}`}>
                                <PostImage pictureId={id} />
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
