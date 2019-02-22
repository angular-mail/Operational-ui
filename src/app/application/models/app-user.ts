export interface BaseAppUser {
    id?: number;
    name: string;
    canDelete: boolean;
    canUpdate: boolean;
    canAddUsers: boolean;
}


export class AppUser implements BaseAppUser {
    id: number;
    name: string;
    canDelete: boolean;
    canUpdate: boolean;
    canAddUsers: boolean;

    constructor(user: BaseAppUser) {
        Object.assign(this, user);
    }
}
