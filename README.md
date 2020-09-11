# Pomodoro Timer

Pomodoro Timer is a web application that supports work using [Pomodoro technique](https://en.wikipedia.org/wiki/Pomodoro_Technique).

## Installation

Download the source code.
To download all the dependencies execute:

```
npm install
```

To start web app:
```
npm start
```

## Usage

Using the timer is very simple - just press start and the timer will start to count down. You will be informed that the time has run out with a sound and a push notification (you must first allow notifications in your browser).

Besides the basic functionality, you can also use the built-in to-do list. Here you can add tasks, mark them as done, edit them and delete old ones.

**You can install the application as a PWA app on any system that supports it (e.g. Android from Chrome browser, Windows from Chrome, Edge)**

## Personalization

With options, you can customize things like:

- the duration of each phase, which you enter in seconds, so you can set exactly the time you want (as you type, the program automatically converts this time into minutes, so you can see the result immediately),
- force long break - if you check this option, then after 4 iterations of work, instead of turning on a short pause, a long pause will start,
- sound - defines whether audio should run in the application,
- autoplay - defines whether the countdown for the next phase should start automatically

After saving, all options are saved in the browser's memory so that you do not have to enter them every time.

If you've experimented with the options and don't remember what the default values were - just click "reset" and they will all return to their original state.

## Demo

This project uses [Buddy](https://buddy.works/) for CD pipeline to deploy master branch on Google's cloud storage and is available here:\
https://pomodoro-timer.guba.waw.pl/

## Contributors

Thanks for hepling with project and pair programming

<a href="https://github.com/tope96/pomodoro-timer/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=tope96/pomodoro-timer" />
</a>
