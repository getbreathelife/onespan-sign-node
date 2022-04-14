const repl = require('repl');
const OneSpanSign = require('./dist');

repl.start('> ').context.OneSpanSign = OneSpanSign;
