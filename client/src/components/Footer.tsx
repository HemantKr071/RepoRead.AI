import {motion} from 'framer-motion';
import { Github} from 'lucide-react';
import { Button } from './ui/button';
import { containerVariants,itemVariants } from '@/utils/animation';
import { useCallback } from 'react';


export const Footer = () => {
  
  const handleClick = useCallback(() => {
    window.open("https://github.com/HemantKr071/RepoRead.AI", "_blank");
  }, []);
  return (
    <motion.div
    variants={containerVariants}
    className='flex justify-center items-center px-10 py-14 mt-14 gap-8'
    >

      <motion.div
       initial='hidden'
       animate='visible'
      variants={itemVariants}
      className='text-center'
      >
        <h3 className='text-black font-bold text-2xl'>Ready to enhance your repositories?</h3>
        <p className='text-gray-600 text-xl pt-2'>Join thousands of developers creating better documentation</p>
      </motion.div>
     
     <motion.div
       initial='hidden'
       animate='visible'
      variants={itemVariants}
      >
        <Button
            onClick={handleClick}
            className=" w-3xs bg-black cursor-pointer hover:bg-gray-800 text-white border-0 px-16 py-6 text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
            <Github className="h-5 w-5 mr-2" />
            Give us a Star
        </Button>
      </motion.div>

    </motion.div>
  )
}
