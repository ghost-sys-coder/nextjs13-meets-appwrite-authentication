import configFile from "../config/config";
// import { Client, Account, ID } from 'appwrite';
const { Client, Account, ID } = require('appwrite');

type CreateUserAccount = {
    email: String,
    password: String,
    name: String
};

type LoginUserAccount = {
    email: String,
    password: String
};

const appwriteClient = new Client();

appwriteClient.setEndpoint(configFile.appwriteUrl).setProject(configFile.appwriteProjectId);

export const account = new Account(appwriteClient);

export class AppwriteService {
    /** create a new record of user inside appwrite */
    
    async createUserAccount({ email, password, name }: CreateUserAccount) {
        try {
            const newUserAccount = await account.create(ID.unique(), email, password, name);
            if (newUserAccount) {
                return this.login({ email, password });
            } else {
                return newUserAccount;
            }
        } catch (error: any) {
            throw error;
        }
    }

    /** login user  */
    async login({ email, password }: LoginUserAccount) {
        try {
            return await account.createEmailSession(email, password);
        } catch (error: any) {
            throw error;
        }
    }

    /** check if user is logged in */
    async isLoggedIn(): Promise<boolean> {
        try {
            const data = await this.getCurrentUser();
            return Boolean(data);
        } catch (error: any) {
            throw error;
        }
        return false;
    }

    /** get current user */
    async getCurrentUser() {
        try {
            return await account.get();
        } catch (error: any) {
            console.log("getCurrentUser error" + error)
            throw error;
        }

        return null;
    }

    /** logout user */
    async logout() {
        try {
            return await account.deleteSession("current");
        } catch (error: any) {
            console.log("logout error:" + error);
        }
    }
}

const appwriteService = new AppwriteService();

export default appwriteService;