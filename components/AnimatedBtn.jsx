"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti'
import { Check } from 'lucide-react'
import gemin from '../public/gemin.svg'
import Image from "next/image";
import {toast} from 'react-toastify'
import axios from 'axios'

export default function AnimatedBtn({Input, setGeneratedText, generatedText, setLink, SiteName, setSiteName}) {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isGenerated, setIsGenerated] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (isLoading && progress < 99) {
      const timer = setTimeout(() => {
        setProgress(prev => Math.min(prev + 5, 100))
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [isLoading, progress])

  useEffect(() => {
    if (isLoading && progress === 100) {
      
      if(generatedText) {
        setIsGenerated(true)
        setShowConfetti(true)
      }
    }
  }, [isLoading, progress, generatedText])

  function removeFirstAndLastLine(str) {
    const lines = str.split('\n'); 
    lines.shift();  
    lines.pop();    
    return lines.join('\n');  
  }

const UploadWebsite = async (gt) => {
    let SiteN; // Declare SiteN here
    if (SiteName) {
        SiteN = SiteName; // Assign value if SiteName exists
    } else {
        SiteN = `my-site-${Date.now()}`; // Assign default name
        setSiteName(SiteN);
    }

    const siteId = await createNewSite(SiteN); // Create a new site
    if (siteId) {
        await deployToSite(gt, siteId); // Make sure to await the deployment
    } else {
        toast.error("Deployment failed: Code not found");
    }
};

const createNewSite = async (siteName) => {
    try {
        const response = await axios.post('https://api.vercel.com/v13/projects', {
            name: siteName,
        }, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_VERCEL_API}`, 
                'Content-Type': 'application/json',
            },
        });
        return response.data.id; // Return the Site ID
    } catch (error) {
        console.error('Error creating site:', error);
        return null;
    }
};

const deployToSite = async (htmlString, siteId) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploadToSite`, {
            htmlString,
            siteId,
        });
        
        if(response.data.url) {
          setLink(response.data.url);
        }
        console.log('Deployment URL:', response.data.url);
        return response.data.url; // Return the deployment URL
    } catch (error) {
        console.error('Error deploying to Vercel:', error.response ? error.response.data : error.message);
    }
};


  const handleClick = async () => {
    if(Input.length > 20) {
	    if (!isLoading && !isGenerated) {
	      setIsLoading(true)

        try {
          const response = await axios.post('api/generate', {Input});
          setGeneratedText(removeFirstAndLastLine(response.data.text));
          if(response.data.text) {
            UploadWebsite(removeFirstAndLastLine(response.data.text))
          }
        } catch(error) {
          console.log(error)
        }
	    }
    } else {
    	toast.error("Explain about the website in detail")
    }
  }

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    disabled: { scale: 1 }
  }

  const progressVariants = {
    initial: { scaleX: 0 },
    animate: { scaleX: progress / 100 }
  }

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }

  const checkmarkVariants = {
    initial: { scale: 0, rotate: -45 },
    animate: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 200, damping: 10 } }
  }

  return (
    <>
      <motion.button
        className={`relative overflow-hidden w-[14rem] py-2 mt-4 rounded-full text-white font-bold text-lg  z-[2] ${
          isGenerated ? 'bg-gradient-to-r from-green-500 to-emerald-800' : 'bg-gradient-to-r from-purple-500 to-blue-900'
        } ${isLoading || isGenerated ? 'cursor-not-allowed' : 'hover:bg-blue-600'}`}
        onClick={handleClick}
        disabled={isLoading || isGenerated}
        variants={buttonVariants}
        initial="initial"
        whileHover={!isLoading && !isGenerated ? "hover" : "disabled"}
        whileTap={!isLoading && !isGenerated ? "tap" : "disabled"}
       >
            <motion.div
              className="absolute inset-0 bg-secondary z-[2]"
              variants={progressVariants}
              initial="initial"
              animate="animate"
              style={{ originX: 0 }}
            />
            <AnimatePresence mode="wait" className="z-[2]">
              {!isGenerated && (
                <motion.span
                  key="progress"
                  className="relative z-10 inline-block flex items-center justify-center"
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {isLoading ? (<p className="relative m-auto mx-auto" >{progress}%</p>) : (
                    <div className="flex gap-2  items-center m-auto">
                    <Image src={gemin} className="w-6 h-6 my-auto"/>
                    Generate Website
                    </div>
                  )}
                </motion.span>
              )}
              {isGenerated && (
                <motion.div
                  key="generated"
                  className="relative z-10 flex items-center justify-center space-x-2"
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                >
                  <motion.div
                    className="flex items-center justify-center  rounded-full p-1"
                    variants={checkmarkVariants}
                  >
                    <Check className="text-green-500" size={20} />
                  </motion.div>
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-zinc-100 pr-3"
                  >
                    Website Generated
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
      </motion.button>
    <div className="flex items-center justify-center absolute w-screen h-screen">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
    </div>
    </>
  )
}
