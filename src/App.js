import React from 'react';
import { Row, Page, Column, Dropdown,Header, Footer, Main, Option, FooterItem, Link, Card} from '@lbg/constellation';
import '@lbg/constellation/dist/lloyds.css';
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
      return <Option>{country.name}</Option>
    })

    const FieldTemplate = fieldTemplateMap[this.state.templateType];

    // return FieldTemplate ? <FieldTemplate {...this.props} /> : null;

  return (
    <div className="App">
      <Page>
      <Header />
      <Main>
        <Row>
          <Column grow="3">
            <Card>
            <Dropdown label="Select Country" name="select" onChange={this.onSelect} value={this.state.value}>
             {countryName} 
            </Dropdown>
          </Card>
          {this.state.showForm ?
          <Card>
            <NewBeneficiaryDetailsFields/>
            {FieldTemplate ? <FieldTemplate {...this.props} /> : null}
          </Card>
            : null }
          </Column>
        </Row> 
      </Main>
      <Footer>
        <FooterItem>
          <Link href="https://lloydsbank.com" onColor>
          Security
          </Link>
        </FooterItem>
        <FooterItem>
          <Link href="https://lloydsbank.com" onColor>
          www.lloydsbankinggroup.com
          </Link>
        </FooterItem>
      </Footer>
    </Page>
    </div>
  );
}}

export default App;
