import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';


const Playground = () => {
  const containers = ['A', 'B', 'C'];

  return <>Hello World</>;
};

ReactDOM.render(<Playground />, document.getElementById('root'));
