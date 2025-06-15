import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const API_URL = import.meta.env.VITE_API_URL;

const useRepos = (pageNumber: number, pageSize: number = 9) => {
  const [repos, setRepos] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      setError(null);
      const cachedData = localStorage.getItem(`repos-page-${pageNumber}`);

      if (cachedData) {
      
        const parsed = JSON.parse(cachedData);
        console.log('Cached Data', parsed);
        setRepos(parsed.repos);
        setTotalPages(parsed.totalPages);
        setLoading(false);
        return; 
      }

      try {
        const token = localStorage.getItem('token');
        if(!token){
          console.log("Token not found! Please Log In");
          navigate('/');
          return;
        }
        const response = await axios.get(`${API_URL}/api/v1/repos?page=${pageNumber}&limit=${pageSize}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response);

        setRepos(response.data.repos);
        setTotalPages(response.data.totalPages);

        
        sessionStorage.setItem(
          `repos-page-${pageNumber}`,
          JSON.stringify({
            repos: response.data.repos,
            totalPages: response.data.totalPages,
          })
        );
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [pageNumber, pageSize]);

  return { repos, totalPages, loading, error };
};

export default useRepos;
