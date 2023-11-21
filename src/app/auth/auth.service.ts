import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

@Injectable()
export class AuthService {
    token: string;

    constructor(private router: Router) { }

    signupUser(email: string, password: string) {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;

            })
            .catch((error) => {
                console.log(error.message);
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
                console.log("Signed in");
                this.router.navigate(['/'])

            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    logout() {
        const auth = getAuth()
        auth.signOut()
        this.token = null
        localStorage.removeItem('token')
    }

    getToken() {
        const auth = getAuth();
        auth.currentUser.getIdToken().then(
            (token: string) => this.token = token
        )
        return this.token
    }

    isAuthenticated() {
        // console.log(localStorage.getItem('token'));
        // return localStorage.getItem('token') != null
        return this.token != null
    }
}