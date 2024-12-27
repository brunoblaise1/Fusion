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

    const maxFreq = 7000
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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* <canvas className="canvas">


      </canvas> */}
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}