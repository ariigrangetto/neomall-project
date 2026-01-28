import "dotenv/config";
import test from "node:test";
import request from "supertest";
import { strict as assert } from "node:assert";
import app from "../app.js";
import { token } from "./user.test.js";

test("GET /cart get all products in cart", async () => {
  const res = await request(app).get("/cart").set("Cookie", token);
  assert.strictEqual(res.statusCode, 200);
  assert(Array.isArray(res.body));
  assert(res.body.length >= 0);
});

test("POST /cart add product in cart", async () => {
  const res = await request(app)
    .post("/cart")
    .send({
      id: 4,
    })
    .set("Content-Type", "application/json")
    .set("Cookie", token);
  assert.strictEqual(res.statusCode, 200);
});

test("PATCH /cart/increment increment quantity", async () => {
  const res = await request(app)
    .patch("/cart/increment")
    .send({
      id: 4,
    })
    .set("Content-Type", "application/json")
    .set("Cookie", token);

  assert.strictEqual(res.statusCode, 200);
});

test("PATCH /cart/decrement decrement quantity", async () => {
  const res = await request(app)
    .patch("/cart/decrement")
    .send({
      id: 4,
    })
    .set("Content-Type", "application/json")
    .set("Cookie", token);

  assert.strictEqual(res.statusCode, 200);
});

test("DELETE /cart delete product from cart", async () => {
  const res = await request(app)
    .delete("/cart")
    .send({
      id: 4,
    })
    .set({
      "Content-Type": "application/json",
    })
    .set("Cookie", token);

  assert.strictEqual(res.statusCode, 200);
  assert(!res.body.find((product) => product.id === 4));
});
