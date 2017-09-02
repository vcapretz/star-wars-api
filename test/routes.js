'use strict';

const Hapi = require('hapi');
const Code = require('code');
const Lab = require('lab');

const apiPlugin = require('../src');

const lab = Lab.script();
exports.lab = lab;

const { describe, it, before } = lab;
const { expect } = Code;

describe('Tests for API', () => {
    let server;

    before(done => {
        const plugins = [apiPlugin];
        server = new Hapi.Server();
        server.connection({ port: 8000 });
        server.register(plugins, err => {
            if (err) {
                return done(err);
            }

            server.initialize(done);
        });
    });

    it('should return http status 200 for index route', done => {
        server.inject('/', response => {
            expect(response.result.result).to.equal('Index route for the API, see "/pdv"');
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('should return http status 404 for an unkown route', done => {
        server.inject('/zxventures', response => {
            expect(response.statusCode).to.equal(404);
            done();
        });
    });
});
