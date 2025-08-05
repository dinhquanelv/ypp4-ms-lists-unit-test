export interface Account {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  accountPassword: string;
  avatar?: string;
  company?: string;
  accountStatus: string;
}
