//Testing Route Integration

const request = require("supertest");

const server = "http://localhost:3000";

//Tests for server.js file

//TODO: test the get request to endpoint '/'
//1.  Responds with 200 status and text/html content type
describe("Route integration", () => {
  describe("/", () => {
    describe("GET", () => {
      it("responds with 200 status and text/html content type", () => {
        return request(server)
          .get("/")
          .expect("Content-Type", /text\/html/)
          .expect(200);
      });
    });

    describe("/accounts/", () => {
      describe("GET", () => {
        // describe("/:name", () => {
        //   it("responds with 200 status and json content type", () => {
        //     return request(server)
        //       .get("/accounts/MingDings")
        //       .expect("Content-Type", /application\/json/)
        //       .expect(200)
        //       .expect((res) => {});
        //   });
        // }); // = ''MingDings is  the greatestttttt
      });
      describe('POST', () => {
        describe('/signup', () => {
          it("")
        });
        describe('/login', () => {
          it('responds with 200 status and json content type', () => {
            return request(server)
              .post('/accounts/login')
              .send({ name: 'newAccount', email: 'new@gmail.com', password: 'test', type: 'personal'})
              .expect('Content-Type', /application\/json/)
              .expect(200)
              .expect((res) => {
                res.locals.message = {name: 'newAccount', email: 'new@gmail.com', password: 'test', type: 'personal'}
              })
          });
        });
      });
    });
  });
});

//Tests for items.js

//TODO: test the post request to endpoint '/items/:..'
//1.  Responds with 200 status and application/json content type
//2.  Responds with updated inventory list (from inventoryGet())
//3.  Test for invalid response? Returns status ?, and error message

//TODO: test the delete request to endpoint '/items/:...'
//1.  Responds with 200 status and application/json content type
//2.  Responds with updated inventory list (from inventoryGet())
//3.  Test for invalid response? Returns status ?, and error message

//TODO: test the patch request to endpoint '/items/:..'
//1.  Responds with 200 status and application/json content type
//2.  Responds with updated inventory list (from inventoryGet())
//3.  Test for invalid response? Returns status ?, and error message

//Test for accounts.js file

//TODO: test the post request to endpoint '/accounts/login/:..'
//1.  Responds with 200 status and application/json content type
//2.  The user email is sent in body of request
//3.  Database responds with _?_ if user is authenicated
