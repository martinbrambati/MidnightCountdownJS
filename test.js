
// so this date is September 30, 2013 at 11:59 PM, therefore this shouldnt be changed, unless your changing the countdown date
var cutoff_date = new Date(2013, 12, 31, 23, 59, 59, 99); // New years 2013 

    function getMyTimer(cutoff_date, offset, logic)
    {
        /*
        |--------------------------------------------------------------------------
        | Documentation - Countdown Train
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
        |       offset      - (OPTIONAL) This is a variable describing the timezone offset from UTC/GMT. The reason for this variable
        |                     is to calculate the same countdown for everyone, perhaps relative to a remote server, location, etc. To 
        |                     find out more about timezone offsets, google "Timezone offsets" & I'm sure you'll find what you're
        |                     looking for. For the record, yes this variable can be positive OR negative, and can also be of a decimal
        |                     point, but needs to be in increments of .5 (4, 4.5, -5, -5.5 etc.)
        |       logic       - (OPTIONAL) String value. Possible values:
        |                     'all' - will display timer including days, hours, minutes, and seconds
        |                     'dh'  - will display timer including only days and hours
        |                     'h'   - will display only hours - should only be used if days < 0
        |                     'ms'   - will display only minutes & seconds - should only be used if hours < 0
        | Example Use:
        |
        |   getMyTimer(DateObject, 0, "all");
        |
        | Another good use, which actually makes the timer work, is to set an interval for the function to run every second
        |
        |   setInterval(function()
        |       {
        |           getMyTimer(cutoff_date);
        |       }, 1000);
        |
        |
        |
        |   86400000 - milliseconds in 1 day;
        |   3600000 - milliseconds in 1 hour;
        |
        */
        
        var offset = (typeof offset === "undefined") ? "0" : offset;
        var logic = (typeof logic === "undefined") ? "all" : logic; // stores default to offset if not passed in function call
        var container = document.getElementById('time'); // change this to the id of the span on your timer page
        var time = '';
        var cutoff = cutoff_date.getTime() / 1000;
        var relative = new Date();
        var current = new Date( relative.getTime() + (relative.getTimezoneOffset() * 60000) + (3600000*offset)).getTime() / 1000;
        var diff = Math.floor(cutoff - current);
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
        

        if(diff == 0 || diff < 0){
            container.innerHTML = "Countdown complete.";
            return;
        }

        /*

        This is a cool part of the plugin, if you modify these if statements, you can change which logic is displayed dynamically
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

        for (var key in logic_all)
        {
        var result = Math.floor(diff / logic_all[key]);
        diff -= Math.floor(result * logic_all[key]);

        if(result == 0)
        {
            continue;
        }
        else if(result == 1){
            console.log(time += result + ' ' + key.substring(0, key.length - 1) + ' ' );
        } else{
            time += result + ' ' + key + ' ';
        }
        
        }

        container.innerHTML = time;
    }


    /*
        |--------------------------------------------------------------------------
        | Implementation
        |--------------------------------------------------------------------------
        |
        | For the sake of simplicity, just run an interval that calls the function every second.
        | Hell, why does it need to be more complicated than that?
        |
        */

    getMyTimer(cutoff_date);
    setInterval(function()
    {
    getMyTimer(cutoff_date);
    }, 1000);


    