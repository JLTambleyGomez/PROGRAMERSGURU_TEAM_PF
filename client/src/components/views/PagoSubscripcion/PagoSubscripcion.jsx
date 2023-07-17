import styles from "./PagoSubscripcion.module.css"
import { useState } from "react"
import PagoMercadopago from "../../datos/PagoMercadoPago/PagoMercadoPago";
import PagoMetamask from "../../datos/PagoMetamask/PagoMetamask";


const PagoSubscripcion = () => {
  const [subscripcion, setSubscripcion] = useState(null);
  const [total, setTotal] = useState(0);
  const [MostrarPagos, setMostrarPagos] = useState(false);
  const [compra, setCompra] = useState({});



  const handleAddSubscripcion = (selectedSubscripcion) => {
    setMostrarPagos(false)
    setSubscripcion(selectedSubscripcion);
    setTotal(selectedSubscripcion.cost);
  }

  const handlePagarButton =()=>{

    const referencia = {
        description: subscripcion.name,
    price: subscripcion.cost,
    quantity: 1,
    }
    setCompra(referencia)
    setMostrarPagos(true)

  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Subscríbete ya! y disfruta sin limitaciones</h1>

      <div className={styles.product}>
        <h3 className={styles.item}>Subscripción 3 meses</h3>
        <p className={styles.p} >Por tan solo 6 dólares</p>
        <p className={styles.buton} onClick={() => handleAddSubscripcion({ name: "Subscripción 3 meses", cost: 6 })}>Escoger</p>
      </div>

      <div className={styles.product}>
        <h3 className={styles.item}>Subscripción 6 meses</h3>
        <p className={styles.p} >Por tan solo 12 dólares</p>
        <p  className={styles.buton} onClick={() => handleAddSubscripcion({ name: "Subscripción 6 meses", cost: 12 })}>Escoger</p>
      </div>

      <div className={styles.product}>
        <h3 className={styles.item}>Subscripción 1 Año!</h3>
        <p className={styles.p}>Oferta: por tan solo 20 dólares</p>
        <p className={styles.buton} onClick={() => handleAddSubscripcion({ name: "Subscripción 1 Año", cost: 20 })}>Escoger</p>
      </div>

      <div className={styles.total}>
        <h1>TU ELECCIÓN:</h1>
        {subscripcion && (
          <div className={styles.totalcontainer}>
            <li className={styles.item}>{subscripcion.name}</li>
            <h1>Valor Total: $ {total}</h1>
          </div>
        )}
          <p className={styles.pagar}   onClick={handlePagarButton}>ir a Pagar</p>
                            {MostrarPagos && (
                                <div>
                                <p>Escoge tu medio de Pago</p>
                                {compra.description && (
                                    <PagoMercadopago reference={compra} />
                                )}
                                <PagoMetamask total={subscripcion.cost} />
                                </div>
                            )}
      </div>
    </div>
  );
}

export default PagoSubscripcion;
