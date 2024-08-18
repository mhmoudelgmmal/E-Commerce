import { LoginService } from '../../services/login.service';
import { inject, Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { LoginData } from "src/app/Modules/Auth/auth/contexts/DTOS";
import { loginUser, setTokenOnLoadingHeaderComponent } from "../actions/login.actions";
import { catchError, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@State<LoginData>({
    name: 'auth',
    defaults: {
        id:           0,
        username:     "",
        email:        "",
        firstName:    "",
        lastName:     "",
        gender:       "",
        image:        "",
        token:        "",
        refreshToken: "",
        isLoading:false
    }
})
@Injectable()
export class LoginState {
    @Selector()
    static loginToken(state:LoginData){
        return state.token;
    }
    @Selector()
    static isLoading(state:LoginData){
        return state.isLoading;
    }
    private loginService = inject(LoginService)

    @Action(loginUser)
     LoginMethod({patchState}:StateContext<LoginData>,{payload}:loginUser){
        patchState({
            id:           0,
            username:     "",
            email:        "",
            firstName:    "",
            lastName:     "",
            gender:       "",
            image:        "",
            token:        "",
            refreshToken: "",
            isLoading:true
        });

        return this.loginService.login(payload).pipe(
            tap((res)=>{
                
                patchState({
                    id:           res.id,
                    username:     res.username,
                    email:        res.email,
                    firstName:    res.firstName,
                    lastName:     res.lastName,
                    gender:       res.gender,
                    image:        res.image,
                    token:        res.token,
                    refreshToken: res.refreshToken,
                    isLoading:false
                })
            }),
            catchError((err:HttpErrorResponse)=>{
                patchState({
                    id:           0,
                    username:     "",
                    email:        "",
                    firstName:    "",
                    lastName:     "",
                    gender:       "",
                    image:        "",
                    token:        "",
                    refreshToken: "",
                    isLoading:false
                })
                return throwError(()=>err)
            })
        )
    }
    @Action(setTokenOnLoadingHeaderComponent)
    setToken({patchState}:StateContext<LoginData>){
        let token = localStorage.getItem('ecommerceToken')!
        
        patchState({
            token: token
        })
    }
}