
const axios = require('axios');

export default function getRecipientData(id) {
    axios.get(`http://localhost:5000/getData/${id}`)
    .then(res => {
        return res.data;
    })
    .catch(err=> {
        return err;
    })    
}