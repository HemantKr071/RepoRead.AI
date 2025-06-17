import {motion} from 'framer-motion';
import { containerVariants} from '@/utils/animation';
import DashBoard_Navbar from '@/components/Dashboard_Navbar';
import { GenerateReadme } from '@/components/GenerateReadme';
import { useParams,useLocation } from 'react-router-dom';
import GeneratingReadmeLoader from '@/components/GeneratingReadmeLoader';
import useReadme from '@/hooks/useReadme';
import { Helmet } from 'react-helmet-async';

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

  const { readme, loading} = useReadme(id );
  return (
    <>
    <Helmet>
        <title>README Generated for {name} — RepoRead.AI</title>
        <meta
          name="description"
          content={`Auto-generated professional README for the repository "${name}". Powered by AI — RepoRead.AI.`}
        />
        <meta property="og:title" content={`README for ${name} — RepoRead.AI`} />
        <meta
          property="og:description"
          content={`Explore the AI-generated README for "${name}" with full project context, features, and installation guide.`}
        />
        <meta
          property="og:image"
          content="https://reporead.ai.heyhemant.tech/public/ReadmeGeneratorImage.png"
        />
        <meta property="og:type" content="website" />

        {/* Twitter/X Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`README for ${name} — RepoRead.AI`} />
        <meta
          name="twitter:description"
          content={`Explore the auto-generated README for ${name}. Fast, detailed, and professional.`}
        />
        <meta
          name="twitter:image"
          content="https://reporead.ai.heyhemant.tech/public/ReadmeGeneratorImage.png"
        />
    </Helmet>

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
    </>
  )
}
export default ReadmeGenerator;