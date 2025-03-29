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
  name: string;
  email: string;
  id: string;
}