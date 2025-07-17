export interface User {
  token: string | null;
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
}
