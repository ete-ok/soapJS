import axios from 'axios';
import { parseString } from 'xml2js';

const validationToken = '';

const soapEnvelope = `
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               xmlns:xsd="http://www.w3.org/2001/XMLSchema"
               xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetGameServers xmlns="https://mythologicinteractive.com/Games/SFD/">
      <validationToken>${validationToken}</validationToken>
    </GetGameServers>
  </soap:Body>
</soap:Envelope>
`;

axios.post('https://mythologicinteractive.com/SFDGameServices.asmx', soapEnvelope, {
  headers: {
    'Content-Type': 'text/xml;charset=utf-8',
    'SOAPAction': 'https://mythologicinteractive.com/Games/SFD/GetGameServers'
  }
})
.then(response => {
  parseString(response.data, { explicitArray: false }, (err, result) => {
    if (err) {
      console.error('Error al analizar XML:', err);
    } else {
      console.log(JSON.stringify(result, null, 2));
    }
  });
})
.catch(err => {
  console.error('Error en la solicitud SOAP:', err);
});
