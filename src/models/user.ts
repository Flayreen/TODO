export enum UserRole {
    Admin = "Admin",
    Viewer = "Viewer",
}

export interface UserInfo {
    name: string;
    email: string;
    password: string;
    role: UserRole.Admin | UserRole.Viewer
}