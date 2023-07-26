function Products() {
    // Resto del código ...
  
    // Obtener los datos de órdenes de compra (por ejemplo, del estado local)
    const orders = [
      { id: 1, customer: 'Cliente 1', total: 100 },
      { id: 2, customer: 'Cliente 2', total: 150 },
      // Agrega más datos de órdenes aquí...
    ];
  
    // Resto del código ...
  
    // Renderizar la tabla de órdenes de compra
    return (
      <div className={styles.contain}>
        {/* Resto del código ... */}
  
        {/* Tabla de órdenes de compra */}
        <div className={`${styles.contenedor} ${styles.OrdersContainer}`}>
          <h2>Tabla de Órdenes de Compra</h2>
          <Table className={`${styles.Tabla} table table-striped table-bordered table-hover`}>
            <thead>
              <tr>
                <th>#</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.total}</td>
                  <td>
                    {/* onClick={() =>handleProductDelete(product.id)} */}
                          <button   className={styles.deleteButton}>
                              <svg xmlns="http://www.w3.org/2000/svg" className={styles.bin} viewBox="0 0 16 16">
                             <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                          </svg></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
  