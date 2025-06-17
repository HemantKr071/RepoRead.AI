import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { Github, WandSparkles } from 'lucide-react';
import { containerVariants, itemVariants } from '@/utils/animation';
import { useUser } from '@/context/UserContext';
import { handleSignOut } from '@/utils/handleLogout';

export const Navbar = ({ handleSignIn }: { handleSignIn: () => void }) => {
  const { user, setUser } = useUser();

  return (
    <motion.div
      className="min-w-screen border-white z-50 h-20 md:px-10 px-5 py-14 flex justify-between items-center md:gap-10 gap-5"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Left side: Logo */}
      <motion.div className="flex justify-center items-center gap-4" variants={itemVariants}>
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="bg-black p-3 rounded-2xl shadow-lg"
        >
          <WandSparkles className="h-7 w-7 text-white" />
        </motion.div>
        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-500 bg-clip-text text-transparent">
          RepoRead.AI
        </div>
      </motion.div>

      {/* Right side: User or Sign In */}
      <motion.div variants={itemVariants}>
        {user ? (
          <div className="flex items-center gap-3">
            <motion.img
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 0.8, x: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-9 w-9 md:h-12 md:w-12 border-4 border-zinc-300 rounded-full object-cover overflow-hidden"
              src={user.avatarUrl}
              alt="Profile"
            />
            <div className="hidden sm:block text-lg text-black font-semibold">
              Welcome, {user.username}
            </div>
            <Button
              className="py-5 cursor-pointer gap-3 md:min-w-32 min-w-16 hover:bg-gray-700 hover:scale-105 active:scale-105 transition-all duration-300"
              onClick={() => handleSignOut({ setUser })}
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <Button
            className="py-5 cursor-pointer gap-3 md:min-w-32 min-w-16 hover:bg-gray-700 hover:scale-105 active:scale-105 transition-all duration-300"
            onClick={handleSignIn}
          >
            <Github size={40} strokeWidth={2} /> Sign In
          </Button>
        )}
      </motion.div>
    </motion.div>
  );
};
