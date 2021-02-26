[![Netlify Status](https://api.netlify.com/api/v1/badges/96cb4dcc-43ba-4a48-a866-b39ec0e34dfe/deploy-status)](https://app.netlify.com/sites/eulercalc/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-blueviolet.svg)](https://opensource.org/licenses/MIT)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# EulerCalc
EulerCalc is a visualization of Euler's Method for solving differential equations when an initial value is given. This project was inspired by a manipulative made by [Sam Watson](https://github.com/sswatson) with his website, [Prismia](https://prismia.chat).

The master branch of this repository is deployed at https://eulercalc.netlify.app/.

## Built With
EulerCalc is built using [create-react-app](https://github.com/facebook/create-react-app/) and [TypeScript](https://www.typescriptlang.org). 
### Notable libraries and frameworks:
* [react-bootstrap](https://react-bootstrap.github.io) and [bootstrap](https://getbootstrap.com)
* [Visly](https://visly.app) for component design
* [Fork](https://github.com/ecuber/jsxgraph-react-js) of [MathQuill](https://mathquill.com) for LaTeX editing and rendering
* [Fork](https://github.com/ecuber/evaluatex) of [evaluatex](https://arthanzel.github.io/evaluatex/) to evaluate math expressions
* [JSXGraph](https://jsxgraph.uni-bayreuth.de) for graphing visuals

## Bugs
This project is still under development, and bugs (features) are definitely present. If you encounter unexpected behavior, please open an issue in the [issue tracker](https://github.com/ecuber/euler/issues).

## Contributing
Contributions are welcome and encouraged! If you haven't installed Yarn already, please refer to their [documentation](https://yarnpkg.com) for installation instructions.

Then, from the root project directory, run the following command to install dependencies:
```
$ yarn install
```

To start a development server: 
```
$ yarn start
```
To create a production build:
```
$ yarn build
```

## License
Distributed under the MIT License.