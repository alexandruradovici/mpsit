"use strict";

var express = require ("express");
var morgan = require ("morgan");

// debug library, use with the DEBUG veriable
// DEBUG=... node main.js
var debuglibrary = require ("debug");

var debugs = debuglibrary ("server:setup");
var debugr = debuglibrary ("server:request");

// measure statistics
var measured = require ("measured");

// create a collection
var system = measured.createCollection ("System Metrics");

// create a gauge
var freemem = system.gauge ("freemem", function ()
{
    return process.memoryUsage().heapUsed;
});

// create a meter for requests per second
// use with meter_name.mark ()
var rps = system.meter ("request_per_second");


// create a timer meter
// use with var timer = timer_name.start ();
// time.end ();
var requesttime = system.timer ("request");

// var loadavg = system.gauge ("loadavg", function ()
// {
//   return process.loadavg()[0]; 
// });

setInterval(function ()
{
   debugs (system.toJSON());
   debugs (JSON.stringify(system.toJSON()['System Metrics'].request));
}, 1000);

debugs ('Express start');
var app = express ();

function getMilliseconds ()
{
    var hrtime = process.hrtime ();
    return hrtime[0]*1000 + hrtime[1] / 1000000;
}

// event loop cycle speed
function getEventCycle ()
{
    var starttime = getMilliseconds();
    process.nextTick(function ()
    {
        var stoptime = getMilliseconds();
        debugr ('Event cycle time is '+(stoptime-starttime)+' milliseconds');
    });
}

app.use (morgan ('dev'));

app.use (function (req, res, next)
{
    var starttime = getMilliseconds(); 
    var requeststopwatch = requesttime.start();
    rps.mark ();
    var writeHeadFunction = res.writeHead;
    // var timeout = true;
    // verify if there is a timeout
    var timeoutSchedule = setTimeout (function ()
    {
        // if (timeout) 
        console.log ('request timed out after 5000 ms');
        res.redirect ('/we_are_at_luch');
    }, 900);
    res.writeHead = function ()
    {
        requeststopwatch.end ();
        debugr (getMilliseconds() - starttime);
        writeHeadFunction.apply (this, arguments);
        clearTimeout (timeoutSchedule);
        // timeout = false;
    };
    next ();
});

app.get ('/', function (req, res, next)
{
    setTimeout (function ()
    {
        res.send ('you got / for your answer'); 
        // console.log (getMilliseconds() - req.starttime);
    }, 5000);
});

// console.log (getMilliseconds());

app.listen (process.env.PORT);

// catch all exceptions and print
process.on ('uncaughtException', function (ex)
{
    console.log ('exception here');
    console.log (ex); 
});

// function showText (p1, p2, p3, p4, p5)
// {
//     // console.log (showText.param);
//     console.log ('this value: '+this);
//     console.log ('arguments value: '+arguments.length);
//     console.log (p1);
//     console.log (p2);
//     console.log (p3);
//     console.log (p4);
//     console.log (p5);
// }

// showText("fsdafasd");

// showText.apply ({}, ["fdsfds",4324, 42332, "fdsafads"]);

// var showTheText = showText.bind ("object", "param1");


// function debug (level, message)
// {
//     console.log (JSON.stringify(this)+':'+level+':'+message);
// }

// var obj = {
//     val1:'val1',
//     val2:'val2'
// };


// var log = debug.bind (obj, "log");
// var err = debug.bind (obj, "err");


// debug ();
// log ("fdsfds dafsa");


// showTheText ("param");
// showText.call ("bla bla bla bla bla");