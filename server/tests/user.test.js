import "dotenv/config";
import test from "node:test";
//recomendado utilizar strict
import { strict as assert } from "node:assert";
import request from "supertest";
import app from "../app.js";

export let token;

//REGISTER

test("POST /register user alredy exists, 400 status code", async () => {
  await request(app)
    .post("/register")
    .send({
      email: process.env.EMAIL_TEST,
      username: process.env.USERNAME_TEST,
      password: process.env.PASSWORD_TEST,
    }) //body
    .set("Content-Type", "application/json");

  const res = await request(app)
    .post("/register")
    .send({
      email: process.env.EMAIL_TEST,
      username: process.env.USERNAME_TEST,
      password: process.env.PASSWORD_TEST,
    })
    .set("Content-Type", "application/json");

  assert.strictEqual(res.statusCode, 400);
});

//LOGIN

test("POST /login user successfully logged in", async () => {
  const res = await request(app)
    .post("/login")
    .send({
      email: process.env.EMAIL_TEST,
      password: process.env.PASSWORD_TEST,
    })
    .set("Content-Type", "application/json");

  assert.strictEqual(res.statusCode, 201);
  assert(res.body[0].userId);
  const cookies = res.headers["set-cookie"];
  assert(cookies);
  token = cookies;
});

test("POST /login user not logged in, 400 status code", async () => {
  const res = await request(app)
    .post("/login")
    .send({
      email: process.env.INVALID_EMAIL_TEST,
      password: process.env.INVALID_PASSWORD_TEST,
    })
    .set("Content-Type", "application/json");

  assert.strictEqual(res.statusCode, 400);
});

test("POST /login incorrect password, 400 status code", async () => {
  const res = await request(app)
    .post("/login")
    .send({
      email: process.env.EMAIL_TEST,
      password: process.env.INVALID_PASSWORD_TEST,
    })
    .set("Content-Type", "application/json");

  assert.strictEqual(res.statusCode, 400);
});

test("POST /login validate token", async () => {
  const res = await request(app)
    .post("/login")
    .send({
      email: process.env.EMAIL_TEST,
      password: process.env.PASSWORD_TEST,
    })
    .set("Content-Type", "application/json");
  const cookies = res.headers["set-cookie"];
  assert(cookies);
  assert.strictEqual(res.statusCode, 201);
  token = cookies;
});

test("GET /profile logged user can access to profile, 201 status code", async () => {
  const res = await request(app).get("/profile").set("Cookie", token);
  assert.strictEqual(res.statusCode, 201);
});

test("POST /logout user succefully logged out ", async () => {
  const res = await request(app).post("/logout");
  assert.strictEqual(res.statusCode, 201);
});

test("GET /verify verify token", async () => {
  const res = await request(app).get("/verify").set("Cookie", token);

  assert.strictEqual(res.statusCode, 200);
});
