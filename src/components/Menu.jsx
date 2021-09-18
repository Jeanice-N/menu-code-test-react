import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_MENU } from "./menu.queries";

export default function Menu(){

    const { loading, error, data } = useQuery(GET_MENU);
    
    useEffect(() => {
        if(!loading) {
            console.log('data:', data)
        }
    }, [loading, data])

    return <div>Menu</div>
}