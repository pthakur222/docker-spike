import React from 'react';
import countryData from './data/data.json';
import NewBeneficiaryDetailsFields from './NewBeneDetails';
import IBANFields from './IBAN';
import NonIBANFields from './NonIBAN';
import ClearingCodeFields from './ClearingCode';


const fieldTemplateMap = {
  'IBAN_TYPE': IBANFields,
  'NON_IBAN_TYPE': NonIBANFields,
  'CLEARING_CODE_TYPE': ClearingCodeFields
};
class App extends React.Component {

  state = {
    showForm : false,
    value: '',
    templateType: ''
  }

  onSelect = (e) => {
    this.setState({
      showForm: true,
      value: e.target.value
    })
      let template = countryData.countries.filter((country,i) => {
      if(country.name === e.target.value){
        return true
      }
      else{
        return false
      }
     
    })
     this.setState({templateType: template[0].templateType})
  }

  render() {
    const countryName = countryData.countries.map((country,i) => {
      return <option>{country.name}</option>
    })

    const FieldTemplate = fieldTemplateMap[this.state.templateType];

    // return FieldTemplate ? <FieldTemplate {...this.props} /> : null;

  return (
    <div className="App">
     
            <div>
            <select label="Select Country" name="select" onChange={this.onSelect} value={this.state.value}>
             {countryName} 
            </select>
          </div>
          {this.state.showForm ?
          <div>
            <NewBeneficiaryDetailsFields/>
            {FieldTemplate ? <FieldTemplate {...this.props} /> : null}
          </div>
            : null }
      
    </div>
  );
}}

export default App;
