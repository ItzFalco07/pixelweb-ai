import {useState} from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Import Dracula theme
import {Button} from "@/components/ui/button";
import {Check} from 'lucide-react';

const ShowCode = ({ codeString }) => {
	const [Tick, setTick] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(codeString);
        setTick(true)

        setTimeout(()=> {
        	setTick(false)
        }, 2000)
    };

    return (
    	<div className="relative flex flex-col items-center justify-center py-[10em] md:w-[70%] w-[80%]">
    		<Button
    		    variant="outline"
    		    className="absolute z-[100] top-0 right-0 w-12 h-12 mt-[12em] mr-[0.6em]"
                onClick={handleCopy} 
            >

              {Tick ? <Check className="text-green-500 animate-scale-up w-5 h-5 absolute" /> : "Copy" }  
            </Button>
        <div className="relative rounded-[1em] z-[2] w-[100%]  h-[50em] overflow-scroll " >
            <SyntaxHighlighter language="html" style={dracula} className="absolute top-[-20px] text-[0.8em] md:text-[1em] sm:text-[0.92em]">
                {codeString}
            </SyntaxHighlighter>
        </div>
    	</div>
    );
};

export default ShowCode;