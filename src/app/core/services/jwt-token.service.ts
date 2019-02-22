import {Injectable} from '@angular/core';
import {LocalStorageService} from './local.storage.service';
import {LocalStorageKeys} from '../models/local-storage-keys.enum';

@Injectable({providedIn: 'root'})
export class JwtService {
    get token(): string {
        return LocalStorageService.get(LocalStorageKeys.JWT_TOKEN);
    }

    set token(token: string) {
        LocalStorageService.save(LocalStorageKeys.JWT_TOKEN, token);
    }

    destroyToken() {
        LocalStorageService.remove(LocalStorageKeys.JWT_TOKEN);
    }
}
