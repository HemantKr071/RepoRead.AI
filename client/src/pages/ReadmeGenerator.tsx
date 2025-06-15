import {motion} from 'framer-motion';
import { containerVariants,itemVariants } from '@/utils/animation';
import DashBoard_Navbar from '@/components/Dashboard_Navbar';
import { GenerateReadme } from '@/components/GenerateReadme';
import { useParams,useLocation } from 'react-router-dom';
import GeneratingReadmeLoader from '@/components/GeneratingReadmeLoader';
import useReadme from '@/hooks/useReadme';
import { useEffect } from 'react';

interface RepoState {
  name: string;
  description: string;
}

export const ReadmeGenerator = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { name, description } = (location.state as RepoState) || {};
  
  if (!id) {
    return <div className="text-red-500">Invalid repository ID.</div>;
  }

  const { readme, loading,error } = useReadme(id );
  return (
    <motion.div
      initial='hidden'
      animate='visible'
      variants={containerVariants}
      className='min-h-screen bg-gradient-to-t from-zinc-200 to-zinc-100'
    >
      <DashBoard_Navbar/>
      {
        loading ? (
        <GeneratingReadmeLoader/>
      ) : (
        <GenerateReadme 
        repoName={name} 
        repoDescription={description} 
        generatedReadme={readme}/>
      )}

    </motion.div>
  )
}
export default ReadmeGenerator;