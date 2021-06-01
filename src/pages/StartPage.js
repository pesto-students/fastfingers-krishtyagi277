import React from "react";
import Welcome from "../components/welcome/Welcome"

export default function StartPage ({changeScreen}) {
    return <Welcome changeScreen={changeScreen}/>;
}