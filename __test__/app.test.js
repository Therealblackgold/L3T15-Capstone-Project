const request = require("supertest");
const app = require("../app");

describe("Users API", () => {
  it("GET /users --> array users", () => {
    return request(app)
      .get("/users")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              _id: expect.any(String),
              username: expect.any(String),
              active: expect.any(Boolean),
              roles: expect.any(Array),
            }),
          ])
        );
      });
  });

  it("Get /users/id --> specific 404 if not found", () => {
    return request(app).get("/users/6").expect(404);
  });

  it("POST /users --> specific create user", () => {
    return request(app)
      .post("/users")
      .send({
        username: "Kieth",
        password: "password",
      })
      .expect(201);
  });

  it("POST /users --> specific user already exists", () => {
    return request(app)
      .post("/users")
      .send({
        username: "username",
        password: "password",
      })
      .expect(409);
  });
});
