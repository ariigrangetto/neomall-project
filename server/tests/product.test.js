import "dotenv/config";
import test from "node:test";
import { strict as assert } from "node:assert";
import request from "supertest";
import app from "../app.js";

test("GET /products, get all products", async () => {
  const res = await request(app).get("/products");

  assert(Array.isArray(res.body));
  assert.strictEqual(res.statusCode, 200);
});

test("GET /products?category=beauty filtered products", async () => {
  const res = await request(app).get("/products?category=beauty");

  assert.strictEqual(res.statusCode, 200);
  assert(Array.isArray(res.body));
  assert(res.body.length > 0);

  res.body.forEach((product) => {
    assert.strictEqual(product.category, "beauty");
  });
});

test("GET /product/:id, get product by id", async () => {
  const res = await request(app).get("/products/3");

  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.body.id, 3);
});
