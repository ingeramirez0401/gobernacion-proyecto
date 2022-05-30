import { Role } from './role';

export class Account {
    id: string;
    firstName: string;
    lastName: string;
    identification: string;
    email: string;
    isTransport: string;
    role: Role;
    jwtToken?: string;
    isDeleting: boolean;
}