import assert from 'node:assert/strict';
import { spring } from './spring.ts';

assert.equal(spring(0), 0);
assert.equal(spring(-1), 0);
assert.ok(Math.abs(spring(5) - 1) < 1e-6, 'settles at 1');
const peak = Math.max(...Array.from({ length: 200 }, (_, i) => spring(i / 200)));
assert.ok(peak > 1 && peak < 1.2, `overshoots a hair, got ${peak}`);
console.log('spring ok');
