export interface Post {
  id: string;
  imageUrl: string;
  caption: string;
  author: string;
  likes: number;
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface PaginatedPosts {
  items: Post[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface CommentsResponse {
  postId: string;
  items: Comment[];
}

export class ApiException extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
  ) {
    super(message);
    this.name = "ApiException";
  }
}
