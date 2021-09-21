import React, { useEffect, useState } from "react";
import { CardContent, CardHeader, FormHelperText } from "@mui/material";
import { getCoursesLoading, getCourseTitles, hasInsufficientMealError } from "../menuUtils";
import MenuSelect from "./MenuSelect.jsx";
import { CardStyled } from "../menuStyles";

export default function Diner({loading, menu, diner, trySubmit, meals, setMeals, total, setTotal}){
    const [mealError, setMealError] = useState();

    useEffect(() => {
        setMealError(hasInsufficientMealError(meals, diner, trySubmit));
    }, [setMealError, hasInsufficientMealError, meals, diner, trySubmit]);

    return (
        <CardStyled variant="outlined">
        <CardHeader title={diner}/>
        <CardContent>
        {mealError && (<FormHelperText error>{mealError}</FormHelperText>)}
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
                        total={total}
                        setTotal={setTotal}
                        />
                ))
            )}
        </CardContent>
        </CardStyled>
    )
}