import lexer from './lexer'
import parser from './parser'
import arities from './util/arities'

/**
 * Parses a given math expression and returns a function that computes the result.
 * @param {String} expression Math expression to parse.
 * @param {Object} constants A map of constants that will be compiled into the resulting function.
 * @param {Object} options Options to Evaluatex.
 * @returns {fn} A function that takes an optional map of variables. When invoked, this function computes the math expression and returns the result. The function has fields `ast` and `expression`, which respectively hold the AST and original math expression.
 */
export default function evaluatex (expression, constants = {}, options = {}) {
  // Evaluatex it great, but its LaTex interpreter has some issues that are more easily solved by
  // over-formatting the input string than modifying the parser itself, which works relatively well
  // for what it was made to do.

  // Each element contains the LaTex syntax for a command at index 0 and the ASCII equivalent.
  const replacements = [
    ['arctan', 'atan'],
    ['arccos', 'acos'],
    ['arcsin', 'asin'],
    ['ln', 'log'],
    ['\\pi', `(${Math.PI})`]
  ]

  // Replace some LaTex syntax to cooperate with evaluatex's native parser
  replacements.forEach(r => {
    expression = expression.replaceAll(r[0], r[1])
  })

  // Support Euler's constant by default
  constants.e = Math.E

  // Create RegExp matches for all supported LaTex commands
  const fnregex = Object.keys(arities).map(func => {
    let str
    if (arities[func] === 2) { str = `\\\\${func}\\{((.)*)\\}{2}` } else {
      str = `\\\\${func}((\\{((.)*)\\})| [^{}]+){1}`
    }
    return RegExp(str, 'gi')
  })

  if (options.latex) {
    // wrap all functions in { } to force implicit multiplication
    fnregex.forEach(r => {
      expression = expression.replace(r, (match) => `{${match}}`)
    });

    // wrap variables in { } to force implicit multiplication
    ['x', 'y'].forEach(variable => {
      expression = expression.replaceAll(variable, `{${variable}}`)
    })
  }
  // console.log('formatted', expression);

  const tokens = lexer(expression, constants, options)
  const ast = parser(tokens).simplify()
  const fn = function (variables = {}) {
    return ast.evaluate(variables)
  }
  fn.ast = ast
  fn.expression = expression
  fn.tokens = tokens
  return fn
}
