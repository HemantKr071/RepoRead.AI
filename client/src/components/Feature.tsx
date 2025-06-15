import { Github,Wand2, FileText } from 'lucide-react';
import {motion} from 'framer-motion';
import { containerVariants,itemVariants } from '@/utils/animation';

export const Feature = () => {

  const features = [
    {
      icon: Github,
      title: "Connect GitHub",
      description: "Seamlessly integrate with your GitHub repositories"
    },
    {
      icon: Wand2,
      title: "Generate Detailed README",
      description: "AI-powered analysis creates comprehensive documentation"
    },
    {
      icon: FileText,
      title: "Customize & Copy",
      description: "Edit and perfect your README before copying to your repo"
    }
  ];
  return (
    <motion.div
    variants={containerVariants}
    initial='hidden'
    animate='visible'
    className='w-full flex flex-col justify-between mt-28  items-center gap-7'
    >
        
        <motion.h1
        variants={itemVariants}
        className='text-3xl md:text-5xl leading-tight text-shadow-lg font-bold bg-gradient-to-r from-slate-900 via-slate-900 to-slate-500 bg-clip-text text-transparent'
        >
            Three Simple Steps
        </motion.h1>

       <motion.p
        variants={itemVariants}
        className='max-w-3xl text-center text-2xl font-light text-gray-600 leading-relaxed'
       >
         Transform your repositories with <span className='text-black font-bold'>professional documentation</span>  in <br/> minutes

       </motion.p>
       
       <motion.div
        variants={itemVariants}
        className='grid md:grid-cols-3 gap-10 px-7 py-8'
       >
          {features.map((feature,index) => (
            <motion.div 
            variants={itemVariants}
            key={index} 
            className='rounded-3xl px-4 py-10 bg-white/80 shadow-xl flex flex-col justify-between items-center transform transition-transform duration-300 hover:scale-105 border border-gray-200 hover:shadow-2xl hover:border-gray-300'>

                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="bg-black p-5 rounded-3xl w-fit mx-auto mb-8 shadow-lg"
                >
                    <feature.icon className="h-10 w-10 text-white" />
                </motion.div>
        
                <h3 className="text-2xl font-bold mb-4 text-gray-900 text-shadow-sm">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed px-7">
                  {feature.description}
                </p>

            </motion.div>

          ))}
       </motion.div>


    </motion.div>
  )
}
