// /* tslint:disable:no-unused-variable */
//
// import { TestBed, async, inject } from '@angular/core/testing';
// import { UserService } from './user.service';
// import { BaseRequestOptions, HttpModule, Http, Response, ResponseOptions } from '@angular/http';
// import { MockBackend, MockConnection } from '@angular/http/testing';
// import { APIURL } from './config';
//
// describe('UserService', () => {
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpModule],
//       providers: [UserService, BaseRequestOptions, MockBackend, {
//         provide: Http,
//         useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
//           return new Http(backend, defaultOptions);
//         },
//         deps: [MockBackend, BaseRequestOptions]
//       }],
//     });
//   });
//
//   it('should ...', inject([UserService], (service: UserService) => {
//     expect(service).toBeTruthy();
//   }));
//
//   beforeEach(inject([MockBackend], (backend: MockBackend) => {
//     const baseResponse = new Response(new ResponseOptions({body: 'got response'}));
//     backend.connections.subscribe((c: MockConnection) => c.mockRespond(baseResponse));
//   }));
//
//   it('should return response when subscribed to getUsers', inject([UserService], (userService: UserService) => {
//     userService.doLogin('nescoto', '123456').subscribe((res: Response) => {
//       expect(res.text()).toBe('got response');
//     });
//   }));
//
//
// });
