//display a timer and show an animated border around the timer

class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        if (callbacks){ //process any callbacks that are passed in
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }

        this.startButton.addEventListener('click', this.start)
        this.pauseButton.addEventListener('click', this.pause)
    }
    start = () => { //use arrow function to fix value of 'this'
        if (this.onStart){ //check if we're given a onStart callback
            this.onStart(this.timeRemaining);
        }
        this.tick() 
        this.interval = setInterval(this.tick, 20); 
    }
    pause = () => {
        clearInterval(this.interval)
    }
    tick = () => {
        if (this.timeRemaining <= 0) { //end timer at 0
            this.pause();
            if(this.onComplete){
                this.onComplete();
            }
        } else { 
            this.timeRemaining = this.timeRemaining - .02
            if(this.onTick){
                this.onTick(this.timeRemaining);
            }
        }
    }
    get timeRemaining() { //get time remaining from duration input
        return parseFloat(this.durationInput.value);
    }
    set timeRemaining(time){ //set the value of our duration input
        this.durationInput.value = time.toFixed(2) //round down;
    }
}
