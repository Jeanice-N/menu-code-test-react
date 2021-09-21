import { CHEESECAKE_ID, getCourseTitles, getErrorMessage, getUpdatedMeals, hasInsufficientMealError, isCourseDuplicated, isInvalidSeafoodMeal, isItemSoldOut, PRAWN_COCKTAIL_ID, SALMON_FILLET_ID } from "../menuUtils";

describe("getCourseTitles", () => {
    it(`Given menu has titles
        Then return titles`, () => {
            const menu = {
                starters: [],
                mains: [],
                desserts: []
            };

            expect(getCourseTitles(menu)).toEqual(["starters", "mains", "desserts"]);
    });
});

describe("isItemSoldOut", () => {
    let selectedMeals = {
        diner1: [CHEESECAKE_ID],
        diner2: [CHEESECAKE_ID]
    };

    it(`Given there is more than one cheesecake
        Then should return object with should error message and id`, () => {
            expect(isItemSoldOut(selectedMeals)).toEqual({
                [CHEESECAKE_ID]: "There is only one cheesecake left",
            });
    });

    it(`Given there is not more than one cheesecake
        Then should return empty string`, () => {
            selectedMeals = {};
            expect(isItemSoldOut(selectedMeals)).toEqual("");
    });
});

describe("isCourseDuplicated", () => {
    let selectedMeals = {
        diner1: [123],
        diner2: [123]
    };

    it(`Given there is a duplicate course
        Then should return object with should error message and id`, () => {
            expect(isCourseDuplicated(selectedMeals)).toEqual({
                [123]: "This course is limited to one diner",
            });
    });

    it(`Given there is not a duplicate course
        Then should return empty string`, () => {
            selectedMeals = {
                diner1: [123],
                diner2: [456]   
            };
            expect(isCourseDuplicated(selectedMeals)).toEqual("");
    });
});

describe("isInvalidSeafoodMeal", () => {
    let selectedMeals = {
        diner1: [PRAWN_COCKTAIL_ID, SALMON_FILLET_ID],
        diner2: [123]
    };

    it(`Given there is an invalid seafood meal
        Then should return object with should error message and meal id and diner`, () => {
            expect(isInvalidSeafoodMeal(selectedMeals)).toEqual({
                diner1: {
                    [PRAWN_COCKTAIL_ID]: "The prawn cocktail cannot be paired with Salmon fillet",
                    [SALMON_FILLET_ID]: "The prawn cocktail cannot be paired with Salmon fillet",
                },
            });
    });

    it(`Given there is an valid seafood meal
        Then should return empty string`, () => {
        let selectedMeals = {
            diner1: [PRAWN_COCKTAIL_ID],
            diner2: [123, SALMON_FILLET_ID]
        };
        expect(isInvalidSeafoodMeal(selectedMeals)).toEqual("");
    });

       
});

describe("getUpdatedMeals", () => {
    let meals = {};
    let diner = "diner1";
    let currentDish = 1;
    let newDish = 2;

    it(`Given it is the first dish selected
        Then return object with diner and dish id`, () => {
            expect(getUpdatedMeals(meals, diner, currentDish, newDish)).toEqual({
                diner1: [newDish],
            });
    });

    it(`Given there is a current dish
        Then remove the current dish
        And replace with new dish
        And return object with diner and new dish id`, () => {
            let meals = {
                [diner]: [123, currentDish]
            };
            expect(getUpdatedMeals(meals, diner, currentDish, newDish)).toEqual({
                diner1: [123, newDish],
            });
    });
});

describe("getErrorMessage", () => {
    let errors;
    let value = 1;
    let diner = "diner1";

    it(`Given there are no errors
        Then return false`, () => {
            expect(getErrorMessage(errors, value, diner)).toEqual(false);
    });

    it(`Given there are errors
        And it is a diner specific error
        Then return error message`, () => {
            let errors = {
                [diner]: {
                    [value]: "some error about this diner's dish"
                }
            }
            expect(getErrorMessage(errors, value, diner)).toEqual("some error about this diner's dish");
    });

    it(`Given there are errors
        And it is a not diner specific error
        Then return error message`, () => {
            let errors = {
                [value]: "general dish error"
            }
            expect(getErrorMessage(errors, value, diner)).toEqual("general dish error");
    });
});

describe("hasInsufficientMealError", () => {
    let diner = "diner1";
    let meals = { 
        [diner]: [1]
    };
    let trySubmit = true;

    it(`Given user tried to submit
        And there two courses were not selected
        Then return error message`, () => {
            expect(hasInsufficientMealError(meals, diner, trySubmit)).toEqual("At least two courses are required");
    });
});