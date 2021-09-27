/*
* Jsc features:
*   Functional programing language
*   Event-driven
*   Object base programming : {x: 0, y:"asd"}
*   Object oriented programming : class
*
* This code is running
*   on JavaScript Engine (Virtual Machine) google V8 Engine
*   as single execution thread from event queue
*
* For long running jobs,
*   your callback functions must be async.
*
*/
let counter = 0;
let spanCounter = 0;
function incrementAndUpdateView()
{
    counter++;
    spanCounter.innerHTML = counter.toString();
}

 /* Butun sayfa yuklendikten sonra app calissin app icinde islem yapayim diyorum yoksa dom gelmeden
        span counter null oluyor
*/
function app()
{
    spanCounter = document.querySelector(".counter");
    // Timeout evnet --> after 1 sec
    // register callbak func: incrementAndUpdateView
    window.setInterval(incrementAndUpdateView, 1000);
}
// $("document").ready(app) // Bu jQuery versiyonu
// again register callback function
window.onload = app; // When onload Event is triggered. app function will be called
