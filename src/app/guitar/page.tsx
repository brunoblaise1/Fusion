
"use client"
import * as Tone from "tone"
import React, { useEffect, useRef, useState } from 'react'
import toast from "react-hot-toast";
import Multi from "@/components/Multi";

function page() {

  const [code, setCode] = useState(`
// avoid any keyword in comments   
 play E2
// sound C5 in 6n 
 play C5
// sound A4 in 6n
 play A4
 play B2
 play F5
 `)
  //TODO: play infinite
  
  const runCode = () => {  
  const synth = new Tone.PolySynth(Tone.Synth).toDestination();
const now = Tone.now();
    const capitalLetters = code.match(keys) || [];
  for (let i=0; i < capitalLetters.length; i++){
    synth.triggerAttackRelease(capitalLetters[i], "6n", now + (i+1))

    toast(`Key being payed ${capitalLetters[i]}`)
    }
  }
  const [range, setRange] = useState<number>(50)
  const audioCtx = new AudioContext()
  function stereorize() {
    let source;
    let stream;

    let panNode = new StereoPannerNode(audioCtx)
    const constaraints = { audio: true }
    navigator.mediaDevices.getUserMedia(constaraints)
      .then((stream) => {
        source = audioCtx.createMediaStreamSource(stream)
        panNode.pan.value = Number(range)
        source.connect(panNode);
        panNode.connect(audioCtx.destination)
      }).catch(function (err) {
        console.error("Error")
      })
  }

  const stereo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRange(Number(+e.target.value));
    stereorize()
  };
  
  const editorRef = useRef<HTMLDivElement>(null);

  const keyword = /play/g
  let commetReg = /\/\/.*/g
      
  const keys = /[A-Z]./g
  // let search = keys.exec(code)?.forEach((e) => {
  //   synth.triggerAttackRelease("e", "8n");
  // })

  const applySyntaxHighlighting = (text: string) => {
    return text.replace(commetReg, '<code class="text-zinc-400">$&</code>').replace(keyword, '<code class="text-orange-300">$&</code>')
      .replace(keys, '<code class="text-purple-400">$&</code>');
    
    
    
  };

  

  const handleInput = () => {
    const editor = editorRef.current;
  
 
    if (editor) {
         const text = editor ? editor.innerText : '';
   setCode(text)

  const highlightedText = applySyntaxHighlighting(text);
    
      editor.innerHTML = highlightedText || '';
    };
  }
    useEffect(() => {
      const editor = editorRef.current;

      if (editor) {
        handleInput()
        editor.addEventListener('input', handleInput);
      }
      return () => {
        if (editor) {
          editor.removeEventListener('input', handleInput);
        }
      };
    }, []);
    return (

      <div className='flex h-screen w-full items-center justify-around flex-col  text-zinc-100  p-16'>
        <div className='w-80'>
          <h1 className='text-2xl text-center '>Play with the setting for you to enjoy playing with your digital pedals you can even play using the code below(add more feature soon)</h1>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-700/20 " />
      <Multi/>
        <div className="grid grid-cols-1 gap-4 items-center mt-4">
         
          <div className='relative px-7 py-8 mt-4 bg-black/90 rounded-xl border'>
             <button className="p-1 bg-slate-600 rounded-md" onClick={runCode}>Run</button>
                   <div  id="editor" 
              style={{ whiteSpace: 'pre-wrap' }} ref={editorRef} contentEditable={true} 
            aria-multiline="true"
            content={code} className="outline-none">
            
          <pre >
            <code 
             
              >
              {code}
            </code>
          </pre>
       
        </div>
        </div>
            <div className='relative flex flex-col gap-10 md:flex-row'>
          <div >
            <div className='flex gap-4 justify-center'>
              <div className='bg-slate-400  w-4 h-4'></div>
              <div className='bg-slate-400  w-4 h-4'></div>
            </div>

            <div className='bg-gradient-to-br from-slate-300 to-slate-600 px-9 py-9 rounded-xl'>
              <div className='flex gap-4 justify-center
            flex-col'>
                <h1 className='text-center mb-2'>Stereo</h1>
              </div>

              {/* <audio controls>
      <source src="/viper.ogg" type="audio/ogg" />
      <source src="/viper.mp3" type="audio/mp3" />
      <p>This demo needs a browser supporting the &lt;audio&gt; element.</p>
    </audio> */}
              <input className='panel' type="range" min="0" max="100" step={1} value={range} onChange={stereo} />
            
           
    
            </div>
          </div>

  <div >
            <div className='flex gap-4 justify-center'>
              <div className='bg-slate-400  w-4 h-4'></div>
              <div className='bg-slate-400  w-4 h-4'></div>
            </div>

            <div className='bg-gradient-to-br from-slate-300 to-slate-600 px-9 py-9 rounded-xl'>
              <div className='flex gap-4 justify-center
            flex-col'>
                <h1 className='text-center mb-2'>Stereo</h1>
              </div>

              {/* <audio controls>
      <source src="/viper.ogg" type="audio/ogg" />
      <source src="/viper.mp3" type="audio/mp3" />
      <p>This demo needs a browser supporting the &lt;audio&gt; element.</p>
    </audio> */}
              <input className='panel' type="range" min="0" max="100" step={1} value={range} onChange={stereo} />
            
           
    
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

      
      </div>
   
    )
  
}

export default page
