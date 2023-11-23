import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>()

  private recipes: Recipe[] = [
    // new Recipe(
    //   'Pizza',
    //   'A flat, open-faced baked pie of Italian origin, consisting of a thin layer of bread dough topped with spiced tomato sauce and cheese, often garnished with anchovies, sausage slices, mushrooms, etc.',
    //   'https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg?crop=0.6666666666666667xw:1xh;center,top&resize=1200:*',
    //   [new Ingredient("Dough", 1), new Ingredient("Cheese", 2), new Ingredient("Tomato", 3), new Ingredient("Basil", 3)]),
    // new Recipe(
    //   'Burger',
    //   'A patty of ground beef grilled and placed between two halves of a bun. Slices of raw onion, lettuce, bacon, mayonnaise, and other ingredients add flavor.',
    //   'https://www.seriouseats.com/thmb/Je2_TdT7hIZK8g6VfjSvPU8mifk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2015__07__20150702-sous-vide-hamburger-anova-primary-bf5eefff4505446f9cbf33f5f2d9b2e6.jpg',
    //   [new Ingredient("Buns", 2), new Ingredient("Patty", 1)]),
    // new Recipe(
    //   'Fajitas',
    //   'A fajita, in Tex-Mex cuisine, is any stripped grilled meat, optionally served with stripped peppers and onions usually served on a flour or corn tortilla.',
    //   'https://www.tasteofhome.com/wp-content/uploads/2018/01/Flavorful-Chicken-Fajitas_EXPS_CIW19_12540_B08_30_6b.jpg',
    //   [new Ingredient("Tortillas", 6), new Ingredient("Grilled meat", 2), new Ingredient("Peppers", 2)]),
  ]

  constructor(private slService: ShoppingListService,
    private http: HttpClient,
    private authService: AuthService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(id: number) {
    return this.recipes.find((x, index) => index == id)
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients)
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    this.recipesChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1)
    this.recipesChanged.next(this.recipes.slice())
  }

  saveRecipesData() {
    const token = this.authService.getToken()
    return this.http.put('https://recipes-ng-896ce-default-rtdb.europe-west1.firebasedatabase.app/recipeData.json?auth=' + token, this.recipes)
  }

  fetchRecipesData() {
    const token = this.authService.getToken()

    return this.http.get('https://recipes-ng-896ce-default-rtdb.europe-west1.firebasedatabase.app/recipeData.json?auth=' + token)
      .subscribe(
        (data: any[]) => {
          try {
            this.recipes = data.map(recipeFetched => {
              if (!recipeFetched['ingredients']) {
                recipeFetched['ingredients'] = []
              } // add property with empty array if no ingredients in the recipe
              return recipeFetched
            })
            this.recipesChanged.next(this.recipes.slice())
          }
          catch {
            console.log("Error: Couldn`t fetch server data for recipe.service.ts");
          }
        }
      )
  }
}