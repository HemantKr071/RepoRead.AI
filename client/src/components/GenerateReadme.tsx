import {motion} from 'framer-motion';
import { Button} from './ui/button';
import { Card,CardContent } from './ui/card';
import { Copy, PenLine } from 'lucide-react';
import { toast} from 'sonner';
import {itemVariants } from '@/utils/animation';
import { useState , useCallback,useRef} from 'react';

interface GenerateReadmeProps{
    repoName:string,
    repoDescription:string,
    generatedReadme:string
}
export const GenerateReadme = ({repoName,repoDescription,generatedReadme} : GenerateReadmeProps) => {

  const[readme,setReadme] = useState<string>(generatedReadme);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement>(null);
  
   const handleBlur = useCallback(() => {
    if (divRef.current) {
      setReadme(divRef.current.innerText);
      setIsEditing(false);
    }
  }, []);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(readme);
      
      toast.success('Copied to Clipboard!',{
         description: 'The README content was successfully copied.',
          style: {
            backgroundColor: '#e0f7e9',
            color: '#065f46',
          }
      });
    
    } catch (err) {
      
      toast.error('Failed to Copy!',{
        description: 'Something went wrong while copying.',
        style: {
          backgroundColor: '#fee2e2',
          color: '#991b1b',
        },
        });
    }
}, [readme]);
  
  return (
    <motion.div
    variants={itemVariants}
    className='flex flex-col gap-3 mx-10'
    >
      
        <motion.h1
        variants={itemVariants}
        className='mt-6 text-3xl font-black gradient-text text-shadow">'
        >
            README for {repoName}
        </motion.h1>

        <motion.p
        variants={itemVariants}
        className='text-gray-600 mb-5'
        >
           {repoDescription}
        </motion.p>

        <motion.div
            variants={itemVariants}
            className="flex justify-start items-center gap-5"
            >
            <Button
            onClick={copyToClipboard}
                variant="outline"
                className="border-0 flex justify-evenly items-center bg-black text-white hover:text-white hover:bg-gray-800 hover:shadow-lg transition-all duration-300 p-5"
            >
                <Copy className="h-5 w-5 mr-2" />
                Copy README
            </Button>

            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              className="p-5 flex justify-evenly bg-white text-black items-center"
            >
                <PenLine className="h-5 w-5 mr-2" />
                Edit README
            </Button>
        </motion.div>

        <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg mt-4">
            <CardContent className="p-6">
                <div
                  ref={divRef}
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                  onBlur={handleBlur}
                  className={`whitespace-pre-wrap font-mono text-sm text-black  overflow-y-auto outline-none ${
                    isEditing ? 'border border-gray-500 p-2 rounded bg-gray-100 shadow-inner' : ''
                  }`}
                >
                  {readme}
                </div>
            </CardContent>
        </Card>

        

    </motion.div>
  )
}
