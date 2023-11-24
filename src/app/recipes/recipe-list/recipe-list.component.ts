import { Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent implements OnInit, OnDestroy {


  private _listFilter: string = '';

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.recipes = this.performFilter(value);
  }
  recipes!: Recipe[];
  allRecipes!: Recipe[];
  subscription: Subscription;
  constructor(private recipeService: RecipeService) { }


  ngOnInit() {

    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes
        this.allRecipes = recipes
      }
    )
    this.recipes = this.recipeService.getRecipes();
    this.allRecipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  filteredRecipes: Recipe[] = this.recipes

  performFilter(filterBy: string): Recipe[] {
    if (filterBy != '') {
      filterBy = filterBy.toLocaleLowerCase();

      return this.allRecipes.filter((r: Recipe) =>
        r.name.toLocaleLowerCase().includes(filterBy))
    } else {
      this.recipes = this.recipeService.getRecipes()
    }
    return this.recipes
  }

  clearFilter() {
    this._listFilter = '';
    this.recipes = this.performFilter('');
  }

  getIndex(recipeEl: Recipe) {
    let recipesCopy = this.recipeService.getRecipes()
    let index = 0
    for (let i of recipesCopy) {
      if (i.name == recipeEl.name && i.description == recipeEl.description) {
        return index
      }
      index++;
    }
    return -1 // unsuccessful
  }
}
