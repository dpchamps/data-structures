"use strict";

import cloneDeep from 'lodash/cloneDeep';

export class ListNode{
    next = null;
    data = null;
    
    constructor(data){
        this.data = data;
    }

    /**
     * Return a new copy of the existing node
     * @returns {ListNode}
     */
    clone(){
        const clone = new ListNode(this.data);
        clone.next = this.next;
        
        return clone;
    }
}