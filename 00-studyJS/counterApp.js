/*
* Burdaki isler counter.js icindekiler ile ayni ama object oriented olsun diye class olarak yapildi
*/
let CounterApp = function(){ // defines a class
    var self = this;
    self.counter = 0;
    self.spanCounter = null;
    self.incrementAndUpdateView = function(){ // for every second
        self.counter++;
        self.spanCounter.innerHTML = self.counter.toString();
    }

    self.init = function (){
        self.spanCounter = document.querySelector(".counter")
        window.setInterval(self.incrementAndUpdateView, 1000)
    }
}
let counterApp = new CounterApp()

window.onload = counterApp.init // On-load Event -> callback function (app)