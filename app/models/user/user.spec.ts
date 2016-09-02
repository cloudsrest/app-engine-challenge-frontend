import {beforeEachProviders, it, describe, expect, inject} from '@angular/core/testing';
import {User} from './user';

let data1 = {"id": 1, "username": "nturner", "firstName": "Nathan", "lastName": "Turner", "team": 1, "admin": false};
let data2 = {"id": 2, "username": "fcarr", "firstName": "Frank", "lastName": "Carr", "team": 1, "admin": false};
let data3 = {"id": 3, "username": "smcgrath", "firstName": "Sam", "lastName": "McGrath", "team": 1, "admin": false};

describe('User', () => {

  it('should create a user from a data object', () => {
    let user = new User(data1);
    expect(user).toBeDefined();
  });

  it('should provide a method to get a users username', () => {
    let user = new User(data1);
    expect(user.getUsername()).toEqual(data1.username);
  });

  it('should provide a method to get a users first name', () => {
    let user = new User(data1);
    expect(user.getFirstName()).toEqual(data1.firstName);
  });

  it('should provide a method to get a users last name', () => {
    let user = new User(data1);
    expect(user.getLastName()).toEqual(data1.lastName);
  });

  it('should provide a method to get a users id', () => {
    let user = new User(data1);
    expect(user.getId()).toEqual(data1.id);
  });

  it('should provide a method to get a users team id', () => {
    let user = new User(data1);
    expect(user.getTeamId()).toEqual(data1.team);
  });

  it('should provide a method to check if a user is an admin', () => {
    let user = new User(data1);
    expect(user.isAdmin()).toEqual(data1.admin);
  });

  it('should provide a method to convert the object to JSON', () => {
    let user = new User(data1);
    expect(user.asJson()).toEqual(data1);
  });

  it('should provide a method to convert the object to a JSON string', () => {
    let user = new User(data1);
    expect(JSON.parse(user.toJson())).toEqual(data1);
  });
});

describe('Building user objects', () => {

  it('should provide a method to construct user objects from a json array', () => {
    let users = User.asUsers([data1, data2, data3]);
    expect(users[0].getFirstName()).toEqual(data1.firstName);
    expect(users[1] instanceof User).toBe(true);
  });
});
