import { HttpClient } from "@angular/common/http";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class ShoppingListService {

    ingredientsChanged = new Subject<Ingredient[]>()
    startedEditing = new Subject<number>;

    private ingredients: Ingredient[] = [
        // new Ingredient("Apple", 2)
    ];

    constructor(private http: HttpClient,
        private authService: AuthService) { }

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index]
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1)
        this.ingredientsChanged.next(this.ingredients.slice())
    }

    addIngredient(ingredientToAdd: Ingredient) {
        if (this.ingredients != null) {
            // new data transfer object to prevent passing reference to recipe
            let dtoIngredient = new Ingredient(ingredientToAdd.name, ingredientToAdd.amount)
            let isSameIng = false
            for (let existingIngredient of this.ingredients) {
                if (existingIngredient.name.toLowerCase() == dtoIngredient.name.toLowerCase()) {
                    existingIngredient.amount = Number(dtoIngredient.amount) + Number(existingIngredient.amount)
                    isSameIng = true // if the ingredient to add is on the list
                    // update the amount respectively, dont add duplicate data
                }
            }
            if (!isSameIng) { // if the ingredient to add is not on the list
                this.ingredients.push(dtoIngredient) // add a new ing
            }
            this.ingredientsChanged.next(this.ingredients.slice())
        }
    }

    addIngredients(recipeIngredients: Ingredient[]) {
        for (let i of recipeIngredients) {
            this.addIngredient(i)
        }
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice())
    }

    saveShoppingListData() {
        const token = this.authService.getToken()
        return this.http.put('https://recipes-ng-896ce-default-rtdb.europe-west1.firebasedatabase.app/shoppingListData.json?auth=' + token, this.ingredients)
    }

    fetchShoppingListData() {
        const token = this.authService.getToken()

        return this.http.get('https://recipes-ng-896ce-default-rtdb.europe-west1.firebasedatabase.app/shoppingListData.json?auth=' + token)
            .subscribe(
                (data: any[]) => {
                    try {
                        if (data == null) {
                            data = [] // initialize empty array to prevent operating errors
                        }
                        this.ingredients = data
                        this.ingredientsChanged.next(this.ingredients.slice())
                    }
                    catch {
                        console.log("Error: Couldn`t fetch server data for shopping-list.service.ts");
                    }
                }
            )
    }
}