"use client"; // This marks the component as a Client Component

import Image from "next/image";
import {ModeToggle} from "@/components/ModeToggle"
import Logo from '../public/logo.svg'
import {Button} from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {useEffect, useState} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from 'next-themes';
import AnimatedBtn from '@/components/AnimatedBtn';
import ShowCode from '@/components/ShowCode';
import ShowLink from '@/components/ShowLink'
import GeneratedSites from '@/components/GeneratedSites';

export default function Home() {
  const [Input, setInput] = useState(''); 
  const [generatedText, setGeneratedText] = useState(false);
  const { theme } = useTheme(); 
  const [Link, setLink] = useState(false);
  const [SiteName, setSiteName] = useState(false);

  return (
    <div className="flex relative w-screen min-h-screen flex-col items-center overflow-x-hidden">
      <nav className="w-full h-[70px] relative top-0  flex items-center px-5 justify-between z-[2]">
        <Image src={Logo} className="w-[12em] sm:w-[14em]"/>

        <div className="right flex gap-5 items-center">
          <ModeToggle/>
          <Button variant="outline" className="hidden sm:block" >Login</Button>
          <Button variant="secondary" className="hidden sm:block" >Sign Up</Button>
        </div>
      </nav>

      <div className="hero md:w-[60%] w-[80%]  h-full flex flex-col gap-4 z-[2] mt-[6rem]">
        <input onChange={(e)=> setSiteName(e.target.value)} type="text" placeholder="Enter a site name" className="w-full h-[40px] px-4 rounded-[12px] border-[1px] border-secondary" />
        <textarea value={Input} onChange={(e)=> setInput(e.target.value)} type="text" placeholder="Explain your webpage in as much detail as possible" className="w-full h-[10rem] rounded-[12px] py-3 px-4 border-[1px] border-input outline-none" />
      </div>


      <AnimatedBtn setSiteName={setSiteName} Input={Input} setGeneratedText={setGeneratedText} generatedText={generatedText} setLink={setLink} SiteName={SiteName}/>
      {generatedText && <ShowLink LinkOfSite={Link} Name={SiteName}/>}
      <ToastContainer theme={theme == 'dark' || theme == 'system' ? 'dark' : 'light'}/>
      {generatedText && (
        <ShowCode codeString={generatedText} />
      )}
      <GeneratedSites/>
    </div>
  );
}
