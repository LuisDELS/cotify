
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "./CotizacionPDF";
import { Button, Icon, Typography } from "@mui/material";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export const MyPDF = (props) => {
  // const blockEvent = (event) => {
  //     event.preventDefault();}
  return (
    <div>

      <PDFDownloadLink
        document={<MyDocument
          logoUrl={props.logoUrl}
          companyName={props.companyName}
          companyRut={props.companyRut}
          companyAddress={props.companyAddress}
          companyEmail={props.companyEmail}

          numeroCotizacion={props.numeroCotizacion}
          moneda={props.moneda}
          dolar={props.dolar}

          clientName={props.clientName}
          clientRut={props.clientRut}
          clientAddress={props.clientAddress}
          clientEmail={props.clientEmail}
          clientPhone={props.clientPhone}

          filas={props.filas}

        />}

        fileName={props.fileName}

      >
        <Button
          
          variant='text'
          sx={{
            paddingY: '10px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'underline',
            textDecorationColor: '#f5f5f5', "&:hover": {
              textDecoration: 'underline',
              textDecorationColor: 'white'
            }
          }}
          onClick={props.registrarCotizacion}
        >
          <Typography sx={{
            textDecoration: 'underline',
            textDecorationColor: '#f5f5f5', "&:hover": {
              textDecoration: 'underline',
              textDecorationColor: 'white'
            }
          }}>DESCARGAR</Typography>
        </Button>
      </PDFDownloadLink>
    </div>
  );
};