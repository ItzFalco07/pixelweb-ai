"use client";

import {useRef, useEffect} from 'react';
import {LoaderCircle} from 'lucide-react';
import Link from 'next/link';

const ShowLink = ({LinkOfSite, Name}) => {
	const display = useRef();

    useEffect(()=> {	
		if(!LinkOfSite) {
			setTimeout(()=> {
				if(display.current) {
					display.current.innerHTML = `
					Deploying website... 
					`
				} else {
					console.log('eat 5 star do nothing')
				}
			}, 2000)
			setTimeout(()=> {
				if(display.current) {
					display.current.innerHTML = `
					Generating Url... 
					`
				} else {
					console.log('eat 5 star do nothing')
				}
			}, 5000)
		} else {
			const oldSites = localStorage.getItem('GeneratedSites');
			let sitesArray = oldSites ? JSON.parse(oldSites) : [];
			const Url = Name ? `https://${Name}.vercel.app` : `https://${LinkOfSite}`
			sitesArray.push({ url: Url, name: Name });
			localStorage.setItem('GeneratedSites', JSON.stringify(sitesArray));
		}
    },[LinkOfSite])
	

  return (
<>
    {LinkOfSite ? (
    	<div className="flex gap-5 mt-8 items-center z-[100]">
        <h2>
            Website Link: 
        </h2>

		<Link href={Name ? `https://${Name}.vercel.app` : `https://LinkOfSite`}  target="_blank" rel="noopener noreferrer" className="z-[100] text-blue-500 underline">
		  {Name ? `${Name}.vercel.app` : LinkOfSite}
		</Link>

    	</div>
    ) : (
        <div className="deployment flex gap-3 mt-8 items-center">
            <LoaderCircle className="animate-spin w-4 h-4" />
            <h2 ref={display} className="flex items-center text-zinc-400">
                Hosting Website...
            </h2>
        </div>
    )}
</>
  );
};

export default ShowLink;