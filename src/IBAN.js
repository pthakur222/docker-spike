import React from 'react';
import { TextField } from '@lbg/constellation';
import '@lbg/constellation/dist/lloyds.css';

class IBAN extends React.Component {

render() {   
    return (
        <div>
        <TextField label="BIC code" name="bic code" />
        <TextField label="IBAN" name="iban" />
        </div>
  );
}}

export default IBAN;
