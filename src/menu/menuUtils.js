import React from "react";
import MenuSkeleton from "./MenuSkeleton.jsx";

const CHEESECAKE_ID = "11";
const PRAWN_COCKTAIL_ID = "4";
const SALMON_FILLET_ID = "7";

export const getCourseTitles = (menu = []) => {
    const courseTitles = Object.keys(menu);
    return courseTitles.filter(m => Array.isArray(menu[m]));
};

export const getCoursesLoading = () => {
    const skeleton = [];
    for(let i = 0; i < 3; i++) {
        skeleton.push(<MenuSkeleton key={i} height={80}/>)
    }
    return skeleton;
};

export const isItemSoldOut = (selectedMeals) => {    
    const diners = Object.keys(selectedMeals);
    const dishes = diners.map(d => Object.values(selectedMeals[d])).flat();
    return dishes.filter(d => d === CHEESECAKE_ID).length > 1 ? 
    { [CHEESECAKE_ID]: "There is only one cheesecake left" } : "";  
};

export const isCourseDuplicated = (selectedMeals) => {
    const diners = Object.keys(selectedMeals);
    const dishes = diners.map(d => selectedMeals[d]).flat();
    const uniqueDishes = new Set(dishes);
    const duplicateDishes = dishes.filter(dish => {
        if (uniqueDishes.has(dish)) {
            uniqueDishes.delete(dish);
        } else {
            return dish;
        }
    });

    let errorMessages = {};
    duplicateDishes.forEach(d => errorMessages[d] = "This course is limited to one diner");
    return duplicateDishes.length ? errorMessages : "";
};

export const isInvalidSeafoodMeal = (selectedMeals) => {
    const diners = Object.keys(selectedMeals);
    let errorMessages = {};

    diners.forEach(d => {
        if(selectedMeals[d].includes(PRAWN_COCKTAIL_ID) && selectedMeals[d].includes(SALMON_FILLET_ID)) {
            errorMessages = {
                ...errorMessages,
                [d] : {
                    [PRAWN_COCKTAIL_ID]: "The prawn cocktail cannot be paired with Salmon fillet",
                    [SALMON_FILLET_ID]: "The prawn cocktail cannot be paired with Salmon fillet",
                }
            }
        }
    });

    return Object.keys(errorMessages).length ? errorMessages : "";
};

export const isMealComboInvalid = (selectedMeals) => {
    if (!Object.keys(selectedMeals).length) return ""
    
    return isItemSoldOut(selectedMeals) ||
        isCourseDuplicated(selectedMeals) ||  
        isInvalidSeafoodMeal(selectedMeals);
};

export const getUpdatedMeals = (meals, diner, currentDish, newDish) => {
    if (!meals[diner]) return { ...meals, [diner]: [newDish] };

    const index = meals[diner].indexOf(currentDish);
    if (index > -1) meals[diner].splice(index, 1);
    meals[diner].push(newDish);

    return {
        ...meals,
        [diner]: meals[diner]
    };
}

export const getErrorMessage = (errors, value, diner) => {
    if(!errors) return false;
    
    const mealComboError = typeof errors[diner] === "object" && errors[diner] !== null;

    if (mealComboError) return errors[diner][value]

    return errors[value];
}



