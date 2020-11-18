const esprima = require('esprima')
const program = 'const answer = 42'

esprima.tokenize(program)
[ { type: 'Keyword', value: 'const' },
{ type: 'Identifier', value: 'answer' },
{ type: 'Punctuator', value: '=' },
{ type: 'Numeric', value: '42' } ]

const res = esprima.parse(program)
console.log('res: ', res);