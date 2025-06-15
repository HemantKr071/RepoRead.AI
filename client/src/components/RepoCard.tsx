import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, Star, GitFork, Clock} from 'lucide-react';
import {motion} from 'framer-motion';
import {itemVariants } from '@/utils/animation';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

interface RepoCardProps {
  id : string; // Mongo Id
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  updated_at: string;
}
const RepoCard = ({id,name,description,language,stars,forks,updated_at} : RepoCardProps) => {
  const navigate = useNavigate();
 
   const navigateToRepo = useCallback(() => {
     navigate(`/generate-readme/${id}`, {
      state: {
        name,
        description,
      },
    });
  }, [navigate, id]);

  return (
    <motion.div
    variants={itemVariants}
    whileHover={{ y: -5, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    >
        <Card
         className="bg-white/80 backdrop-blur-sm border-gray-200 hover:shadow-xl transition-all duration-300 h-full">
            <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                <Github className="h-5 w-5 text-gray-600" />
                <h3 className="font-bold text-lg text-gray-900">{name}</h3>
                </div>
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-medium">
                {language}
                </span>
            </div>
            
            <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
            
            <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                <Star className="h-4 w-4" />
                <span>{stars}</span>
                </div>
                <div className="flex items-center space-x-1">
                <GitFork className="h-4 w-4" />
                <span>{forks}</span>
                </div>
                <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{new Date(updated_at).toLocaleDateString()}</span>
                </div>
            </div>
            
            <Button
                onClick={navigateToRepo}
                className="w-full cursor-pointer bg-black text-white border-0 hover:bg-gray-800 hover:shadow-lg transition-all duration-300"
            >
                Generate README
            </Button>
            </CardContent>
        </Card>
    </motion.div>
  )
}
export default RepoCard;