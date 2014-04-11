
    /*
        |--------------------------------------------------------------------------
        | Documentation - MidnightCountdown 
        |--------------------------------------------------------------------------
        |
        | Author: Eric Diviney
        |
        | This is a simple countdown originally for the designtra.in E-mail signup. 
        | 
        | Expected parameters---------------------
        |       cutoff_date - this is the cutoff date for the timer, basically the time the event is being counted down
        |                     down to. Needs to be of JavaScript Date object, and the more specific you get with that
        |                     object, the more accurate the countdown will be.
        |
        |       offset      - (OPTIONAL) This is a variable describing the timezone offset from UTC/GMT. The reason for this variable
        |                     is to calculate the same countdown for everyone, perhaps relative to a remote server, location, etc. To 
        |                     find out more about timezone offsets, google "Timezone offsets" & I'm sure you'll find what you're
        |                     looking for. For the record, yes this variable can be positive OR negative, and can also be of a decimal
        |                     point, but needs to be in increments of .5 (4, 4.5, -5, -5.5 etc.)
        |
        |       logic       - (OPTIONAL) String value. Possible values:
        |                     'all' - will display timer including days, hours, minutes, and seconds
        |                     'dh'  - will display timer including only days and hours
        |                     'h'   - will display only hours - should only be used if days < 0
        |                     'ms'   - will display only minutes & seconds - should only be used if hours < 0
        |
        |       id           - string, id of element to hold timer
        |
        | Example Use:
        |
        |
        |
        |
        |   86400000 - milliseconds in 1 day;
        |   3600000 - milliseconds in 1 hour;
        |
        */


function Timer(cutoff_date, offset, logic, id)
{
    var offset = (typeof offset === "undefined") ? "0" : offset;
    var logic = (typeof logic === "undefined") ? "all" : logic; // stores default to offset if not passed in function call
    var container = document.getElementById(id); // change this to the id of the span on your timer page
    
    var cutoff = cutoff_date.getTime() / 1000;
    
    var logic_all = {
        days: 24 * 60 * 60,
        hours: 60 * 60,
        minutes: 60,
        seconds: 1,
    };
    var logic_dh = {
        days: 24 * 60 * 60,
        hours: 60 * 60,
    };
    var logic_hm = {
        hours: 60 * 60,
        minutes: 60,
    };
    var logic_ms = {
        minutes: 60,
        seconds: 1,
    };

    var logic_reference;

    switch(logic)
    {
        case "all":
            logic_reference = logic_all;
            break;
        case "dh":
            logic_reference = logic_dh;
            break;
        case "hm":
            logic_reference = logic_hm;
            break;
        case "ms":
            logic_reference = logic_ms;
            break;
    }

    this.update = function()
    {
        /*

        This is a cool option of the plugin, if you modify these if statements, you can change which logic is displayed dynamically
        in your project. The integers being tested in the conditions are the amount of milliseconds the current time is away
        from the cutoff date. Just uncomment this out, and it will give you all if more than a day, only hours if less than a day,
        and only minutes and seconds if less than an hour!

        var logic_reference = null;

        if(diff > 86400)
        {
            logic_reference = logic_dh;
        } 
        if( diff < 86400 && diff > 3600)
        {
            logic_reference = logic_hm;
        } 
        if(diff < 3600)
        {
            logic_reference = logic_ms;
        }

        for (var key in logic_reference)
        {
        var result = Math.floor(diff / logic_reference[key]);
        diff -= Math.floor(result * logic_reference[key]);
        time += result + ' ' + key + ' ';
        }

        */
        var time = '';
        var relative = new Date();
        var current = new Date( relative.getTime() + (relative.getTimezoneOffset() * 60000) + (3600000*offset)).getTime() / 1000;
        var diff = Math.floor(cutoff - current);

        for (var key in logic_all)
        {
        var result = Math.floor(diff / logic_all[key]);
        diff -= Math.floor(result * logic_all[key]);

        if(result == 0)
        {
            continue;
        }
        else if(result == 1){
            time += result + ' ' + key.substring(0, key.length - 1) + ' ';
        } else{
            time += result + ' ' + key + ' ';
        }
        
        }

        console.log(time);
        container.innerHTML = "";
        container.innerHTML = time;
    }
}


// so this date is December 31, 2014 at 11:59 PM, therefore this shouldnt be changed, unless your changing the countdown date
var cutoff_date = new Date(2014, 11, 31, 23, 59, 59, 99); // New years 2014 

var timer = new Timer(cutoff_date, 0, "all", "test");

timer.update();

setInterval(function(){
    timer.update();
}, 1000);



    