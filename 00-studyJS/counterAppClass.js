/*
* Burdaki isler counterApp.js icindekiler ile ayni ama modern class tanimi ile
* burada gordugun gibi birsuru metodun olsa tek tek ekleyeceksin
*/
class CounterAppClass {
    constructor() {
        this.counter = 0;
        this.spanCounter = null;
        this.init = this.init.bind(this);
        this.incrementAndUpdateView = this.incrementAndUpdateView.bind(this);
    }

    incrementAndUpdateView (){ // for every second
        this.counter++;
        this.spanCounter.innerHTML = this.counter.toString();
    }

    init() {
        this.spanCounter = document.querySelector(".counter")
        window.setInterval(this.incrementAndUpdateView, 1000)
    }
}
let counterApp = new CounterAppClass()

window.onload = counterApp.init // On-load Event -> callback function (app)