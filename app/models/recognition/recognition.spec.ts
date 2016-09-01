import {beforeEachProviders, it, describe, expect, inject} from '@angular/core/testing';
import {Recognition} from './recognition';

let data1 = {"fromUserId":1,"toUserId":2,"type":null,"comment":"Love what you did on the Dodge project!"};
let data2 = {"fromUserId":2,"toUserId":1,"type":"INNOVATION","comment":"Good idea to use Spring Boot"};

describe('Recognition', () => {

  it('should create a Recognition from a data object', () => {
    let recognition = new Recognition(data1);
    expect(recognition).toBeDefined();
  });

  it('should provide a method to get a recognitions fromUserId', () => {
    let recognition = new Recognition(data1);
    expect(recognition.getFromUserId()).toEqual(data1.fromUserId);
  });

  it('should provide a method to get a recognitions toUserId', () => {
    let recognition = new Recognition(data1);
    expect(recognition.getToUserId()).toEqual(data1.toUserId);
  });

  it('should provide a method to get a recognitions type', () => {
    let recognition = new Recognition(data1);
    expect(recognition.getType()).toEqual(data1.type);
  });

  it('should provide a method to get a recognitions comment', () => {
    let recognition = new Recognition(data1);
    expect(recognition.getComment()).toEqual(data1.comment);
  });

  it('should provide a method to convert the object to JSON', () => {
    let recognition = new Recognition(data1);
    expect(JSON.parse(recognition.toJson())).toEqual(data1);
  });
});

describe('Building recognition objects', () => {

  it('should provide a method to construct recognition objects from a json array', () => {
    let recognitions = Recognition.asRecognitions([data1, data2]);
    expect(recognitions[0].getComment()).toEqual(data1.comment);
    expect(recognitions[1] instanceof Recognition).toBe(true);
  });
});
