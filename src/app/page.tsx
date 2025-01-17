"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";


export default function Home() {

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

      canvasDraw()

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
    <div className="flex  text-zinc-100  flex-col mx-auto h-screen w-full items-center text-center justify-center overflow-hidden">
      <canvas className="absolute inset-0"></canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] overflow-hidden">
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
      <p className="text-[.8rem] pb-4 font-semibold">A game for morse code and digital guitar pedal and A programming language inspired by guitar</p>
      <div className="relative pb-8">
        <div className="flex">
 <Link href="#" className="p-2  bg-gradient-to-b from-purple-600 to-purple-900  rounded-xl "
        >Morse code game(not yet)</Link>  
  <Link href="/guitar" className="p-2 ml-4 bg-gradient-to-b from-orange-300 to-orange-400  rounded-xl"
        >Digital Guitar</Link>    

 <Link href="https://www.npmjs.com/package/fusion-lang" className="p-2 ml-4 bg-gradient-to-b from-green-300 to-green-400  rounded-xl "
>Start coding</Link>   
        </div>        
      </div>
      <div className="relative mt-4">
        <div className="absolute -inset-4 bg-gradient-to-b from-purple-600 to-purple-900 rounded-xl blur-xl opacity-60 " />
        <div className="relative px-7 py-8 bg-black/90 rounded-xl">
           <div>
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
              <code>
                  <code className="text-zinc-400"> 
                  
                  {`// Do not use this syntax in digital 
//guitar it'sn't different, look readme
`}
                
              </code>
                <code className="text-zinc-400"> 
                  {`// normalvariable `}
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
                    {`n`}
                  </code>
                  <code className="text-yellow-200">
                    {` = 2`}
                  </code>
                 
         </code>

                <code className="text-zinc-400">
                  {`
// Boolean`}
                </code>

                    <code>
                  <code className="text-orange-300">
                         {
              ` 
 play `
                    }   
                  </code>
                  <code className="text-purple-400">
                      {`isTrue`}n
                  </code>
                  <code className="text-yellow-200">
                    {` = true`}
                  </code>
                </code>
                <code>
                <code className="text-zinc-400">
                         {`
// Print to the console`}
                  </code>    
                  <code className="text-orange-300">
                         {
                    ` 
 play `
                    }
                    
                  </code>
                  <code className="text-purple-400">
                    {`strum`}
                  </code>
                  <code className="text-yellow-200">
                    {`(n)`}
                  </code>        
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