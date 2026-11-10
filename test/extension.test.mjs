import assert from "node:assert/strict";
import { test } from "node:test";
import extension from "../.test-dist/index.js";

test("overrides only OAuth and preserves Pi's built-in request path", () => {
  let registration;
  let command;
  extension({
    registerProvider(name, config) { registration = { name, config }; },
    registerCommand(name, definition) { command = { name, definition }; },
  });

  assert.equal(command.name, "usage");
  assert.match(command.definition.description, /usage limits/);

  assert.equal(registration.name, "anthropic");
  assert.equal(registration.config.oauth.name, "Claude Pro/Max");
  assert.equal(typeof registration.config.oauth.login, "function");
  assert.equal(typeof registration.config.oauth.refreshToken, "function");
  assert.equal(registration.config.oauth.getApiKey({ access: "token" }), "token");
  assert.equal("models" in registration.config, false);
  assert.equal("streamSimple" in registration.config, false);
  assert.equal("stream" in registration.config, false);
  assert.equal("api" in registration.config, false);
  assert.equal("baseUrl" in registration.config, false);
});
