import React from 'react';

class ClearingCode extends React.Component {

render() {   
    return (
        <div>
        <input label="Bank Name" name="an" />
        <input label="IFSC Code" name="ifsc" />
        <input label="Bank Address Line 1" name="ba-1" />
        <input label ="Bank Address Line 2" name="ba-2"/>
        </div>
  );
}}

export default ClearingCode;
