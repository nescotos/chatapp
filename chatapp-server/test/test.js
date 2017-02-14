const should = require('should');
const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const winston = require('winston');
const config = require('../config');
//URL FOR TESTING
var url = "http://localhost:3000/";
//If you want this workin you must set with a valid Token
var testToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4YTFlOGE2MTIzYTQ5MTBiYzFmNjg3YyIsInVzZXJuYW1lIjoibmVzY290byIsImlhdCI6MTQ4NzEwNDg3MiwiZXhwIjoxNDg3MTkxMjcyfQ.UGY1chVADuiHyPlBQ-JjFQVU1uIJK3x0hSNYYCutFhU";
//TESTING
describe('Routing', () => {
	before((done) => {
		mongoose.connect(config.DATABASE.HOST + config.DATABASE.NAME);
    done();
	});
});
describe('Authtentication', () => {
  //LOGIN
  it('POST /api/login with username should return access token', (done) => {
    let credentials = {
      username: 'nescoto',
      password: '123456'
    };
    request(url)
    .post('api/login')
    .send(credentials)
    .end((err, res) => {
      if(err){
        throw err;
      }
      res.status.should.be.equal(200);
      res.body.status.should.be.true;
      res.body.token.should.not.be.empty;
      done();
    });
  });
  it('POST /api/login with email should return access token', (done) => {
    let credentials = {
      email: 'nestor_escoto@hotmail.com',
      password: '123456'
    };
    request(url)
    .post('api/login')
    .send(credentials)
    .end((err, res) => {
      if(err){
        throw err;
      }
      res.status.should.be.equal(200);
      res.body.status.should.be.true;
      res.body.token.should.not.be.empty;
      done();
    });
  });

  it('GET /api/user should return 403 because access with no token', (done) => {
    request(url)
    .get('api/user')
    .end((err, res) => {
      if(err){
        throw err;
      }
      res.status.should.be.equal(403);
      res.body.message.should.be.equal('No Token Provided');
      done();
    });
  });
  it('GET /api/user should return 403 because access with invalid token', (done) => {
    request(url)
    .get('api/user/?token=asdpofajsdkasj')
    .end((err, res) => {
      if(err){
        throw err;
      }
      res.status.should.be.equal(403);
      res.body.message.should.be.equal('Failed to authenticate token');
      done();
    });
  });

});
//USER TESTS
describe('User', () => {
  //GET User
  it('GET /api/user should be a succesful request', (done) => {
    request(url)
    .get('api/user?token=' + testToken)
    .end((err, res) => {
      if(err){
        throw err;
      }
      res.status.should.be.equal(200);
      res.body.status.should.be.equal(true);
      done();
    });
  });
  //POST User
  it('POST /api/user should create a new user', (done) => {
    let user = {
      username: 'nescoto',
      email: 'nestor_escoto@hotmail.com',
      password: '123456',
    };
    request(url)
    .post('api/user')
    .send(user)
    .end((err, res) => {
      if(err){
        throw err;
      }
      res.status.should.be.equal(200);
      res.body.message.should.be.equal('Username/email already taken');
      done();
    });
  });
  //GET User/:Id
  it('GET /api/user/id should return specific user', (done) => {
    request(url)
    .get('api/user/58a1e8a6123a4910bc1f687c?token=' + testToken)
    .end((err, res) => {
      if(err){
        throw err;
      }
      res.status.should.be.equal(200);
      res.body.user.username.should.be.equal('nescoto');
      res.body.user.email.should.be.equal('nestor_escoto@hotmail.com');
      done();
    });
  });
});

//ROOM TESTING
describe('Room', () => {
  // This test will work once
  // it('POST /api/room should create a new chat room', (done) => {
  //   let room = {
  //     name: 'MegaDevelopers',
  //     description: 'We are the New Mega Developers, all programming languages!'
  //   };
  //   request(url)
  //   .post('api/room?token=' + testToken)
  //   .send(room)
  //   .end((err, res) => {
  //     if(err){
  //       throw err;
  //     }
  //     res.status.should.be.equal(200);
  //     res.body.message.should.be.equal('Room succesfuly created');
  //     done();
  //   });
  // });
  it('POST /api/room should not create a new chat room', (done) => {
    let room = {
      name: 'MegaDevelopers',
      description: 'We are the New Mega Developers, all programming languages!'
    };
    request(url)
    .post('api/room?token=' + testToken)
    .send(room)
    .end((err, res) => {
      if(err){
        throw err;
      }
      res.status.should.be.equal(200);
      res.body.message.should.be.equal('Chatname already exists, try with another one!');
      done();
    });
  });

  it('GET /api/room should return an array', (done) => {
    request(url)
    .get('api/room?token=' + testToken)
    .end((err, res) => {
      if(err){
        throw err;
      }
      res.status.should.be.equal(200);
      res.body.rooms[1].description.should.be.equal('We are the New Mega Developers, all programming languages!');
      done();
    });
  });

	it('PUT /api/room/:id should update the specific room', (done) => {
		let updating = {
			name: 'MegaDevelopers lvl 5'
		};
		request(url)
		.put('api/room/58a3265193ba131b8456a346?token=' + testToken)
    .send(updating)
		.end((err, res) => {
			if(err){
				throw err;
			}
			res.status.should.be.equal(200);
			done();
		});
	});

  it('GET /api/room/:id should retrieve specific room', (done) => {
    request(url)
    .get('api/room/58a3265193ba131b8456a346?token=' + testToken)
    .end((err, res) => {
      if(err){
        throw err;
      }
      res.status.should.be.equal(200);
      res.body.name.should.be.equal('MegaDevelopers lvl 5');
      done();
    });
  });
  //This test works once
  // it('DELETE /api/room/:id should delete a room', (done) => {
  //   request(url)
  //   .delete('api/room/58a222135036e51be0c1f717?token=' + testToken)
  //   .end((err, res) => {
  //     if(err){
  //       throw err;
  //     }
  //     res.status.should.be.equal(200);
  //     res.body.message.should.be.equal('Room deleted succesfully');
  //     done();
  //   });
  // });
  it('POST /api/room/:id/join/ should join user to the specific chat room', (done) => {
    request(url)
    .post('api/room/58a325a693ba131b8456a344/join?token=' + testToken)
    .end((err, res) => {
      if(err){
        throw err;
      }
      res.status.should.be.equal(200);
      res.body.message.should.be.equal('You were added correctly');
      done();
    });
  });

  it('POST /api/room/:id/leave/ should leave user to the specific room', (done) => {
    request(url)
    .post('api/room/58a325a693ba131b8456a344/leave?token=' + testToken)
    .end((err, res) => {
      if(err){
        throw err;
      }
      res.status.should.be.equal(200);
      res.body.message.should.be.equal("Removed correctly");
      done();
    });
  });

  it('GET /api/rooms/:id should return all the users rooms', (done) => {
    request(url)
    .get('api/rooms/58a1e8a6123a4910bc1f687c?token=' + testToken)
    .end((err, res) => {
      if(err){
        throw err;
      }
      res.status.should.be.equal(200);
      res.body.rooms.length.should.be.equal(2);
      res.body.rooms[0].name.should.be.equal('MegaDevelopers lvl 5');
      done();
    });
  });
});
