import {itemVariants } from '@/utils/animation';
import { motion } from 'framer-motion';
import { Github, FileText, Sparkles, CheckCircle } from 'lucide-react';

const ScreenMockup = () => {
 
  const steps = [
    { icon: Github, text: "Connect GitHub", completed: true },
    { icon: FileText, text: "Analyze Repository", completed: true },
    { icon: Sparkles, text: "Generate README", completed: false, active: true }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      variants={itemVariants}
      className="relative  mx-auto max-w-2xl"
    >
      {/* Browser Window */}
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Browser Header */}
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="flex-1 text-center">
            <div className="bg-white rounded-md px-3 py-1 text-sm text-gray-600 border border-gray-200">
              RepoRead.AI/generate
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Generating your README...
            </h3>
            <p className="text-gray-600">AI is analyzing your repository</p>
          </div>

          {/* Progress Steps */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-300 border ${
                  step.active 
                    ? 'bg-gray-50 border-gray-300' 
                    : step.completed 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  step.active 
                    ? 'bg-gray-100 text-gray-700' 
                    : step.completed 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {step.completed ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                <span className={`font-medium ${
                  step.active ? 'text-gray-900' : step.completed ? 'text-green-900' : 'text-gray-500'
                }`}>
                  {step.text}
                </span>
                {step.active && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="ml-auto"
                  >
                    <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full"></div>
                  </motion.div>
                )}
                {step.completed && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.2 }}
                    className="ml-auto text-green-600"
                  >
                    <CheckCircle className="h-4 w-4" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Preview Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-6 bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm border border-gray-700"
          >
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-4 w-4" />
              <span className="text-gray-300">README.md</span>
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, delay: 1.5 }}
              className="space-y-1"
            >
              <div className="text-white"># My Awesome Project</div>
              <div className="text-gray-400">## Description</div>
              <div className="text-green-400">A powerful tool for...</div>
              <div className="text-gray-400">## Installation</div>
              <div className="text-yellow-400">```bash</div>
              <div className="pl-4 text-gray-300">npm install</div>
              <div className="text-yellow-400">```</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-4 -right-4 bg-black text-white p-3 rounded-full shadow-lg"
      >
        <Sparkles className="h-6 w-6" />
      </motion.div>
      
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-4 -left-4 bg-gray-700 text-white p-3 rounded-full shadow-lg"
      >
        <Github className="h-6 w-6" />
      </motion.div>
    </motion.div>
  );
};

export default ScreenMockup;
