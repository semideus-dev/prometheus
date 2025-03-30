interface SignUpProps {
  uid: string;
  username: string;
  email: string;
  password: string;
}

interface SignInProps {
  email: string;
  idToken: string;
}

interface User {
  username: string;
  email: string;
  id: string;
  avatar: string;
}

interface Interview {
  id: string;
  role: string;
  level: string;
  questions: string[];
  techstack: string[];
  createdAt: string;
  userId: string;
  type: string;
  finalized: boolean;
}

interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}