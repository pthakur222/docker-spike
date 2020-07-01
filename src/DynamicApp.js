import React from 'react';
import { Row, Page, Column, Dropdown,Header, Footer, Main, Option, FooterItem, Link, Card, Box, Text, Notification

} from '@lbg/constellation';
import '@lbg/constellation/dist/lloyds.css';
import recipientData from './data/recipientData.json';
import { TextField, Checkbox, RadioButton, ButtonPattern, Button } from '@lbg/constellation/esm';

import axios from 'axios';
let options;

class DynamicApp extends React.Component {

  state = {
    showForm : false,
    value: '',
    templateType: '',
    screenRules: '',
    selectValue:'',
    isChecked:false,
    isRadioChecked:false,
    params:[{}],
    error:false,
    otherField: false,
    confirm: false
  }

  onSelect = (e) => {
    this.setState({
      showForm: true,
      value: e.target.value
    })
    axios.get(`http://localhost:5000/getData/${e.target.value}`)
    .then(res => {
 
      this.setState({templateType: res.data[0],
                      screenRules: res.data[0].ScreenRules,
                    params : [{'key':"BeneficiaryName",'value':res.data[0].BeneficiaryName}]})
    })
 
    .catch(err=> {
       console.log(err);
    })
  }

  onClick = () => {
    this.props.history.push('/statement');
  }

  generateObject = (key,value)=>{
    this.setState({
      params: [...this.state.params,{key,value}]
    })
  }

  onContinue = ()  => {

    axios.post(`http://localhost:5000/transactions`,this.state.params)
    .then(res => {
      console.log(res);
      this.setState({confirm: true})
    })
    .catch(err=> {
       console.log(err);
    })
  }

  handleChange = (e) =>{
    this.setState({selectValue: e.target.value,
                    params:e.target.value})
  }

  hasError = (val) =>{
    this.setState({error: val})
  }

  render() {
    const countryName = recipientData.recipient.map((recipient,i) => {
      return <Option value={recipient.TemplateId}>{recipient.RecipientName},{recipient.RecipientCountry}</Option>
    })
    console.log(this.state.error,'render');
  return (
    <div>
      <Page>
      <Header />
      <Main>
        <Row>
          <Column grow="3">
            <Card>
            <Dropdown label="Select Recipient" name="recipeint select" onChange={this.onSelect} value={this.state.value}>
             {countryName} 
            </Dropdown>
          </Card>
          {this.state.showForm ?
          <span>
          <Card>
            <Box>
              <Text name="name">{this.state.templateType.BeneficiaryName}</Text>
              <div/>
              <Text>{this.state.templateType.BeneficiaryAccountNumber}</Text>
              <div/>
              <Text>{this.state.templateType.CountryCode}</Text>
              <div/>
              <Text>{this.state.templateType.BeneficiaryBankAddress}</Text>
              <div/>
              <Text>{this.state.templateType.BIC}</Text>
              <div/>
              <Text>{this.state.templateType.IBAN}</Text>
            </Box>
          </Card>
          <Card>
      
            { this.state.screenRules && this.state.screenRules.map((rule,i) => {
            
              if(rule.ControlID === 'txt'){
               return <TextField label={rule.FieldLabel} optional={!rule.isRequired} name={rule.FieldLabel}
                        onBlur={(e)=>{
                          
                          if(!e.target.value && rule.isRequired){
                            this.hasError(true)
                          }
                          else {
                            let validation = new RegExp(rule.Validation);
                            if(validation && validation.test(e.target.value)){
                              this.generateObject(rule.FieldLabel,e.target.value);
                              this.hasError(false);
                            this.setState({textValue: this.state.textValue})
                          }
                          else {this.hasError(true)}
                        }
                        }}
                        error={this.state.error}
                        value={this.state.textValue}/>
              }
              else if(rule.ControlID === 'dpd') {
                options = this.state.templateType && this.state.templateType.ControlValues.map((val,i) => {
                  return <Option>{val.ControlValue}</Option>
                })
               return <div><Dropdown label={rule.FieldLabel} name="select" value={this.state.selectValue}
               onChange={(e)=>{this.generateObject(rule.FieldLabel,e.target.value);
                              this.setState({selectValue: e.target.value})
                              if(e.target.value === "Other"){
                                this.setState({otherField: true})
                              }
                              else this.setState({otherField: false})}}>
                       {options}
                       </Dropdown>
                       {this.state.otherField ? <TextField label="" onBlur={(e)=>{
                          
                          if(!e.target.value){
                            this.hasError(true)
                          }
                          else{
                            this.generateObject("Reason",e.target.value)
                          }
                        }}
                        value={this.state.textValue}/>:null}
                       </div>
              }
              else if(rule.ControlID === 'chkbx') {
                return <Checkbox label={rule.FieldLabel} checked={this.state.isChecked}
                        onChange={(e)=>{this.generateObject(rule.FieldLabel,e.target.value);
                                          this.setState({isChecked:!this.state.isChecked})
                      }}/>
              }
              else if (rule.ControlID === 'radio') {
                return <RadioButton label={rule.FieldLabel} checked={this.state.isRadioChecked}
                        onChange={(e)=>{this.generateObject(rule.FieldLabel,e.target.value);
                                          this.setState({isRadioChecked:!this.state.isRadioChecked})
                       }}/>
              }
            })
            }
            
            {this.state.confirm?<Notification sentiment="positive">Successfully Added</Notification>:null}
          <ButtonPattern>
            
            <Button
              aria-live="polite"
              tabIndex='0'
              onClick={this.onContinue}
              data-continue="Continue"
            >
              Continue
            </Button>
          </ButtonPattern>
          </Card>
          </span>
            : null }
             <Button
              aria-live="polite"
              tabIndex='0'
              onClick={this.onClick}
              data-continue="Statements"
            >
              View Statements
            </Button>
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

export default DynamicApp;
