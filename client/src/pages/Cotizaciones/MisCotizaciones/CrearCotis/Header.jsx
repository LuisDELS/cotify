import { Image, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import RubikRegular from "../../../../fonts/Rubik-Regular.ttf"
import RubikBold from "../../../../fonts/Rubik-Bold.ttf"

export default function Header({ logoUrl, companyName, companyRut, companyAddress, companyEmail, title, cotizationNumber, clientName, clientRut, clientAddress, clientEmail, clientPhone, dolar, fecha }) {

  Font.register({
    family: "Rubik",
    fonts: [
      { src: RubikRegular, fontWeight: "normal" },
      { src: RubikBold, fontWeight: "bold" },
    ],
  });

  return (
    <>
      <View style={styles.header}>
        <View>
          <Image style={styles.logo} src={logoUrl} />
        </View>
        <View style={styles.companyInfo}>
          <Text style={styles.companyName}>{companyName}</Text>
          <Text style={styles.companyRut}>{companyRut}</Text>
          <Text style={styles.companyContact}>{companyAddress}</Text>
          <Text style={styles.companyContact}>{companyEmail}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{new Date(fecha).toLocaleDateString()}</Text>
        </View>
      </View>
      <View style={styles.subheader}>
        <Text style={styles.subheaderTitle}>{title}</Text>
        <Text style={styles.cotizationNumber}>Numero de cotización:  {cotizationNumber}</Text>
        <Text style={styles.dolar}>Dolar mayorista: ${dolar}</Text>
        <View style={styles.clientInfo}>
          <View style={styles.clientInfoRow}>
            <Text style={styles.clientInfoKey}>Razón social:  </Text>
            <Text style={styles.clientInfoValue}>{clientName}</Text>
          </View>
          <View style={styles.clientInfoRow}>
            <Text style={styles.clientInfoKey}>RUT:                      </Text>
            <Text style={styles.clientInfoValue}>{clientRut}</Text>
          </View>
          <View style={styles.clientInfoRow}>
            <Text style={styles.clientInfoKey}>Dirección:         </Text>
            <Text style={styles.clientInfoValue}>{clientAddress}</Text>
          </View>
          <View style={styles.clientInfoRow}>
            <Text style={styles.clientInfoKey}>Email:                   </Text>
            <Text style={styles.clientInfoValue}>{clientEmail}</Text>
          </View>
          <View style={styles.clientInfoRow}>
            <Text style={styles.clientInfoKey}>Teléfono:           </Text>
            <Text style={styles.clientInfoValue}>{clientPhone}</Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    fontFamily: "Rubik",
    fontWeight: "normal",
  },
  logo: {
    width: 100,
    height: 20,
    flexDirection: "column",
    marginTop: -50,
  },
  companyInfo: {
    marginTop: 30,
    marginLeft: -100,
    flexGrow: 1,
  },
  companyName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  companyRut: {
    fontSize: 12,
    fontWeight: "normal"
  },
  companyContact: {
    fontSize: 10,
  },
  dateContainer: {
    alignItems: "flex-end",
    marginRight: "10px",
    marginTop: 10
  },
  date: {
    fontSize: 9,
    fontWeight: "bold",
    fontFamily: "Rubik"
  },
  dolar: {
    fontSize: 9,
    fontWeight: "bold",
    marginLeft: "auto",
    marginBottom:"10px",
    fontFamily: "Rubik",
    
  },



  subheader: {
    marginBottom: 20,
  },
  subheaderTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Rubik"
  },
  cotizationNumber: {
    fontSize: 9,
    fontWeight: "bold",
    marginLeft: 2,
    marginBottom:"-10px",
    fontFamily: "Rubik"
  },
  clientInfo: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: "5px",
    padding: 10,
    fontSize: "10px"
  },
  clientInfoRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  clientInfoKey: {
    fontWeight: "bold",
    marginRight: 10,
    fontFamily: "Rubik"
  },
  clientInfoValue: {
    flexGrow: 1,
  },
});