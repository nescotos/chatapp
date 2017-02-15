const should = require('should');
const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const winston = require('winston');
const config = require('../config');
//URL FOR TESTING
var url = "http://localhost:3000/";
//If you want this workin you must set with a valid Token
var testToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4YTFlOGE2MTIzYTQ5MTBiYzFmNjg3YyIsInVzZXJuYW1lIjoibmVzY290byIsImlhdCI6MTQ4NzE5NjI3NywiZXhwIjoxNDg3MjgyNjc3fQ.Yj-aGENbqUBUHIeWIpVNfWsP8Qz_WY9Ivd44i1EznvM";
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

  it('GET /api/user/rooms/:id should return all the users rooms', (done) => {
    request(url)
    .get('api/user/rooms/58a1e8a6123a4910bc1f687c?token=' + testToken)
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

	it('POST /api/room/:id/upgrade/ should make the user admin of specific room', (done) => {
		let data = {
			id: '58a324da335c1306fc26f7e6'
		};
		request(url)
		.post('api/room/58a3265193ba131b8456a346/upgrade?token=' + testToken)
    .send(data)
		.end((err, res) => {
			if(err){
				throw err;
			}
			res.status.should.be.equal(200);
			res.body.message.should.be.equal('User is already admin');
			done();
		});
	});
	// it('POST /api/room/:id/downgrade/ should remove admin of specific room', (done) => {
	// 	let data = {
	// 		id: '58a324da335c1306fc26f7e6'
	// 	};
	// 	request(url)
	// 	.post('api/room/58a3265193ba131b8456a346/downgrade?token=' + testToken)
  //   .send(data)
	// 	.end((err, res) => {
	// 		if(err){
	// 			throw err;
	// 		}
	// 		res.status.should.be.equal(200);
	// 		res.body.message.should.be.equal('Admin removed');
	// 		done();
	// 	});
	// });

  // it('POST /api/room/:id/ban should ban the specified user and add it to blacklist', (done) => {
  //   let data = {
  //     id : '58a48ebe5ecf8b087c414fb2'
  //   };
  //   request(url)
  //   .post('api/room/58a3265193ba131b8456a346/ban?token=' + testToken)
  //   .send(data)
  //   .end((err, res) => {
  //     if(err){
  //       throw err;
  //     }
  //     res.status.should.be.equal(200);
  //     res.body.message.should.be.equal('User banned');
  //     done();
  //   });
  // });
  // it('POST /api/room/:id/unban should unban the specified user and add it to blacklist', (done) => {
  //   let data = {
  //     id : '58a48ebe5ecf8b087c414fb2'
  //   };
  //   request(url)
  //   .post('api/room/58a3265193ba131b8456a346/unban?token=' + testToken)
  //   .send(data)
  //   .end((err, res) => {
  //     if(err){
  //       throw err;
  //     }
  //     res.status.should.be.equal(200);
  //     res.body.message.should.be.equal('User unbanned');
  //     done();
  //   });
  // });
  it('GET /api/room/:id/users/all should return all the users from chat room', (done) => {
    request(url)
    .get('api/room/58a3265193ba131b8456a346/users/all?token=' + testToken)
    .end((err, res) => {
      if(err){
        throw err;
      }
      res.status.should.be.equal(200);
      res.body.users[0].username.should.be.equal('nescoto');
      done();
    });
  });
  it('GET /api/room/:id/users/admin should return all the admins from chat room', (done) => {
    request(url)
    .get('api/room/58a3265193ba131b8456a346/users/admin?token=' + testToken)
    .end((err, res) => {
      if(err){
        throw err;
      }
      res.status.should.be.equal(200);
      res.body.users[1].username.should.be.equal('lax');
      done();
    });
  });
  it('GET /api/search/rooms?query=query should return all rooms that fit query', (done) => {
    request(url)
    .get('api/search/rooms?query=lvl&token=' + testToken)
    .end((err, res) => {
      if(err){
        throw err;
      }
      res.status.should.be.equal(200);
      res.body.rooms[0].description.should.be.equal('We are the New Mega Developers, all programming languages!');
      done();
    });
  });
});

describe('Chat', () => {
  it('GET /api/chat/room/:id should return all the chats from specified room', (done) => {
    request(url)
    .get('api/chat/room/58a3265193ba131b8456a346?token=' + testToken)
    .end((err, res) => {
      if(err){
        throw err;
      }
      res.status.should.be.equal(200);
      done();
    });
  });
  // it('POST /api/chat/room/:id should insert new chat on specified room', (done) => {
  //   let data = {
  //     text: 'Hi there, this is my new Chat!'
  //   };
  //   request(url)
  //   .post('api/chat/room/58a3265193ba131b8456a346?token=' + testToken)
  //   .send(data)
  //   .end((err, res) => {
  //     if(err){
  //       throw err;
  //     }
  //     res.status.should.be.equal(200);
  //     res.body.message.should.be.equal('Chat succesfully added');
  //     done();
  //   });
  // });
  it('GET /api/chat/room/:id/search?query=query should search chats on specified room', (done) => {
    request(url)
    .get('api/chat/room/58a3265193ba131b8456a346/search?query=chat&token=' + testToken)
    .end((err, res) => {
      if(err){
        throw err;
      }
      res.status.should.be.equal(200);
      res.body.chats.length.should.be.equal(12);
      done();
    });
  });
});
