export class LocalStorageService {
    public static save(key: string, object: any): void {
        localStorage.setItem(key, JSON.stringify(object));
    }

    public static get(key: string): any {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (e) {
            return null;
        }
    }

    public static remove(key: string): void {
        localStorage.removeItem(key);
    }

    /** Cleans full storage for current session */
    public static clear(): void {
        localStorage.clear();
    }
}
