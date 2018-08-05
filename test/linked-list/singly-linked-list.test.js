"use strict";

import {SinglyLinkedList} from '../../src/linked-list/singly-linked-list';
import {ListNode} from '../../src/linked-list/list-node';

describe("Singly Linked List", () => {
    describe('List length specifications', () => {
        let linkedList;
        beforeEach(() => {
            linkedList = new SinglyLinkedList(1)
        });
        describe('insertion', () => {
            test('It should initialize to a length of 1', () => {
                expect(linkedList.length).toBe(1);
            });

            test('It should increment length as items are appended', () => {
                linkedList.append(1);
                expect(linkedList.length).toBe(2);
                linkedList.append(1);
                expect(linkedList.length).toBe(3);
            });

            test('It should increment length as items are prepended', () => {
                linkedList.prepend(1);
                expect(linkedList.length).toBe(2);
                linkedList.prepend(1);
                expect(linkedList.length).toBe(3);
            });

            test('It should increment length as items are insertedAfter', () => {
                const node = linkedList.head;

                linkedList.insertAfter(node, 1);
                expect(linkedList.length).toBe(2);
                linkedList.insertAfter(node, 1);
                expect(linkedList.length).toBe(3);
            });

            test('It should increment length as items are insertedAt', () => {
                linkedList.insertAt(0, 0);
                expect(linkedList.length).toBe(2);
                linkedList.insertAt(0, 0);
                expect(linkedList.length).toBe(3);
            });
        });

        describe('removal', () => {
            beforeEach(()=> {
                for (let i = 0; i < 9; i += 1) {
                    linkedList.append(1);
                }
            });

            it('Should decrement length as nodes are removed', () => {
                linkedList.remove(linkedList.head);
                expect(linkedList.length).toBe(9);
                linkedList.remove(linkedList.head);
                expect(linkedList.length).toBe(8);
            });

            it('Should decrement length as removeAt is called', () => {
                linkedList.removeAt(5);
                expect(linkedList.length).toBe(9);
                linkedList.removeAt(5);
                expect(linkedList.length).toBe(8);
            });

            it('Should be zero when empty is called', () => {
                linkedList.empty();
                expect(linkedList.length).toBe(0);
            })
        });
    });

    describe('List order integrity', () => {
        let linkedList;

        beforeEach((done) => {
            linkedList = new SinglyLinkedList(0);
            for (let i = 0; i < 10; i += 1) {
                linkedList.append(i + 1);
            }
            done()
        });

        describe('insertion', () => {

            describe('append', () => {
                it('Should update head only when null', () => {
                    expect(linkedList.head.data).toBe(0);
                })
                it('Should update tail', () => {
                    expect(linkedList.tail.data).toBe(10);
                });

                it('Should maintain sequential order of insertion as append is called', () => {
                    let node = linkedList.head;
                    for (let i = 0; i < linkedList.length; i += 1) {
                        expect(node.data).toBe(i);
                        node = node.next;
                    }
                });
            });

            describe('prepend', () => {
                it('Should update head', () => {
                    linkedList.prepend(11);
                    expect(linkedList.head.data).toBe(11);
                });

                it('Should not update tail', () => {
                    linkedList.prepend(11);
                    expect(linkedList.tail.data).toBe(10);
                });

                it('Should maintain the old lists order', () => {
                    linkedList.prepend(-1);
                    let node = linkedList.head;
                    for (let i = 0; i < linkedList.length; i += 1) {
                        expect(node.data).toBe(i - 1);
                        node = node.next;
                    }
                });
            });

            describe('insertAfter', () => {
                it('Should insert a node immediately after node specified', () => {
                    linkedList.insertAfter(linkedList.head, 11);
                    expect(linkedList.head.next.data).toBe(11);
                });

                it('Should not update head', () => {
                    linkedList.insertAfter(linkedList.head, 11);
                    expect(linkedList.head.data).toBe(0)
                });

                it('Should update tail is inserted after last node in list', () => {
                    linkedList.insertAfter(linkedList.tail, -100);
                    expect(linkedList.tail.data).toEqual(-100);
                });

                it('Should not alter any other nodes', () => {
                    linkedList.insertAfter(linkedList.head.next, 99);
                    let node = linkedList.head;
                    expect(node.data).toBe(0);
                    node = node.next;
                    expect(node.data).toBe(1);
                    node = node.next;
                    expect(node.data).toBe(99);
                    node = node.next;
                    expect(node.data).toBe(2);
                });
            });
        });

        describe('Removal', () => {

            describe('Remove', () => {
                it('Should return true upon successfull removal', () => {
                    expect(linkedList.remove(linkedList.head)).toBe(true);
                });

                it('Should return false upone unsuccessfull removal', () => {
                    const node = new ListNode(1);
                    expect(linkedList.remove(node)).toBe(false);
                });

                it('Should update head if head is removed', () => {
                    linkedList.remove(linkedList.head);
                    expect(linkedList.head.data).toBe(1);
                });

                it('Should update tail if tail is removed', () => {
                    const tail = linkedList.tail;
                    linkedList.remove(tail);
                    expect(linkedList.tail.data).toBe(9);
                });

                it('Should maintain sequential order for the list at large', () => {
                    linkedList.remove(linkedList.head.next.next);
                    let node = linkedList.head;
                    expect(node.data).toBe(0);
                    node = node.next;
                    expect(node.data).toBe(1);
                    node = node.next;
                    expect(node.data).toBe(3);
                    node = node.next;
                    expect(node.data).toBe(4);
                    node = node.next;
                    expect(node.data).toBe(5);
                });

                it('Should throw an invalid type error if a argument passed is not a ListNode', () => {
                    expect(() => {
                        linkedList.remove(1212)
                    }).toThrow();
                });
            });
            
            // describe('removeAt', () => {
            //    
            // });
        });
    });
});