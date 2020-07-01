import React from 'react';
import ReactDOM from 'react-dom';
import Routing from './Routes';
import {BrandProvider, LLOYDS} from '../node_modules/@lbg/constellation/esm/index';

ReactDOM.render(
  <BrandProvider brand={LLOYDS}>
  <Routing />
  </BrandProvider> ,
  document.getElementById('root')
);
