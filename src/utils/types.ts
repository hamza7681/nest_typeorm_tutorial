export type CreateUserParams = {
  username: string;
  password: string;
};

export type UpdateUserParams = {
  username: string;
  password: string;
};

export type CreateProfile = {
  firstName: string;
  lastName: string;
  age: number;
  dob: string;
};

export type CreatePost = {
  title: string;
  description: string;
};
