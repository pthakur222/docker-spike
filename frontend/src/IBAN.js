import React from 'react';

class IBAN extends React.Component {

render() {   
    return (
        <div>
        <input label="BIC code" name="bic code" />
        <input label="IBAN" name="iban" />
        </div>
  );
}}

export default IBAN;
