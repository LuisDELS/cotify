import React from "@react-pdf/renderer";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  footer: {
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 9,
  },
  tableFooter: {
    flexDirection: "row",
    width: "100%",
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: "3px"
  },
  tableCellFooter: {
    width: "25%",
    borderRightWidth: 1,
    borderRightColor: "#333",
  },
  tableCellLast: {
    width: "50%",
  },
  tableText: {
    padding: 5,
  },
  tableText1: {
    padding: 5,
    borderBottom: "1px solid black",
    fontFamily: "Rubik",
    fontWeight: "bold"
  },
}
);

const Footer = ({ subtotal, iva, total }) => (
  <View style={styles.footer}>
    <View style={styles.tableFooter}>
      <View style={styles.tableCellFooter}>
        <Text style={styles.tableText1}>Subtotal</Text>
        <Text style={styles.tableText}>{subtotal}</Text>
      </View>
      <View style={styles.tableCellFooter}>
        <Text style={styles.tableText1}>IVA</Text>
        <Text style={styles.tableText}>{iva}</Text>
      </View>
      <View style={styles.tableCellLast}>
        <Text style={styles.tableText1}>Total</Text>
        <Text style={styles.tableText}>{total}</Text>
      </View>

    </View>
    <View>
      <Text style={{ color: "grey", marginTop: "20px", fontSize: "10px" }}>Por favor, considere el medio ambiente antes de imprimir este documento. Si es necesario imprimirlo, hágalo en ambos lados de la hoja y recicle cuando termine su uso.</Text>
    </View>
  </View>
);

export default Footer;