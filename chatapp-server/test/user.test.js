const should = require('should');
const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const winston = require('winston');
const config = require('../config');
//URL FOR TESTING
var url = "http://localhost:3000/"
//TESTING
describe('Routing', () => {
	before((done) => {
		mongoose.connect(config.DATABASE.HOST + config.DATABASE.NAME);
    done();
	});
});
//USER TESTS
describe('User', () => {
  //GET User
  it('GET /api/user should be a succesful request', (done) => {
    request(url)
    .get('api/user')
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
    .get('api/user/58a1e8a6123a4910bc1f687c')
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
      console.log(res);
      res.status.should.be.equal(200);
      res.body.status.should.be.true;
      res.body.token.should.not.be.empty;
      done();
    })
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
    })
  });
});
