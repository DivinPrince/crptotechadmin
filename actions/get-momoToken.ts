import axios from "axios";

const momoHost = "sandbox.momodeveloper.mtn.com";
const momoTokenUrl = `https://${momoHost}/collection/token`;
const momoRequestToPayUrl = `https://${momoHost}/collection/
/v1_0/requesttopay`;

const getMomoToken = async ()=>{
   const token = await axios({
     method: "post",
     url: momoTokenUrl,
     headers: {
       "Content-Type": "application/json",
       "Ocp-Apim-Subscription-key": "cd3f65786cc14b19866be08c3be23135",
     },
   });

   return token.data.access_token
}

export default getMomoToken