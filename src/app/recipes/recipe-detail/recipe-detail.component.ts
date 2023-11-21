import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe?: Recipe;
  id?: number
  subscription:Subscription
  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }
  

  ngOnInit(){
    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipeById(this.id)
      }
    )
    
    
  }

  onAddToShoppingList() {
    if (this.recipe)
      this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['recipes'])
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
