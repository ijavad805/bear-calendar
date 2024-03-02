import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BearCalendar} from "@bear-calendar/core";

const Playground = () => {
  const containers = ['A', 'B', 'C'];

  return <BearCalendar />;
};

ReactDOM.render(<Playground />, document.getElementById('root'));
