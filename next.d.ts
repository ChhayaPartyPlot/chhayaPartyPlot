// types/next.d.ts
import { User as PassportUser } from 'passport';

declare module 'next' {
  interface NextApiRequest {
    login(user: any, callback: (err?: any) => void): void;
    logout(callback: (err?: any) => void): void;
    isAuthenticated(): boolean;
    user?: PassportUser;
  }
}
