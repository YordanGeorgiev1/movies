interface AuthInterface {
  token: string | null;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export default AuthInterface;

export interface MovieInterface {
  id: number;
  title: string;
  genre: string;
  year: number;
  description?: string;
  director?: string;
  stars?: string[];
  poster: string;
  trailer?: string
}

export type Props = {
  children: React.ReactNode;
};
