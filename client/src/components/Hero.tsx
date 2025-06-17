import { Button } from './ui/button';
import {motion} from 'framer-motion';
import { Github , ArrowRight } from 'lucide-react'
import { containerVariants,itemVariants } from '@/utils/animation';
import { useNavigate } from 'react-router-dom';
//import { useCallback } from 'react';
export const Hero = () => {
  const navigate = useNavigate();
 /*  const handleClick = useCallback(() => {
    window.open("https://drive.google.com/file/d/1Gv-ztgzuj_OO7bv5jGBXnlqikpv5VydA/view?usp=sharing", "_blank");
  }, []); */
  return (
    <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className='w-full mt-10 flex flex-col items-center gap-5'>
        
        <motion.h1 className='text-7xl md:text-8xl leading-tight text-shadow-lg font-bold bg-gradient-to-r from-slate-900 via-slate-900 to-slate-500 bg-clip-text text-transparent'
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            variants={itemVariants}
        >
            RepoRead.AI
        </motion.h1>

        <motion.h2 
        className='text-3xl md:text-4xl md:font-bold font-semibold  text-gray-900 leading-tight text-shadow'
        variants={itemVariants}
        >
            Transform your
        <span className="relative">
                <span className="text-black font-black pl-2">
                     repositories
                </span>
                <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-black rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                />
            </span>
        </motion.h2>

        <motion.div 
        className='max-w-3xl text-center py-3'
        variants={itemVariants}
        >
            <p className='text-xl md:text-2xl text-gray-600 font-light mx-auto leading-relaxed'>Generate <b className='text-black font-bold'>intelligent READMEs</b> with AI that showcase your projects professionally</p>
        </motion.div>

        <div className='flex flex-col sm:flex-row gap-6 justify-center items-center mb-16'>
            <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                variants={itemVariants}
                >
                <Button
                onClick={() => navigate("/dashboard")}
                size="lg"
                className="bg-black cursor-pointer hover:bg-gray-800 text-white border-0 px-10 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                    <Github className="h-6 w-6 mr-3" />
                    Start Creating
                    <ArrowRight className="h-6 w-6 ml-3" />
                </Button>
            </motion.div>
                
            <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                variants={itemVariants}
                >
                <Button
                    //onClick={handleClick}
                    variant="outline"
                    size="lg"
                    className="border-2 cursor-pointer border-gray-300 hover:bg-gray-50 hover:border-gray-400 px-10 py-6 text-xl font-semibold text-gray-900 rounded-2xl transition-all duration-300"
                >
                    Watch Demo
                </Button>
            </motion.div>
        </div>
        
    </motion.div>
  )
}
