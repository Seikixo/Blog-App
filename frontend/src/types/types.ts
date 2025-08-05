

export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  user: User;
  likes: User[];
  dislikes: User[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  likesCount: number;
  dislikesCount: number;
}

export interface Credentials {
    email: string; 
    password: string;
}