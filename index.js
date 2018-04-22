#!/usr/bin/env node
'use strict';
const argv = require('minimist')(process.argv.slice(2));

let envKeys = Object.keys(process.env);

if (argv.prefix) {
  const prefixes = (argv.prefix = Array.isArray(argv.prefix)
    ? argv.prefix
    : [argv.prefix]);
  envKeys = envKeys.filter(key => {
    return prefixes.some(prefix => key.startsWith(prefix));
  });
}

if (argv.suffix) {
  const suffixes = (argv.suffix = Array.isArray(argv.suffix)
    ? argv.suffix
    : [argv.suffix]);
  envKeys = envKeys.filter(key => {
    return suffixes.some(suffix => key.endsWith(suffix));
  });
}

if (!envKeys.length) {
  process.exit(1);
}

envKeys.forEach(key => {
  const value = process.env[key];
  process.stdout.write(`${key}=${JSON.stringify(value)}\n`);
});
