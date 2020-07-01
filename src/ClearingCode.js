import React from 'react';
import { TextField } from '@lbg/constellation';
import '@lbg/constellation/dist/lloyds.css';

class ClearingCode extends React.Component {

render() {   
    return (
        <div>
        <TextField label="Bank Name" name="an" />
        <TextField label="IFSC Code" name="ifsc" />
        <TextField label="Bank Address Line 1" name="ba-1" />
        <TextField label ="Bank Address Line 2" name="ba-2"/>
        </div>
  );
}}

export default ClearingCode;
