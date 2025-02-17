export enum UserRole {
    Admin = "Admin",
    Viewer = "Viewer",
}

export interface CreateUser {
    name: string;
    email: string;
    password: string;
}

export interface UserInfo {
    id: string
    name: string;
    email: string;
    password: string;
    role: UserRole.Admin | UserRole.Viewer
}