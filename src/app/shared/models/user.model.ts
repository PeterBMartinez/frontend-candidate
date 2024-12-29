import { BaseUser } from "./base-user.model";
import { Quote } from "./quote.model";

export interface User extends BaseUser {
    quotes: Quote[];
}