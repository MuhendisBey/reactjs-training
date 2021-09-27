/*
* Burdaki isler counterAppClass.js icindekiler ile ayni ama lambda expression ile yapildi
*   lambda expression otomatik olarak calistigi context'deki this'e bind olur.
*/
class CounterAppClass {
    constructor() {
        this.counter = 0;
        this.spanCounter = null;
        // this.init = this.init.bind(this);
        // this.incrementAndUpdateView = this.incrementAndUpdateView.bind(this);
    }

    // lambda expression
    incrementAndUpdateView = () => { // for every second
        this.counter++;
        this.spanCounter.innerHTML = this.counter.toString();
    }

    // lambda expression
    init = () => {
        this.spanCounter = document.querySelector(".counter")
        window.setInterval(this.incrementAndUpdateView, 1000)
    }
}
let counterApp = new CounterAppClass()

window.onload = counterApp.init // On-load Event -> callback function (app)