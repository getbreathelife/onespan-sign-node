const repl = require('repl')
const OneSpanSign = require('./dist').OneSpanSign

repl.start('> ').context.OneSpanSign = OneSpanSign;
