export type User = {
  id?: Number;
  firstName: string;
  lastName: string;
  username?: string;
  password?: string;
  token?: string;
};

export type UserLogin = {
  username: string;
  password: string;
};
