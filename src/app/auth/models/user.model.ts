export class User {
    firstName: string;
    lastName: string;
    email: string;

    constructor(user?: User) {
        this.firstName = (user && user.firstName) || '';
        this.lastName = (user && user.lastName) || '';
        this.email = (user && user.email) || '';
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
