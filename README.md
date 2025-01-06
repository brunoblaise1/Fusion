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


## How to install it

Let's say you need fusion on local system how do you install it.

```bash

npm i -g fusion

```

now running fusion program 

```bash
fusion [nameofyourpoject.f]
```

## How to use Fusion


## How to syntax highlight in Vscode fusion

Yep we have syntax highlighting in visual studio code and also we have a file icon this so amazing

## How to install

- If you what to test it out check this link:

[High seas](marketplace.visualstudio.com/manage/publishers/brunoblaise/extensions/high-seas-dark-theme/hub)

- Look close in this repo you can find a file with `.vsix` which is the extension for compiled(I may say) download it and open it using vscode and then right click on it and the click `install`. 




# Stack used

- Nextjs
- Tonejs
- Tailwindcss
- Typescript (building the actuall langauge)


# Issues known in Fusion:

You need to refresh the page when you are navigated to other pages to avoid the home page sound that use cursor for it pitch and loudness so do it to stop.

You can't write syntax in comments in Digital Guitar language as mentioned above.

# How to install Fusion on local device:

Use nodejs and clone the project here are the steps you need to folllow:

Make sure you have nodejs installed and bun on your local system, cd into it.

```bash
cd fusion
bun install

bun run dev
```




