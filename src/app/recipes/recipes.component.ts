import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {


  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    if (this.recipeService.getRecipes().length == 0)
      try {
        this.recipeService.fetchRecipesData()
      } catch { }
  }


}
