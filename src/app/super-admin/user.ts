

export interface User {
  userName: String;
  userFirstName: string;
  userLastName: string;
  email: string;
  userPassword: string;
  [role: string]: any;
}