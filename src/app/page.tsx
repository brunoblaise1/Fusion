"use client"

import Image from "next/image";
import { useEffect } from "react";





export default function Home() {
    window.addEventListener("keydown", init)

  function init() {
     let rX;
    let rY;
    let rC;
   
    //creating web audio api context
    const AudioContext = window.AudioContext || window.AudioContext;
    const audioCtx = new AudioContext();

    //creating oscillator and gain noe

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain()

    //connecting the oscillator to gain node to speakers
    oscillator.connect(gainNode)
    gainNode.connect(audioCtx.destination)

    //create inital thermin frequency and volume values

    const WIDTH = window.innerWidth;
    const HIEGHT = window.innerHeight;

    const maxFreq = 4000
    const maxVol = 0.03;
    const initialVol = 0.001;
    // set options for the oscillator

    oscillator.detune.value = 100 //value in cents
    oscillator.start(0)
    

     oscillator.onended = function () {
    console.log("Your tone has now stopped playing!");
  };

    gainNode.gain.value = initialVol
    //gainNode.gain.minValue = initialVol
    //gainNode.gain.maxValue = initialVol

    //mouse pointer positions

    let curX: number;
    let curY: number;
   let KeyFlag = false
    document.onmousemove = updatePage;

    function updatePage(e: { pageX: any; pageY: any; }) {
      KeyFlag = true

      curX = e.pageX;
      curY = e.pageY;
      
      oscillator.frequency.value = (curX / WIDTH) * maxFreq;

      gainNode.gain.value = (curY / HIEGHT) * maxVol;

     // canvasDraw()

    }

    function random(num1: number, num2: number) {
      return num1 + (Math.floor(Math.random()* (num2 - num1)) + 1)
    }

    const canvas = document.querySelector("canvas")
    const canvasCtx = canvas?.getContext("2d")
    if (canvas) {
    canvas.width = WIDTH
    canvas.height= HIEGHT
    }

    function canvasDraw() {
      KeyFlag = true
      rX = curX
      rY = curY

      rC = Math.floor((gainNode.gain.value / maxVol) * 30)
      if (canvasCtx) {
        canvasCtx.globalAlpha = 0.2
        for (let i = 1; i <= 15; i = i + 2) {
          canvasCtx.beginPath();
          canvasCtx.fillStyle =
            "rgb(" +
            100 +
            i * 10 +
            "," +
            Math.floor((gainNode.gain.value / maxVol) * 255) +
            "," +
            Math.floor((oscillator.frequency.value / maxFreq) * 255) +
            ")";
          canvasCtx.arc(
            rX + random(0, 50),
            rY + random(0, 50),
            rC / 2 + i,
            (Math.PI / 180) * 0,
            (Math.PI / 180) * 360,
            false
          );
          canvasCtx.fill();
          canvasCtx.closePath();
        }
      }
    }

  }
  useEffect(() => {
  init()
})


  return (
    <div className="flex bg-black text-zinc-100 overflow-hidden flex-col mx-auto h-screen w-full items-center text-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]">
         <div>
          <Image src='/guitar.svg' height={30} width={303} alt="guitar" className="absolute  translate-y-4 -translate-x-40 rotate-12     
         md:-translate-y-36 md:translate-x-2 md:ml-8 md:rotate-45 opacity-15
         " />
        </div>
        </div>
      <div className="absolute inset-0 bg-gradient-to-b from-purple-700/20 " />
      <div className="-translate-x-20 translate-y-16">
      <div className="">
          <div className="translate-x-4">
            <div className="h-3 w-3 bg-red-200 rounded-full"></div>
            <div className=" ml-2 h-3 w-3 bg-green-200 rounded-full"></div>
            <div className="ml-2 h-3 w-3 bg-yellow-200 rounded-2xl"></div>
           </div>
        </div>
    
        <div className="-translate-y-8 rotate-180">
          <div className="">
            <div className="h-3 w-3 bg-red-200 rounded-full"></div>
            <div className=" ml-2 h-3 w-3 bg-green-200 rounded-full"></div>
            <div className="ml-2 h-3 w-3 bg-yellow-200 rounded-2xl"></div>
           </div>
        </div>
    
      </div>
      <h5 className="text-medium pb-8 font-semibold">Introducing</h5>
      <h1 className="font-bold text-8xl pb-2">Fusions</h1>
      <p className="text-[.8rem] pb-8 font-semibold">A programming language for guitar using guitar sound</p>
      <div className="relative mt-4">
        <div className="absolute -inset-4 bg-gradient-to-b from-purple-600 to-purple-900 rounded-xl blur-xl opacity-60 " />
        <div className="relative px-7 py-8 bg-black/90 rounded-xl">
           <div >
          <div className="flex ">
            <div className="h-3 w-3 bg-red-500 rounded-full"></div>
            <div className="ml-2 h-3 w-3 bg-green-500 rounded-full"></div>
            <div className="ml-2 h-3 w-3 bg-yellow-500 rounded-2xl"></div>
           </div>
        </div>

           <div className="relative w-96 h-49 rounded-xl md:w-[800px] md:h-[200px] p-8  ">
       
        
        <div className="translate-y-30 -rotate-180 md:hidden">
           <Image src='/guitar.svg' height={30} width={63} alt="guitar" className="absolute -z-0 translate-y-1 -translate-x-40 rotate-12 " />
         <Image src='/guitar.svg' height={30} width={33} alt="guitar" className="absolute -z-0 translate-y-1 -translate-x-40 rotate-12 " />
        </div>
       

        <pre className="text-left p-1 text-zinc-100 ">
              <code className="text-zinc-400"> 
                {`// This will play E note on fret 2`}
              </code>
              
              <code>
                <code>
                  <code className="text-orange-300">
                         {
                    ` 
 play `
                    }
                    
                  </code>
                  <code className="text-purple-400">
                    {`E`}
                  </code>
                  <code className="text-yellow-200">
                    {` 2`}
                  </code>
                 
         </code>

                <code className="text-zinc-400">
                  {`
// Play a chord (major)`}
                </code>

                    <code>
                  <code className="text-orange-300">
                         {
                    ` 
 play `
                    }
                    
                  </code>
                  <code className="text-purple-400">
                    {`E#`}
                  </code>
                  <code className="text-yellow-200">
                    {` 3`}
                  </code>
                </code>
                <code>
                <code className="text-zinc-400">
                         {`
// Play a chord (minor)`}
                  </code>    
                  <code className="text-orange-300">
                         {
                    ` 
 play `
                    }
                    
                  </code>
                  <code className="text-purple-400">
                    {`Ab`}
                  </code>
                  <code className="text-yellow-200">
                    {` 4`}
                  </code>
                 
         </code>
       
              </code>
         
        </pre>
          </div>
        </div>
          </div>

    </div>
  );
}