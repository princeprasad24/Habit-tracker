import React, { useEffect, useState } from 'react'

export default function LoadingPage() {

    const loadingText = "Loading..."
    const [displayText , setDisplayText] = useState("");
    useEffect(()=>{
        let idx = 0;
        const interval = setInterval(()=>{
            setDisplayText((prev) => prev + loadingText[idx]);
            idx++;
            if(idx >= loadingText.length){
                idx = 0;
                setDisplayText("");
                clearInterval(interval);
            }

        }, 100);

        return () => clearInterval(interval);
    }, [])
    
    // console.log(displayText);
  return (
    <>
        <div className="flex flex-col justify-center items-center min-h-screen bg-slate-900">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
            <p className="mt-4 text-white text-lg">{displayText}</p>
        </div>
    </>
  )
}
