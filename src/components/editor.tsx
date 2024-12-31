"use client"

import { useRef, useState } from "react"


function Editor() {
    const [code, setCode] = useState(`
// this will play E note on fret 2 
 play E 2
// play a chord (major) 
 play E# 3
// play a chord (minor) 
 play Ab 4`)
    
    const editorRef = useRef<any>(null) 
    const updateCode = () => {
        let editor = document.getElementById("editor")
        let text = editor ? editor.innerHTML : "";
        const keyword = /play/g
        let commetReg = /\/\/.*/g
      
        const keys = /[A-Z]./g
        const frets = /\d{1}/g
    
       

const newFret = text.replace(frets, '<code class="text-yellow-200">$&</code>');

const updatedText = newFret
            .replace(keyword, '<code class="text-orange-300">$&</code>')
            .replace(commetReg, '<code class="text-zinc-400">$&</code>')
            .replace(keys, '<code class="text-purple-400">$&</code>');


        if (editor) {
            editor.innerHTML = updatedText
        }
 
    }
  return (
      <div className="flex flex-col justify-center  overflow-hidden text-zinc-100">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-700/20 ">
              
          </div>
          <code ref={editorRef} onInput={(e) => {
              updateCode(); 
            }} id="editor" className="relative px-7 py-8 mt-2 max-w-3xl bg-black/90 rounded-xl outline-none" content={code} contentEditable={true} aria-multiline={true}>
              <pre>
                  <code>
                       {code}
                  </code>
              </pre>
             
          </code>
          
          <div>
              {"//the output"}
          </div>
    </div>
  )
}

export default Editor
