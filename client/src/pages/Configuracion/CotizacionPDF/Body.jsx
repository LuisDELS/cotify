import React from 'react';
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const Body = ({ filas, moneda }) => {
  const calcularSubtotal = (precio, cant) => {
    return Math.floor(precio * cant);
  };

  const calcularIva = (precio, cant) => {
    return Math.floor(precio * cant * 0.19);
  };

  const calcularTotal = (precio, cant) => {
    return Math.floor(precio * cant * 1.19);
  };

  const calcularSuma = (columna) => {
    return filas.reduce((total, row) => {
      if (!row.eliminada) {
        return total + calcularColumna(row, columna);
      }
      return total;
    }, 0);
  };

  const calcularColumna = (row, columna) => {
    switch (columna) {
      case 'subtotal':
        return calcularSubtotal(row.precio, row.cant);
      case 'iva':
        return calcularIva(row.precio, row.cant);
      case 'total':
        return calcularTotal(row.precio, row.cant);
      default:
        return 0;
    }
  };

  
  const styles = StyleSheet.create({
    table: {
      marginVertical: 10,
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      borderWidth: 1,
      borderColor: '#333',
      borderRadius: 5,
      overflow: 'hidden',
      fontSize: 9,
      height: 320,

    },
    tableRow: {
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderTopWidth: 1,
      borderTopColor: '#333',
    },
    tableRowHeader: {
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 8,
      paddingVertical: 4,


    },
    tableHeader: {
      flex: 1,
      fontFamily: "Rubik",
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'black',
    },
    tableCellLeft: {
      flexBasis: '10%',
      textAlign: 'center',
      color: '#333',
    },
    tableCellProducto: {
      flexBasis: '25%',
      textAlign: 'center',
      color: '#333',


    },
    tableCellCant: {
      flexBasis: '10%',
      textAlign: 'center',
      color: '#333',
    },
    tableCellPrecio: {
      flexBasis: '15%',
      textAlign: 'center',
      color: '#333',
    },
    tableCellSubtotal: {
      flexBasis: '15%',
      textAlign: 'center',
      color: '#333',
    },
    tableCellIva: {
      flexBasis: '10%',
      textAlign: 'center',
      color: '#333',
    },
    tableCellTotal: {
      flexBasis: '15%',
      textAlign: 'center',
      color: '#333',
    },
    tableCell: {
      flex: 1,
      textAlign: 'center',
      color: '#333',
      maxWidth: 150,
      paddingVertical: "3px"
    },
    summaryTable: {
      fontFamily: "Rubik",
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      fontSize: 9,
      border: "1px solid black",
      paddingTop: "3px",
      paddingBottom: "6px",
      marginBottom: "-1px",
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5
    },
    summaryTable1: {
      fontFamily: "Rubik",

      flexDirection: 'row',
      justifyContent: 'space-between',
      fontSize: 9,
      border: "1px solid black",
      paddingVertical: "5px",
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5

    },
    summaryCell: {
      flex: 1,
      textAlign: 'center',
      color: 'black',
      fontWeight: 'bold',
      paddingTop: 2,

    },
  });

  const sumaSubtotales = calcularSuma('subtotal');
  const sumaIva = calcularSuma('iva');
  const sumaTotal = calcularSuma('total');

  function formatNumber(number) {
    // Verificar si el valor es un número
    if (typeof number !== 'number') {
      return number; // Retornar el valor original si no es un número
    }
  
    // Aplicar el formato de separador de miles
    return number.toLocaleString('es-ES', { minimumFractionDigits: 0, useGrouping: true });
  }
  return (
    <View>
      <View style={styles.table}>
        <View style={styles.tableRowHeader}>
          <Text style={[styles.tableHeader, styles.tableCellLeft]}>ITEM</Text>
          <Text style={[styles.tableHeader, styles.tableCellProducto]}>PRODUCTO/SERVICIO</Text>
          <Text style={[styles.tableHeader, styles.tableCellCant]}>CANT</Text>
          <Text style={[styles.tableHeader, styles.tableCellPrecio]}>PRECIO UNI</Text>
          <Text style={[styles.tableHeader, styles.tableCellSubtotal]}>SUBTOTAL</Text>
          <Text style={[styles.tableHeader, styles.tableCellIva]}>IVA</Text>
          <Text style={[styles.tableHeader, styles.tableCellTotal]}>TOTAL</Text>
        </View>
        {filas.map((row, index) => (
          !row.eliminada && (
            <View style={styles.tableRow} key={row.item}>
              <Text style={[styles.tableCellLeft]}>{row.item}</Text>
              <Text style={[styles.tableCellProducto, styles.tableCell]}>{row.producto}</Text>
              <Text style={[styles.tableCellCant]}>{`${formatNumber(row.cant)}`}</Text>
              <Text style={[styles.tableCellPrecio]}>{`${moneda} ${formatNumber(parseInt(row.precio))}`}</Text>
              <Text style={[styles.tableCellSubtotal]}>{`${moneda} ${formatNumber(calcularSubtotal(row.precio, row.cant))}`}</Text>
              <Text style={[styles.tableCellIva]}>{`${moneda} ${formatNumber(calcularIva(row.precio, row.cant))}`}</Text>
              <Text style={[styles.tableCellTotal]}>{`${moneda} ${formatNumber(calcularTotal(row.precio, row.cant))}`}</Text>
            </View>
          )
        ))}
      </View>
      <View style={styles.summaryTable}>
        <Text style={styles.summaryCell}>SUBTOTAL</Text>
        <Text style={styles.summaryCell}>IVA</Text>
        <Text style={styles.summaryCell}>TOTAL</Text>
      </View>
      <View style={styles.summaryTable1}>
        <Text style={styles.summaryCell}>{`${moneda} ${formatNumber(sumaSubtotales)}`}</Text>
        <Text style={styles.summaryCell}>{`${moneda} ${formatNumber(sumaIva)}`}</Text>
        <Text style={styles.summaryCell}>{`${moneda} ${formatNumber(sumaTotal)}`}</Text>
      </View>
      <View>
        <Text style={{ color: "#db682d", marginTop: "30px", fontSize: "10px", textAlign: "center" }}>Por favor, considere el medio ambiente antes de imprimir este documento. Si es necesario imprimirlo, hágalo en ambos lados de la hoja y recicle cuando termine su uso.</Text>
      </View>
    </View>

  );
};

export default Body;


