import {motion} from 'framer-motion';
import {FileText} from 'lucide-react';
const GeneratingReadmeLoader = () => {
  return (
      <>
        <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="h-screen overflow-hidden flex flex-col items-center justify-center rounded-2xl p-12 text-center border border-gray-200 shadow-lg"
        >
            <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="bg-black p-4 rounded-full w-fit mx-auto mb-6"
            >
                <FileText className="md:h-10 md:w-10 h-7 w-7 text-white" />
            </motion.div>
            <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">Generating your README...</h3>
            <p className="text-gray-600 md:text-lg text-sm">AI is analyzing your repository to generate a high-quality README.</p>
            <p className="text-gray-600 md:text-lg text-sm">
              It may take a little time depending on the size and complexity of the project.<br/>
              Thank you for your patience,Please stay on this page while we complete the process.
            </p>

        </motion.div>
      </>
  )
}

export default GeneratingReadmeLoader;