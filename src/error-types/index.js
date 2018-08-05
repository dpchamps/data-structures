"use strict";

export class IndexOutOfRangeException extends Error{
    constructor(){
        super('Index out of range');
    }
}

export class InvalidTypeException extends Error{
    constructor(expected, actual){
        super(`Expected ${expected}, but got ${actual}`);
    }
}