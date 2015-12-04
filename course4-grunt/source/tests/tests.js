
"use strict";

var assert = require ('assert');
require ('should');

var main = require ('../main.js');

describe ("Test name", function ()
{
    describe ("Inner tests", function ()
    {
        before (function (done)
        {
            console.log ('Starting tests');
            done ();
        });
        
        after (function (done)
        {
            console.log ('Tests are done');
            done ();
        }); 
        
        it ('Should run this test', function ()
       {
            var s = main.lala (1,2,3,4);
            s.should.be.eql (10);
            // assert (s==10, "Sum is fishy");
       });
    });
    
    
   
   
   it ('Should run this asynchronous test', function (done)
   {
       setTimeout (function ()
       {
        var s = main.lala (1,2,3,4);
        s.should.be.eql (10);
        done ();
       }, 1000);
        
   });
});