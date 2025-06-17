import DashBoard_Navbar from '@/components/Dashboard_Navbar';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/utils/animation';
import { Dashboard_Hero } from '@/components/Dashboard_Hero';
import RepoCard from '@/components/RepoCard';
import { Button } from '@/components/ui/button';
import RepoCardShimmer from '@/components/RepoCardSimmer';
import useRepos from '@/hooks/useRepos';
import { Helmet } from 'react-helmet-async';

const DashBoard = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { repos, totalPages, loading} = useRepos(currentPage, 9);

  const handleNext = () => setCurrentPage((prev) => prev + 1);
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <>
    <Helmet>
      <title>Dashboard — RepoRead.AI</title>
      <meta
        name="description"
        content="View your GitHub repositories and generate AI-powered, professional README files with RepoRead.AI."
      />

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:title" content="Dashboard — RepoRead.AI" />
      <meta property="og:description" content="Generate smart, detailed README files directly from your GitHub repos." />
      <meta property="og:image" content="https://reporead.ai.heyhemant.tech/public/DashBoardImage.png" />
      <meta property="og:url" content="https://reporead.ai.heyhemant.tech/dashboard" />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Dashboard — RepoRead.AI" />
      <meta name="twitter:description" content="Generate smart, detailed README files directly from your GitHub repos." />
      <meta name="twitter:image" content="https://reporead.ai.heyhemant.tech/public/DashBoardImage.png" />
    </Helmet>
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-t from-zinc-200 to-zinc-100"
    >
      <DashBoard_Navbar />
      <Dashboard_Hero />

      <motion.div
        variants={containerVariants}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mx-10"
      >
        {loading
          ? Array.from({ length: 9 }).map((_, i) => <RepoCardShimmer key={i} />)
          : repos.map((repo) => (
              <RepoCard
                key={repo._id}
                id={repo._id}
                name={repo.name}
                description={repo.description || "This repository does not include a description. Refer to the code or README for more context."}
                language={repo.language}
                stars={repo.stargazers_count}
                forks={repo.forks_count}
                updated_at={repo.updated_at}
              />
            ))}
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="py-14 mx-auto flex justify-center items-center gap-5"
      >
        <Button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="md:w-28 w-20 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Previous
        </Button>
        <p className="text-lg font-semibold text-gray-600">
          Page {currentPage} of {totalPages}
        </p>
        <Button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="md:w-28 w-20 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Next
        </Button>
      </motion.div>
    </motion.div>
    </>
  );
};

export default DashBoard;
