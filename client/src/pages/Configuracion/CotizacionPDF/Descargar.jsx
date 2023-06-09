
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
  fullWidth
  variant='contained'
  sx={{ paddingY: '10px', mt: '25px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center',textDecoration: 'underline',
  textDecorationColor: '#1976d2', "&:hover":{textDecoration: 'underline',
  textDecorationColor: '#1565c0'}  }}
  onClick={props.registrarCotizacion}
>
  <Typography sx={{ textDecoration: 'underline',
    textDecorationColor: '#1976d2', "&:hover":{textDecoration: 'underline',
    textDecorationColor: '#1565c0'} }}>Generar cotización<Icon sx={{ marginBottom: 0, ml: '5px' }}>
    <PictureAsPdfIcon />
  </Icon></Typography>
</Button>
      </PDFDownloadLink>
    </div>
  );
};