const esprima = require('esprima')
const estraverse = require('estraverse')
const escodegen = require('escodegen')

const program = "var AST = 'I am good boy'"

// 词法分析，转为 token stream
const token = esprima.tokenize(program)
console.log('token: ', token)

// 语法分析, 将 token stream 转为抽象语法树 ast
let ast = esprima.parse(program)
console.log('ast: ', ast)

// 深度遍历抽象树，将 var 改为 cont
estraverse.traverse(ast, {
  enter(node) {
    console.log('enter', node.type)
    if (node.type == 'VariableDeclaration') {
      node.kind = 'let'
    }
  },
  leave(node) {
    console.log('leave', node.type)
    if (node.type == 'Indentifier') {
      node.name += 'leave'
    }
  }
})

// 将 ast 转义
const generator = escodegen.generate(ast)
console.log('generator: ', generator)

//这个 demo 主要为了学习 ast 相关的知识。
// 这里简单粗暴的把 var 改为了 let，有些边界条件没有考虑到，因为 var 转 let 涉及到作用域，后续可通过学习 babel 相关的深入了解。
