// import React from 'react';
// import axios from 'axios';
// import { Row, Page, Column, Header, Footer, Main, FooterItem, Text,Link, Accordion, Button} from '@lbg/constellation';
// import '@lbg/constellation/dist/lloyds.css';

// class Statements extends React.Component {

//   state = {
//     open: false,
//     transactions:''
//   }

//   onChange = (e) => {
//     this.setState({
//       open: !this.state.open
//     }) 
//   }

//   componentWillMount =()=>{
//     axios.get(`http://localhost:5000/transactions`)
//     .then(res => {
//       this.setState({transactions: res.data})
//     })
//     .catch(err=> {
//        console.log(err);
//     })
//   }

//   render() {
 
//     const statements = this.state.transactions && this.state.transactions.map((trans,i) => {
//       return <span><Accordion   
//                     open={this.state.open}
//                     onChange={(i)=>this.onChange}
//                     label={trans.BeneficiaryName}
//             >
//                 {(() => {
//                     let val =[];
//                     for(let i = 0;i<Object.keys(trans).length;i++){
//                         val.push(
//                         <div>
//                             <Text variation="normal-emphasized">{Object.keys(trans)[i]}:</Text><Text>{Object.values(trans)[i]}</Text>
//                         </div>
//                     )}
//                      return val;
//                 })()}
//             </Accordion>
//             <br/>
//             </span>
  
//     })

//   return (
//     <div className="App">
//       <Page>
//       <Header />
//       <Main>
//         <Row>
//           <Column grow="3">
//               {statements}
//               <Button
//                 aria-live="polite"
//                 tabIndex='0'
//                 onClick={()=> {
//                     this.props.history.push('/dynamic')
//                 }}
//                 data-continue="Continue"              
//               >
//               Back         
//               </Button>
           
//           </Column>
//         </Row> 
//       </Main>
//       <Footer>
//         <FooterItem>
//           <Link href="https://lloydsbank.com" onColor>
//           Security
//           </Link>
//         </FooterItem>
//         <FooterItem>
//           <Link href="https://lloydsbank.com" onColor>
//           www.lloydsbankinggroup.com
//           </Link>
//         </FooterItem>
//       </Footer>
//     </Page>
//     </div>
//   );
// }}

// export default Statements;
