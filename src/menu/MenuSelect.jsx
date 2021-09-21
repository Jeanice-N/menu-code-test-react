import React, { useEffect, useState } from "react";
import { FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { MenuSelectStyled } from "./menuStyles";
import { getUpdatedMeals, getErrorMessage, isMealComboInvalid } from "./menuUtils";

export default function MenuSelect({items, title, trySubmit, diner, meals, setMeals, total, setTotal}) {
    const [value, setValue] = useState("");
    const [errors, setErrors] = useState("");
    const [fieldError, setFieldError] = useState(false);
    const isRequired = title === "mains";
    const label = isRequired ? `${title} *` : title;

    useEffect(() => {
        if(isRequired && !value && trySubmit) {
            setFieldError("A main is required");
        }
    }, [isRequired, value, trySubmit, setFieldError]);


    useEffect(() => {
        setErrors(isMealComboInvalid(meals));
    }, [meals, setErrors, isMealComboInvalid]);

    useEffect(() => {
        setFieldError(getErrorMessage(errors, value, diner));
    }, [setFieldError, getErrorMessage, errors, value, diner])

    const handleItemChange = (e) => {
        const dish = e.target.value;
        const newPrice = items.find(i => i.id === dish)?.price ?? 0;
        const currPrice = items.find(i => i.id === value)?.price ?? 0;
        const updatedMeals = getUpdatedMeals(meals, diner, value, dish);
        setMeals(updatedMeals);
        setTotal((total + newPrice) - currPrice);    
        setValue(dish);
    };


    return (
        <MenuSelectStyled fullWidth error={Boolean(fieldError)}>
            <InputLabel>{label}</InputLabel>
            <Select
                label={title}
                value={value}
                onChange={handleItemChange}                
            >
                {items.map(m => (
                    <MenuItem key={m.id} value={m.id}>{`${m.name} £${m.price}`}</MenuItem>
                ))}                
            </Select>
            {fieldError && (<FormHelperText>{fieldError}</FormHelperText>)}
        </MenuSelectStyled>
    )
} 