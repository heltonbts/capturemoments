export interface RegisterRequest {
  title: string;
  story: string;
  visitedLocation: string[];
  imageUrl: string;
  visitedDate: string;
  user: {
    userId: string;
  };
}
