
"use client"

import React, { useEffect, useState } from 'react'

function page() {
  const [range, setRange] = useState<number>(50)

  function stereorize() {
    
    let audioElt;
    audioElt =  document.querySelector("audio");
  const audioCtx = new AudioContext()
    let panNode = new StereoPannerNode(audioCtx)
    if (!audioElt) return;
    if (audioElt) {
  let source = new MediaElementAudioSourceNode(audioCtx, {
          mediaElement: audioElt,
        });
  panNode.pan.value = Number(range)
  source.connect(panNode);
  panNode.connect(audioCtx.destination) 
  }
}
    const stereo = (e: React.ChangeEvent<HTMLInputElement>) => {
      setRange(Number(+e.target.value));
      stereorize()
    
    };
  return (

    <div className='flex h-screen w-full items-center justify-around flex-col  text-zinc-100  p-16'>
      <div className='w-80'>
        <h1 className='text-2xl text-center '>Play with the setting for you to enjoy playing with your digital pedals</h1>
      </div>
       <div className="absolute inset-0 bg-gradient-to-b from-purple-700/20 " />
    <div className='relative flex gap-10'>
        <div >
        <div className='flex gap-4 justify-center'>
          <div className='bg-slate-400  w-4 h-4'></div>
             <div className='bg-slate-400  w-4 h-4'></div>
       </div>

          <div className='bg-gradient-to-br from-slate-300 to-slate-600 px-9 py-9 rounded-xl'>
          <h1 className='text-center mb-2'>Stereo</h1>

                <audio controls>
      <source src="/viper.ogg" type="audio/ogg" />
      <source src="/viper.mp3" type="audio/mp3" />
      <p>This demo needs a browser supporting the &lt;audio&gt; element.</p>
    </audio>
            <input className='panel'  type="range" min="0" max="100" step={1} value={range}  onChange={stereo}/>
    
        </div>
      </div>


        <div >
        {/* <div className='flex gap-4 justify-center'>
          <div className='bg-slate-400  w-2 h-4'></div>
             <div className='bg-slate-400  w-2 h-4'></div>
       </div> */}

          {/* <div className='bg-gradient-to-b from-orange-300 to-orange-400 px-9 py-9 rounded-xl'>
            
            <div className='flex gap-2'>
              <div className='py-8 px-8 rounded-full bg-slate-50'/>

             <div className='py-8 px-8 rounded-full bg-slate-50'/>
            </div>
        </div> */}
      </div>
      
      </div>
      </div>
   
  )
}

export default page
