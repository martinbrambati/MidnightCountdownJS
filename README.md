MidnightCountdownJS
===================

This is a simple JavaScript timer, that counts down to a specific date/time. Super simple, the point of this was to give an easy snippet of code for someone who is less experienced in JavaScript, and use this for a timer on their site. Documentation within the file. Anyone should be able to figure this little widget out, and modify it if necessary. Fork away people!



Below, is exactly how I create the Timer object, and then implement the timer.




// create the date to countdown to <br />
var cutoff_date = new Date(2014, 11, 31, 23, 59, 59, 99); // New years 2014 

//instantiate Timer object <br />
var timer = new Timer(cutoff_date, 0, "all", "test");

//print initial timer into element <br />
timer.update();

//set timer to update content of element every second <br />
setInterval(function(){  <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    timer.update();  <br />
}, 1000);  <br />
