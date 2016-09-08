import {beforeEachProviders, it, describe, expect, inject} from '@angular/core/testing';
import {RecognitionProvider} from './recognition-provider';
import {HTTP_PROVIDERS, XHRBackend, Response, ResponseOptions} from "@angular/http";
import {provide} from "@angular/core";
import {MockBackend, MockConnection} from "@angular/http/testing/mock_backend";
import {Recognition} from "../../models/recognition/recognition";

describe('Retrieve Recognitions', () => {
  beforeEachProviders(() => {
    return [
      HTTP_PROVIDERS,
      provide(XHRBackend, {useClass: MockBackend}),
      RecognitionProvider
    ];
  });

  let recognitionData = [
    {"fromUserId": 1, "toUserId": 2, "type": null, "comment": "Love what you did on the Dodge project!"},
    {"fromUserId": 2, "toUserId": 1, "type": "INNOVATION", "comment": "Good idea to use Spring Boot"}
  ];

  it('should return a list of recognitions', inject([XHRBackend, RecognitionProvider], (mockBackend, recProvider) => {
    // register mock response - when a connection comes in, we will respond by giving it an array of mock data
    mockBackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(
        new Response(
          new ResponseOptions({body: recognitionData})
        ));
    });

    recProvider.load().subscribe((recognitions: Recognition[]) => {
      expect(recognitions.length).toEqual(2);
      expect(recognitions[0].getToUserId()).toEqual(2);
    });

  }));

});

describe('Create a Recognition', () => {
  beforeEachProviders(() => {
    return [
      HTTP_PROVIDERS,
      provide(XHRBackend, {useClass: MockBackend}),
      RecognitionProvider
    ];
  });

  it('should create a new recognition object', inject([XHRBackend, RecognitionProvider], (mockBackend, recProvider) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(
        new Response(
          new ResponseOptions({body: {
            fromUserId: 7,
            toUserId: 8,
            comment: 'Test 123',
            type: 'INNOVATION'
          }})
        ));
    });

    let recognition = new Recognition({
      fromUserId: 7,
      toUserId: 8,
      comment: 'Test 123',
      type: 'INNOVATION'
    });

    recProvider.create(recognition).subscribe((r: Recognition) => {
      expect(r.getToUserId()).toEqual(8);
      expect(r.getType()).toEqual('INNOVATION');
    });

  }));
});

describe('Get the current users Recognitions', () => {
  beforeEachProviders(() => {
    return [
      HTTP_PROVIDERS,
      provide(XHRBackend, {useClass: MockBackend}),
      RecognitionProvider
    ];
  });

  let recognitionData = [
    {"fromUserId": 2, "toUserId": 1, "type": "INNOVATION", "comment": "Good idea to use Spring Boot"},
    {"fromUserId": 6, "toUserId": 1, "type": "CREATIVITY", "comment": null}
  ];

  it('should return a list of recognitions that belong to the current user',
    inject([XHRBackend, RecognitionProvider], (mockBackend, recProvider) => {
        // register mock response - when a connection comes in, we will respond by giving it an array of mock data
        mockBackend.connections.subscribe((connection: MockConnection) => {
          connection.mockRespond(
            new Response(
              new ResponseOptions({body: recognitionData})
            ));
        });

        recProvider.allForCurrentUser().subscribe((recognitions: Recognition[]) => {
          expect(recognitions.length).toEqual(2);
          expect(recognitions[0].getToUserId()).toEqual(1);
        });

      }
    ));
});
