import {beforeEachProviders, it, describe, expect, inject} from '@angular/core/testing';
import {UserProvider} from './user-provider';
import {HTTP_PROVIDERS, XHRBackend, Response, ResponseOptions} from "@angular/http";
import {provide} from "@angular/core";
import {MockBackend, MockConnection} from "@angular/http/testing/mock_backend";
import {User} from "../../models/user/user";

describe('Retrieve Users', () => {
  beforeEachProviders(() => {
    return [
      HTTP_PROVIDERS,
      provide(XHRBackend, {useClass: MockBackend}),
      UserProvider
    ];
  });

  let userData = [
    {"id": 1, "username": "nturner", "firstName": "Nathan", "lastName": "Turner", "team": 1, "admin": false},
    {"id": 2, "username": "fcarr", "firstName": "Frank", "lastName": "Carr", "team": 1, "admin": false},
    {"id": 3, "username": "smcgrath", "firstName": "Sam", "lastName": "McGrath", "team": 1, "admin": false}
  ];

  it('should return a list of users', inject([XHRBackend, UserProvider], (mockBackend, userProvider) => {
    // register mock response - when a connection comes in, we will respond by giving it an array of mock data
    mockBackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(
        new Response(
          new ResponseOptions({body: userData})
        ));
    });

    userProvider.all().subscribe((users: User[]) => {
      expect(users.length).toEqual(3);
      expect(users[0].getId()).toEqual(1);
    });

  }));

});
