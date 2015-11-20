"use strict";

// Load express
var express = require ("express");

// Load a logger
var morgan = require ("morgan");

// Load parser for body (URL or JSON)
var body_parser = require ("body-parser");

var app = express ();

app.use (morgan ("dev"));
app.use (body_parser ());

app.get ('/', function (req, res, next)
{
    // res.send ("hey, what's up here?");
    console.log ('express was here');
    next ();
});

app.get ('/:p1/:p2', function (req, res, next)
{
    res.send (req.params);
    res.send ("hey, you selected next. "+req.authorized);
});

app.post ('/', function (req, res)
{
    res.send (req.body);
});

app.use (function (req, res)
{
    res.send ("No page here, check the url");
});

// app.post ()
// app.put ()
// app.delete () 

app.listen (process.env.PORT);
