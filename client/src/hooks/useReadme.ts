import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast} from 'sonner';
const API_URL = import.meta.env.VITE_API_URL;

const useReadme = (id :string) => {
  const cachedReadme = localStorage.getItem(`repoCache-${id}`);
  const [readme, setReadme] = useState<string>(cachedReadme || "Readme is Generating...");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReadme = async () => {
      setLoading(true);
      setError(null);
      if(cachedReadme){
        setLoading(false);
        console.log('Repo fetched from Cache!!');
        setReadme(cachedReadme);
        return;
      }
      try {
        if(!id){
            toast.error('Repo not Selected!',{
            description: `Please select a repo to generate Readme`,
            style: {
              backgroundColor: '#e0f7e9',
              color: '#065f46',
            }
          });
          console.log("Repo ID is not valid");
          navigate('/dashboard');
          return;
        }
        const token = localStorage.getItem('token');
        if(!token){
          console.log("Token not found! Please Log In");
          navigate('/');
          return;
        }
        const response = await axios.get(`${API_URL}/api/v1/repos/readme/${id}`,{
           headers: {
            Authorization: `Bearer ${token}`,
          },
        }); 
        const fetchedReadme = response.data.readme;

        console.log("Readme Fetched Successfully!!");
       
        localStorage.setItem(`repoCache-${id}`, fetchedReadme);
        console.log('Readme cached Successfully');
        setReadme(fetchedReadme);
        
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReadme();
  }, [id]);

  return { readme, loading, error };
};

export default useReadme;
