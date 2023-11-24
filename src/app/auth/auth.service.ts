import { Injectable, Output } from "@angular/core";
import { Router } from "@angular/router";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

@Injectable()
export class AuthService {
    token: string;
    user:any

    constructor(private router: Router) { }

    signupUser(email: string, password: string) {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                auth.currentUser.getIdToken()
                    .then(
                        (token: string) => {
                            this.token = token
                            localStorage.setItem('token', token)
                        }
                    )
                const user = userCredential.user;
                this.router.navigate(['/'])
            })
            .catch((error) => {
                alert(error.message);
            });
    }
    signinUser(email: string, password: string) {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                auth.currentUser.getIdToken()
                    .then(
                        (token: string) => {
                            this.token = token
                            localStorage.setItem('token', token)
                        }
                    )
                const user = userCredential.user;
                this.user = user
                this.router.navigate(['/'])

            })
            .catch((error) => {
                alert(error.message);
            });
    }

    logout() {
        const auth = getAuth()
        auth.signOut()
        this.token = null
        localStorage.removeItem('token')
        this.router.navigate(['/'])
    }

    getToken() {
        const auth = getAuth();
        auth.currentUser.getIdToken().then(
            (token: string) => this.token = token
        )
        return this.token
    }

    isAuthenticated() {
        return this.token != null
    }

    getUser(){
        return this.user
    }
}