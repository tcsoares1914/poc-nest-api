
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateUserInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface UpdateUserInput {
    id?: Nullable<number>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
}

export interface User {
    id?: Nullable<string>;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface IQuery {
    users(): User[] | Promise<User[]>;
    user(id: number): User | Promise<User>;
}

export interface IMutation {
    createUser(input: CreateUserInput): Nullable<User> | Promise<Nullable<User>>;
    updateUserById(id: number, input: UpdateUserInput): Nullable<User> | Promise<Nullable<User>>;
    deleteUserById(id: number): Nullable<boolean> | Promise<Nullable<boolean>>;
}

type Nullable<T> = T | null;
