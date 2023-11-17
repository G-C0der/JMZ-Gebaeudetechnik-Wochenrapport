interface User {
  id: number;
  email: string;
  verified: boolean;
  active: boolean;
  admin: boolean;
  title?: string;
  fname?: string;
  lname?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserForm {
  title: string;
  fname: string;
  lname: string;
  email: string;
  password: string;
  passwordRetype: string;
}

export type {
  User,
  UserForm
};
