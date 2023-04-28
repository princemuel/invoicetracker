import { useAuthState } from '@src/context';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { useCookies } from 'react-cookie';

interface TokenPayload extends JwtPayload {
  email: string;
  photo: string | null;
  sub: string;
}

const useSession = () => {
  const [cookies] = useCookies(['jwt']);
  const token = useAuthState().token || cookies.jwt;

  if (!token) return null;
  const decoded = jwtDecode<TokenPayload>(token);
  const { email, photo, sub: id } = decoded;

  return { email, photo, id };
};

export { useSession };
