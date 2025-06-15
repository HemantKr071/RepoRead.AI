import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { itemVariants } from '@/utils/animation';

const RepoCardShimmer = () => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="bg-white/80 backdrop-blur-sm border-gray-200 h-full shimmer-card ">
        <CardContent className="p-6 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-5 w-5 bg-gray-300 rounded-full" />
              <div className="h-4 w-32 bg-gray-300 rounded" />
            </div>
            <div className="h-6 w-12 bg-gray-300 rounded-full" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-300 rounded" />
            <div className="h-4 w-5/6 bg-gray-300 rounded" />
          </div>

          {/* Metadata */}
          <div className="flex space-x-4">
            <div className="h-4 w-10 bg-gray-300 rounded" />
            <div className="h-4 w-10 bg-gray-300 rounded" />
            <div className="h-4 w-16 bg-gray-300 rounded" />
          </div>

          {/* Button */}
          <div className="h-10 w-full bg-gray-300 rounded" />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RepoCardShimmer;
