import { Page, Document } from '@react-pdf/renderer';
import Header from './Header';

import Body from './Body';



const MyDocument = (props) => {
  return (
    <Document>
      <Page style={{ padding: "50px 50px" }}>

        <Header
          logoUrl={props.logoUrl}
          companyName={props.companyName}
          companyRut={props.companyRut}
          companyAddress={props.companyAddress}
          companyEmail={props.companyEmail}
          fecha={props.fecha}

          title="Cotización"
          cotizationNumber={`${new Date().getFullYear()}-${props.numeroCotizacion}`}
          dolar={props.dolar}
          
          clientName={props.clientName}
          clientRut={props.clientRut}
          clientAddress={props.clientAddress}
          clientEmail={props.clientEmail}
          clientPhone={props.clientPhone}
        />

        <Body 
        filas={props.filas}
        moneda={props.moneda} />

      </Page>
    </Document>
  );
};

export default MyDocument;

