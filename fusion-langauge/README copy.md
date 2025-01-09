# Introduction

Fusion is a web app that revolves around music more importnalty guitar there many core vision of it like the morse code where you use your guitar to guess word in word and write them using guitar(this feature is still being implemented not yet in production).


Fusion is interestingly has a programming langauge tailored to how guitar notes work it can't do much of good stuff yet only basic stuff but I promise if you try it it will be amazing and am also developing a code editor for it to run on the web and not need to install it.


Fusion lastly has a digital guitar where it has another language but for playing sound so its amazing to test it out also if you are a guitar enthuasist play around stereo it only works with guitar and other feature also are being implement like reverb and many other.


# Getting started

Welcome to Fusion one of the first thing you will find is the landing page here take a look

![Fusion landing page](https://cloud-kh0fy9pbg-hack-club-bot.vercel.app/0arc_06_01_2025_8_07_58_am.png)

# Interesting Facts

If its your first time landing to Fusion home page here are quick facts about it:
- Let's a playing sound as you move your cursor 
- Also this wil happen simultaneously as you move the cursor and music is playing you'll be drawing on the page 

![Fusion drawings](https://cloud-pp0m2yix4-hack-club-bot.vercel.app/0arc_06_01_2025_8_08_40_am.png)

## Digital Guitar

It still very limited in its use right now but watch for a massive feature bump all are features I am still seeing how to implement them.


Here's a peek of it in its phase now: 

![Digital Guitar](https://cloud-cy3q2nax0-hack-club-bot.vercel.app/0arc_06_01_2025_8_09_01_am.png)

I know the ui is not that good right now but my main focus was to create something useful before good looking ui

## Digital Guitar (Language for playing sound)

Digital Guitar has many components one of them is  code editor which I built eenitrely from scratch which is amazing not gonna lie and its syntax hightlighting.


Now into the good stuff:

Don't confuse this with Fusion programming language, this is for playing notes. so it has entirely diffrent syntax but even if the look the some.

Avoid at all cost write syntax in comments it will result into error, so make sure you don't

```
// avoid any keyword in comments   
 play E2
// sound C5 in 6n 
 play C5
// sound A4 in 6n
 play A4
 play B2
 play F5
```

### Table Overview (Make sure every note is in Capital)

| Keys 	| Major 	| Minor 	|
|---	|---	|---	|
| A3 	| A#3 	| Ab3 	|
| B3 	| B#3 	| Bb3 	|
| C3 	| C#3 	| Cb3 	|
| D3 	| D#3 	| Cb3 	|

If you need to know all the supported notes visit: [Tone js](https://tonejs.github.io/)

# Fusion Programming langauge

Fusion programming Language is highly influence by how guitar keys are strumed and so on it has basic capalities like: 
- Printing something to console
- Declaring a variable
- Basic math 
- Function declaration
- object and many other good stuff


## How to install it

Let's say you need fusion on local system how do you install it. or use [npm package](https://www.npmjs.com/package/fusion-lang)

```bash

npm i -g fusion-lang

```

now running fusion program 

```bash
fusion-lang [nameofyourpoject.fu]
```
### For example: fusion-lang basic.fu 

or use fussion repl:

```bash
fusion-lang 
```

## How to use Fusion

```fu
// beginning of the program
//TODO: make arrays, add more native functions, ifandelse

play beg = "Hello World!" // not constant

strum(beg)

press gone = "Bye " // constant

strum(gone)

play n = 2 // variable
play isTrue = true // boolean

strum(n)

press obj = {  // object in fussion
    x: 3,
    y: "Hello",
    complex: {
        go: true
    },
    n
}

strum(obj.complex.go)

fret myname(str){ // function in fussion
    strum(str)
}
play length = string("Blaise") // native function for length
play time = now()
myname("Blaise") // calling the function

strum(time) // printing out to the console 
```

## Supported Syntax

### String
```
play name = "myname" // normal variable
press nme = "secom" // constant
// nme = name // will result into any errorr
name = nme
```
- Number
- Boolean

### Objects

```
press obj = {  // object in fussion
    x: 3,
    y: "Hello",
    complex: {
        go: true
    },
    name // yep this is the varaible we declared short hand is supported
}
// or using play

play person = {
    age: 40,
    name: "Willson",
    country: {
        city: "NYC",
        state: "California"
    }

}
```
### functions

```
fret myname(str){ // function in fussion
    strum(str)
    
}

fret add(x, y){ // function in fussion
    play re = x + y

    return re
}

press result = add(4, 5)

strum(result) // for printing
```
### native functions

### Length
```
play length = string("Blaise") //length 
```

###
```
play time = now()
```

## How to syntax highlight in Vscode fusion

![fusion image](https://cloud-fq7ogxaub-hack-club-bot.vercel.app/0arc_06_01_2025_11_55_47_am.png)

Yep we have syntax highlighting in visual studio code and also we have a file icon this so amazing.

![fusion image](https://cloud-jwuw2newe-hack-club-bot.vercel.app/0readme.md_-_fusion_-_visual_studio_code_10_01_2025_12_49_24_am.png)

![fusion image](https://cloud-jwuw2newe-hack-club-bot.vercel.app/1readme.md_-_fusion_-_visual_studio_code_10_01_2025_12_49_46_am.png)

## How to install

- If you what to test it out check this link:

[Fusion](https://marketplace.visualstudio.com/items?itemName=brunoblaise.fusion-langauge&ssr=false#review-details)

- Look close in this repo you can find a file with `.vsix` which is the extension for compiled(I may say) download it and open it using vscode and then right click on it and the click `install`. 

Here you go now everything coming together

![Fusion](https://cloud-bp971p9at-hack-club-bot.vercel.app/1____basic.fu_-_fusion_-_visual_studio_code_10_01_2025_12_37_04_am.png)


# Stack used

- Nextjs
- Tonejs
- Tailwindcss
- Typescript (building the actuall langauge)


# Issues known in Fusion:

You need to refresh the page when you are navigated to other pages to avoid the home page sound that use cursor for it pitch and loudness so do it to stop.

You can't write syntax in comments in Digital Guitar language as mentioned above.

Cursor in the digital programming keeps jumping around

# How to install Fusion on local device:

Use nodejs and clone the project here are the steps you need to folllow:

Make sure you have nodejs installed and bun on your local system, cd into it.

```bash
cd fusion
bun install

bun run dev
```

## Credits

To make the programming language which I am still working on I followed a tutorial by Tyler.

Check out his youtube channel [tyler](https://www.youtube.com/watch?v=8VB5TY1sIRo&list=PL_2VhOvlMk4UHGqYCLWc6GO8FaPl8fQTh)

I used some AI here and there mostly for debugginhg 

and also File icon I got inspiration from Emoji file icon


# TODO:

- Add array to fusion lang
- Add for, ifelse and many more
- Improve the syntax hightlighting
- Add more features to digital guitar
- solve all kown issues 
- Add morse code game using sound