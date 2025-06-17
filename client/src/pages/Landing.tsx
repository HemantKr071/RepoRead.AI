import { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Feature } from '@/components/Feature';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { Navbar } from '@/components/Navbar';
import ScreenMockup from '@/components/ScreenMockup';
import { useUser } from '@/context/UserContext';
import { toast} from 'sonner';
import { Helmet } from "react-helmet-async";

const API_URL = import.meta.env.VITE_API_URL;

const Landing = () => {
  const navigate = useNavigate();
  const {setUser } = useUser();

  useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  // Check if we've already used this code in sessionStorage
  const codeUsed = sessionStorage.getItem('github_code_used');

  if (code && !codeUsed) {
    sessionStorage.setItem('github_code_used', 'true'); // Prevent reuse
    
    axios.get(`${API_URL}/auth/github/callback?code=${code}`)
      .then(response => {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        setUser(user);

        // Clean the URL
        window.history.replaceState({}, document.title, '/');

        toast.success('SignIn Successfully',{
          description: `Welcome to RepoRead.AI, ${user.name}`,
          style: {
            backgroundColor: '#e0f7e9',
            color: '#065f46',
          }
        });

      })
      .catch(err => {
        console.error('GitHub OAuth failed:', err);
        sessionStorage.removeItem('github_code_used'); // allow retry
      });
  } else if (code && codeUsed) {
    // If code is in URL but already used, just clean it
    window.history.replaceState({}, document.title, '/');
  }
}, [navigate, setUser]);


  const handleSignIn = () => {
    window.location.href = `${API_URL}/auth/github`;
  };
  return (
    <div className='min-h-screen bg-gradient-to-t from-zinc-300 to-zinc-100'>
      

      <Helmet>
        <title>RepoRead.AI — Instantly Generate Professional GitHub READMEs</title>
        <meta
          name="description"
          content="RepoRead.AI is an AI-powered tool that helps developers generate clean, detailed, and professional README files for GitHub projects — instantly."
        />
        
        {/* Open Graph (Facebook, LinkedIn) */}
        <meta property="og:title" content="RepoRead.AI -  Github Readme Generator,Instantly Generate Professional GitHub READMEs" />
        <meta
          property="og:description"
          content="Github Readme Generator that Automatically generate professional README files from your GitHub repos using AI. Powered by Langchain and LLMs. Built for developers, by a developer."
        />
        <meta property="og:image" content="https://reporead.ai.heyhemant.tech/public/LandingPageImage.png" />
        <meta property="og:url" content="https://reporead.ai.heyhemant.tech/" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="RepoRead.AI — Instantly Generate Professional GitHub READMEs" />
        <meta
          name="twitter:description"
          content="Generate a full, detailed README in seconds using RepoRead.AI. Just connect your GitHub and go!"
        />
        <meta name="twitter:image" content="https://reporead.ai.heyhemant.tech/public/LandingPageImage.png" />
      </Helmet>
       
       {/* Main Component Starts Here */}
      <Navbar handleSignIn={handleSignIn} />
      <Hero />
      <ScreenMockup />
      <Feature />
      <Footer />
      <div className="w-full py-5 text-center text-lg md:text-xl text-gray-600 shadow-xl">
        © 2025 RepoRead.AI. Developed by <span className="font-semibold text-black">@Hemant</span>
      </div>
    </div>
  );
};

export default Landing;
