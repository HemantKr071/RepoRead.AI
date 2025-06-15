
import { motion } from 'framer-motion';
import { containerVariants,itemVariants } from '@/utils/animation';

export const Dashboard_Hero = () => {
  return (
    <motion.div
    variants={containerVariants}
    initial='hidden'
    animate='visible'
    className='w-full text-center flex flex-col justify-center items-center gap-3 my-8'
    >
        <motion.h1
        className='text-4xl font-bold text-black text-shadow-2xs'
        variants={itemVariants}
        >
          Select a Repository
        </motion.h1>
       
        <motion.p variants={itemVariants} className='text-xl text-gray-600 '>
          Choose a repository to generate an AI-powered README
        </motion.p>
    </motion.div>
  )
}
