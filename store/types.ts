
export interface Post {
    id: number;
    title: string;
    content: string;
  }
  
  export interface PostsState {
    posts: Post[];
  }
  

  export interface UserState {
    username: string | null;
    email: string | null;
  }