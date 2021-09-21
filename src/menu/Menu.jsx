import { useQuery } from "@apollo/client";
import { Button, Card, CardActions, CardContent, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Diner from "./Diner.jsx";
import { GET_MENU } from "./menu.queries";
import { CardStyled, OTHeader, SubmitButton } from "./menuStyles.js";
import { isMealComboInvalid } from "./menuUtils.js";

export default function Menu(){
    const DINERS = ["Diner 1", "Diner 2"];
    const { loading, data } = useQuery(GET_MENU);
    const [total, setTotal] = useState(0);
    const [trySubmit, setTrySubmit] = useState(false);
    const [meals, setMeals] = useState({});
    const [errors, setErrors] = useState("");

    useEffect(() => {
        setErrors(isMealComboInvalid(meals));
    }, [meals]);

    const handleSubmit = () => {
        setTrySubmit(true);
    };

    return (
        <Container>
        <OTHeader variant="h2">OpenTable</OTHeader>
        <Typography variant="h4">Jeanice's Restaurant</Typography>
        {DINERS.map(d => (
            <Diner 
            key={d}
            loading={loading} 
            menu={data?.menu} 
            diner={d} 
            trySubmit={trySubmit}
            meals={meals}
            setMeals={setMeals}
            errors={errors}
            setErrors={setErrors} 
            total={total}
            setTotal={setTotal}
            />
        ))}
        <CardStyled variant="outlined">
            <CardContent>
                <Typography variant="h5">{`Total: £${total}`}</Typography>
            </CardContent>
            <CardActions>
                <SubmitButton variant="contained" onClick={handleSubmit}>Let's go</SubmitButton>
            </CardActions>
        </CardStyled>
        </Container>
    )
}