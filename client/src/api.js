import axios from 'axios';

// contoh end-point : "http://localhost:3000/api/data/"
function loadData(endpoint){
   axios
        .get(endpoint)
        .then(response => {
           return response
        })
        .catch(err => console.log(err));
}


export {loadData};