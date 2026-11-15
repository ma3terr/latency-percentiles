import {readFileSync} from "node:fs";
import assert from "node:assert/strict";
import {run} from "./index.mjs";
const read = name => JSON.parse(readFileSync(new URL(name, import.meta.url), "utf8"));
assert.deepEqual(run(read("example.json")), read("expected.json"));
