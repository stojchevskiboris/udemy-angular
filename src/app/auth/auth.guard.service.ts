import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";

export const AuthGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    if (!inject(AuthService).isAuthenticated()) {
        alert("Please log in to add and manage recipes")
    }
    return inject(AuthService).isAuthenticated()
}