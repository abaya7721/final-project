import React from 'react';
import {useEffect, useState} from "react";
import {getMe, getUsers} from "../utilities/apiUtilities";
export default function SecuredComponent() {
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    const [users, setUsers] = useState();

    useEffect(() => {
        if(role==="ROLE_USER") {
            getMe().then((data) => {
                setUsers(data);
            })
        }
        if(role==="ROLE_ADMIN") {
            getUsers().then((data) => {
                setUsers(data);
            })
        }
    },[]);

    return (
        <div>
            <h2>Secured Page</h2>
            <h3>Must be logged in to view.</h3>
            <p>Your username: {username}</p>
            <p>Your role: {role}</p>
        </div>
    )
}