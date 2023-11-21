import * as ShoppingListActions from './shopping-list.actions'
import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";

const initialState = {
    ingredients: [
        new Ingredient('Apple', 5),
        new Ingredient('Tomatos', 4)
    ]
}
export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type){
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            }
        default:
            return state
    }
}