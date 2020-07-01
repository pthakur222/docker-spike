import React from 'react';
import { TextField } from '@lbg/constellation';
import '@lbg/constellation/dist/lloyds.css';

class NonIBAN extends React.Component {

render() {   
    return (
        <div>
        <TextField label="Account Number" name="an" />
        <TextField label="Sort Code" name="sc" />
        <TextField label ="Bank Name" name="bank name"/>
        </div>
  );
}}

export default NonIBAN;
