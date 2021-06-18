import axios, { AxiosInstance } from "axios";

class JsonplaceholderService {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "https://jsonplaceholder.typicode.com"
    });
  }

  getPosts(_limit?: number, _start?: number) {
    return this.client.get<Post[]>("/posts", {
      params: { _limit, _start }
    });
  }

  getPostComments(postId: number) {
    return this.client.get<Comments[]>(`/posts/${postId}/comments`, {
      params: { postId }
    });
  }

  getPhotos(_limit?: number, _start?: number) {
    return this.client.get<Photo[]>("/photos", {
      params: { _limit, _start }
    });
  }
};


interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface Photo {
  id: number;
  title: string;
  url: string;
  albumId: number;
  thumbnailUrl: string;
}

interface Comments {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export default JsonplaceholderService;
