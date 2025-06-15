import { toast } from 'sonner';
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

type HandleSignOutParams = {
  setUser: (user: any) => void;
  navigate?: (path: string) => void;
};

export const handleSignOut = async ({ setUser, navigate }: HandleSignOutParams) => {
  const token = localStorage.getItem('token');
  if(!token){
    console.log("Token not found!");
    return;
  }
  await axios.delete(`${API_URL}/github/logout`,{
    headers: {
        Authorization: `Bearer ${token}`,
    },
  })
  localStorage.clear();
  sessionStorage.clear();
  setUser(null);
  
  toast.success('Logged out successfully!', {
    description: 'You have been signed out.',
    style: {
      backgroundColor: '#e0f7e9',
      color: '#065f46',
    },
  });

  if (navigate) navigate('/');
};
