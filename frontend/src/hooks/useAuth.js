import { useUser } from '../context/UserContext';

export default function useAuth() {
  return useUser();
}
