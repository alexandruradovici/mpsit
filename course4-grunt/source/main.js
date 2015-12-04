
"use strict";

require ('./module.js');

/**
 * Lala function
 * @param p1 First parameter
 * @param p2 Second parameter
 * @param p3 Third parameter
 * @param p4 Forth parameter
 * 
 * @returns p1+p2+p3+p4
 */

function lala (p1, p2, p3, p4)
{
    return p1+p2+p3+p4;
}

module.exports.lala = lala;