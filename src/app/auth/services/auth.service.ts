import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ApiService} from 'src/app/core/services/api.service';
import {User} from '../models/user.model';
import {JwtService} from 'src/app/core/services/jwt-token.service';
import {Router} from '@angular/router';
import {LocalStorageService} from 'src/app/core/services/local.storage.service';
import {LocalStorageKeys} from 'src/app/core/models/local-storage-keys.enum';
import {InformService} from 'src/app/core/services/inform.service';

@Injectable({providedIn: 'root'})
export class AuthService {
    static signInUrl = '/sign-in';
    logoutUrl = '/login';
    mainPageUrl = 'app';
    _user: User;
    authorized = new BehaviorSubject<User>(this.user);

    constructor(private api: ApiService, private jwtService: JwtService, private router: Router) {}

    public signIn(
        credentials: LoginFormValues
    ): Observable<{
        token: string;
        user: User;
    }> {
        return this.api.post(AuthService.signInUrl, credentials).pipe(
            tap(data => {
                const {user, token} = data;
                this.jwtService.token = token;
                this.user = user;
                this.router.navigate([this.mainPageUrl]);
            })
        );
    }

    set user(user: User) {
        if (user) {
            LocalStorageService.save(LocalStorageKeys.LOGGED_USER, user);
        } else {
            LocalStorageService.remove(LocalStorageKeys.LOGGED_USER);
        }

        this._user = user;
        this.authorized.next(user);
    }

    get user() {
        return this._user || LocalStorageService.get(LocalStorageKeys.LOGGED_USER);
    }

    isAuthenticated(): boolean {
        return !!(this.user && this.jwtService.token);
    }

    authorizedUser$() {
        return this.authorized.asObservable();
    }

    logout() {
        this.user = null;
        this.jwtService.destroyToken();
        this.router.navigate([this.logoutUrl]);

        // inavlidate apps and other db data
        LocalStorageService.clear();
    }
}
