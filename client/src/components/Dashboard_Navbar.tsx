import { Button } from './ui/button'
import { motion } from 'framer-motion';
import { Github,WandSparkles} from 'lucide-react';
import { containerVariants,itemVariants } from '@/utils/animation';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { handleSignOut } from '@/utils/handleLogout';

const DashBoard_Navbar = () => {
  const {user,setUser} = useUser();
  const navigate = useNavigate();
  return (
    <motion.header
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        className=" flex justify-between items-center shadow-sm  bg-white/80 backdrop-blur-sm border-b  border-gray-200 sticky top-0 z-50 p-3"
        variants={containerVariants}
      >

        <motion.div 
        onClick={() => navigate("/")}
        className='flex justify-center items-center gap-4 md:ml-4 ml-2 cursor-pointer'
        variants={itemVariants}
        >
            <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="bg-black p-3 rounded-2xl shadow-lg"
                
                >
                <WandSparkles className="h-5 w-5 text-white" />
            </motion.div>
            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-500 bg-clip-text text-transparent">
                RepoRead.AI
            </div>
        </motion.div>

        <motion.div
        variants={itemVariants}
        className='flex items-center justify-center gap-3 md:gap-5 md:mr-4 mr-2'
        >
            <motion.img 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 0.8, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className='h-9 w-9 md:h-12 md:w-12 border-4  border-zinc-300 rounded-full object-cover overflow-hidden' 
            src={user?.avatarUrl} 
            alt="Profile Image" 
            />
            <div className='hidden sm:block text-lg text-black font-semibold'>Welcome, {user?.username}</div>
            <Button onClick={() => handleSignOut({setUser,navigate})} className='py-5 cursor-pointer gap-3 md:min-w-32 min-w-12 hover:bg-gray-700 hover:scale-105 active:scale-105 transition-all duration-300'> <Github className='' size={40} strokeWidth={2} /> Sign Out</Button>
        </motion.div>
        

      </motion.header>
  )
}
export default DashBoard_Navbar;