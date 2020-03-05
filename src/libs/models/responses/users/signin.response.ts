import { IResponse } from "@models";

export interface SignInResponse extends IResponse {
    user: {
        email: string,
        companyId: string,
        companyType: string,
        firstName: string,
        lastName: string,
        _id: string,
        role: string,
        avatar: string,
    };
    token: {
        accessToken: string,
        expireIn: number,
    };
}