import { Component, DoCheck, ElementRef, Input, OnChanges, OnInit, ViewChild } from "@angular/core";
import { RecipeService } from "../../recipes/recipe.service";
import { ShoppingListService } from "../../shopping-list/shopping-list.service";
import { AuthService } from "../../auth/auth.service";
import { getAuth } from "firebase/auth";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements DoCheck {
    @ViewChild('nbSupportedContent') nbSupportedContent: ElementRef
    @ViewChild('manageDropdown') manageDropdown: ElementRef
    @ViewChild('btn') btn: ElementRef

    userEmail: string = ''
    constructor(private rService: RecipeService,
        private slService: ShoppingListService,
        private authService: AuthService) { }
    ngDoCheck(): void {
        const auth = getAuth()
        if (auth.currentUser != null) {
            this.userEmail = auth.currentUser['reloadUserInfo']['email']
        } else {
            this.userEmail = ''
        }
    }
    saveData() {
        this.rService.saveRecipesData().subscribe()
        this.slService.saveShoppingListData().subscribe()
    }

    fetchData() {
        this.rService.fetchRecipesData()
        this.slService.fetchShoppingListData()
    }

    isAuthenticated() {
        return this.authService.isAuthenticated()
    }

    onLogout() {
        this.authService.logout()
    }

    collapseNavbar() {
        if (window.innerWidth < 768) {
            this.btn.nativeElement.click()
        }
        // this.nbSupportedContent.nativeElement['classList'].remove('in')
        // this.manageDropdown.nativeElement['classList'].remove('open')
    }
}



