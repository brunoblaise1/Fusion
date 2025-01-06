"use client"

import React, { useRef } from 'react'
let b = 9
function Multi() {
    let audioCtx:any = null;
    async function getFile(filepath: any) {
        const reponse = await fetch(filepath)
        const arryB = await reponse.arrayBuffer()
        const audioB = await audioCtx.decodeAudioData(arryB);
        return audioB;
    }
    async function loadFile(filepath: any) {
        const track = await getFile(filepath)
        return track
    }
    
    let offset = 0;

    function playTrack(audioBuffer: any) {

        const trackSource = new AudioBufferSourceNode(audioCtx, {
            buffer: audioBuffer
        })
        trackSource.connect(audioCtx.destination);

         if (offset == 0) {
          trackSource.start();
          offset = audioCtx.currentTime;
        } else {
          trackSource.start(0, audioCtx.currentTime - offset);
        }

        return trackSource
    }

//     const click = () => {
//          if (audioCtx != null) {
//           return;
//         }
//         audioCtx = new AudioContext()

//     }
//     const trackEls = Array.from(document.getElementsByClassName('li'));
    
// trackEls.forEach(element => {
//     if (audioCtx.state === "suspended") {
//         audioCtx.resume();
//     }
    
// });

  return (
    <div>
      
        {/* <div className=' flex flex-col text-zinc-100'>
          <div><h1>{`Multi tracks to play along <All tracks sourced from jplayer.org>`}</h1></div>
              <div className='relative flex flex-row mt-4 gap-4 justify-center' >
                  
                                  <a className='bg-gradient-to-br from-slate-300 to-slate-60 p-2 rounded-lg li'>Horns</a>
                             <a className='bg-gradient-to-br from-slate-300 to-slate-60  p-2 rounded-lg li'>Clavi</a>
                         <a className='bg-gradient-to-br from-slate-300 to-slate-60  p-2 rounded-lg li'>Drums</a>
                              <a className='bg-gradient-to-br from-slate-300 to-slate-60  p-2 rounded-lg li'>Bass</a>
                   <a hrefclassName='bg-gradient-to-br from-slate-300 to-slate-60  p-2 rounded-lg li'>Lead guitar</a>
          </div>
        </div> */}
      
    </div>
  )
}

export default Multi
