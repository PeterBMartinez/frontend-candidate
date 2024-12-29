import { BaseUser } from "./base-user.model";

export interface UserResponse extends BaseUser {
    quotes: {
        [likes: number]: string[];
    };
}