import React from 'react';

class NonIBAN extends React.Component {

render() {   
    return (
        <div>
        <div><input label="Account Number" name="an" /></div>
        <div><input label="Sort Code" name="sc" /></div>
        <div><input label ="Bank Name" name="bank name"/></div>
        </div>
  );
}}

export default NonIBAN;
