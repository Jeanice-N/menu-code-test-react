import React from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import { getCoursesLoading, getCourseTitles } from "./menuUtils";
import MenuSelect from "./MenuSelect.jsx";
import { CardStyled } from "./menuStyles";

export default function Diner({loading, menu, diner, trySubmit, meals, setMeals, errors, setErrors, total, setTotal}){

    return (
        <CardStyled variant="outlined">
        <CardHeader title={diner}/>
        <CardContent>
            {loading ? getCoursesLoading() : (
                getCourseTitles(menu).map(title => (
                    <MenuSelect 
                        key={title} 
                        items={menu?.[title]} 
                        title={title} 
                        trySubmit={trySubmit}
                        meals={meals}
                        setMeals={setMeals}
                        diner={diner}
                        setErrors={setErrors}
                        errors={errors}
                        total={total}
                        setTotal={setTotal}
                        />
                ))
            )}
        </CardContent>
        </CardStyled>
    )
}