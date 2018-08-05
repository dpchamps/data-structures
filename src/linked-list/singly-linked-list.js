"use strict";

import {ListNode} from './list-node';
import {IndexOutOfRangeException, InvalidTypeException} from '../error-types';
import isEqual from 'lodash/isEqual';

export class SinglyLinkedList {
    head = null;
    tail = null;

    _length = 0;

    get length() {return this._length}

    constructor(data) {
        this.append(data);
    }

    /**
     * Append data to the end of the list
     *
     * @param data the data to store in the node
     * @returns {ListNode} - The appended node
     */
    append(data) {
        const node = new ListNode(data);

        if (this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }

        this._length += 1;

        return node;
    }

    /**
     * Prepend a node to the beginning of the list
     *
     * @param data - the data to store in the node
     * @returns {ListNode} - The prepended node
     */
    prepend(data) {
        const node = new ListNode(data);

        node.next = this.head;
        this.head = node;

        this._length += 1;

        return node;
    }

    /**
     * Insert a node after a given node
     *
     * @param node - The given node
     * @param data - The data to insert into the new node
     *
     * @returns {ListNode} - The inserted node
     */
    insertAfter(node, data) {
        if(!(node instanceof ListNode)){
            throw new InvalidTypeException(ListNode.name, node.constructor.name);
        }
        const newNode = new ListNode(data);

        newNode.next = node.next;
        node.next = newNode;
        
        if(isEqual(this.tail, node)){
            this.tail = newNode;
        }

        this._length += 1;

        return newNode;
    }

    /**
     * Insert a node at an index
     *
     * @param data - The data to insert
     * @param idx - The index to insert the node at
     * @returns {ListNode} - The inserted node
     */
    insertAt(data, idx) {
        if (idx > this.length || idx < 0 || typeof idx === 'undefined') {
            throw new IndexOutOfRangeException();
        }

        let currentNode = this.head;

        for (let i = 0; i < idx; i += 1) {
            currentNode = currentNode.next;
        }

        return this.insertAfter(currentNode, data);
    }

    /**
     * Find the first node that matches the supplied data
     *
     * @param data - the data to search for
     * @returns {ListNode|null}
     */
    find(data) {
        let currentNode = this.head;

        if (isEqual(currentNode.data, data))
            return currentNode;


        while (currentNode.next !== null) {
            if (isEqual(currentNode.data, data))
                return currentNode;
            currentNode = currentNode.next;
        }

        return currentNode;
    }

    /**
     * Find a node at given index
     *
     * @param idx - Given index
     * @returns {ListNode}
     */
    findAt(idx) {
        if (idx > this._length || idx < 0) {
            throw new IndexOutOfRangeException();
        }
        let currentNode = this.head;
        for (let i = 0; i < idx; i += 1) {
            currentNode = currentNode.next;
        }

        return currentNode;
    }
    
    findParent(node){
        if(!(node instanceof ListNode)){
            throw new InvalidTypeException(ListNode.name, node.constructor.name);
        }
        
        let parent = this.head;
        while(parent !== null && !isEqual(parent.next, node)){
            parent = parent.next;
        }
        
        return parent || -1;
    }

    /**
     * Remove given node from the list
     *
     * @param node - The node to remove.
     * @returns {boolean}
     */
    remove(node) {
        if(!(node instanceof ListNode)){
            throw new InvalidTypeException(ListNode.name, node.constructor.name);
        }
        let parent = this.head;
        
        while (!isEqual(this.head, node) && parent !== null && !isEqual(parent.next, node)) {
            parent = parent.next;
        }

        if (parent === null)
            return false;

        this._length -= 1;

        if(isEqual(this.head, node)){
            this.head = this.head.next;
        }else{
            parent.next = node.next;
        }
        
        if(isEqual(node, this.tail)){
            this.tail = parent;
        }
        
        return true;
    }

    /**
     * Remove node at given index
     *
     * @param idx - the given index
     * @returns {ListNode} - The removed node
     */
    removeAt(idx) {
        if (idx > this._length || idx < 0) {
            throw new IndexOutOfRangeException();
        }

        let parentNode = this.head;
        let currentNode = this.head;

        for (let i = 0; i < idx; i += 1) {
            parentNode = currentNode;
            currentNode = currentNode.next;
        }
        
        if(isEqual(this.head, currentNode)) {
            this.head = this.head.next;
        }else{
            parentNode.next = currentNode.next;
        }
        
        if(isEqual(this.tail, currentNode)){
            this.tail = parentNode;
        }

        this._length -= 1;

        return currentNode;
    }

    /**
     * Remove all nodes from linked list
     */
    empty() {
        this.head = null;
        this.tail = null;
        this._length = 0;
    }

    /**
     * Return a clone of the current linked list
     *
     * @returns {SinglyLinkedList}
     */
    clone() {
        const clonedList = new SinglyLinkedList(this.head.data);

        let currentNode = this.head.next;
        while (currentNode !== null) {
            clonedList.append(currentNode.data);
            currentNode = currentNode.next;
        }

        return clonedList;
    }
}