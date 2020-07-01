import React from 'react';
import {TextField} from '@lbg/constellation';

export default class NewBeneficiaryDetailsFields extends React.Component {
  render = () => {
    return (
      <div>
        <TextField label="Recipient Name" name="Rec name"/>
       
        <TextField label="Recipient Address" name="Bene Address"/>
      </div>
    );
  }
}