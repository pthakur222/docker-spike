import React from 'react';
export default class NewBeneficiaryDetailsFields extends React.Component {
  render = () => {
    return (
      <div>
        <input label="Recipient Name" name="Rec name"/>
       
        <input label="Recipient Address" name="Bene Address"/>
      </div>
    );
  }
}