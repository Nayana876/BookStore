export interface ICreateUser {
    fname: string;
    lname: string;
    email: string;
    username: string;
    password: string;
   
}

export interface ILoginUser {
   
    email: string;
    password: string;
}
