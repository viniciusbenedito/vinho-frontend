import React, { useState, useEffect } from 'react';
import api from './api';

function App() {

  const [vinhos, setVinhos] = useState([]);

    useEffect(() => {
        api.get('/vinho').then((response) => {
            const itens = response.data;
            setVinhos(itens);
        })
    }, [])


  return (
      <table>
          {vinhos.map(item => (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.nome}</td>
                    <td>{item.tipo}</td>
                    <td>{item.classificacao}</td>
                    <td>{item.safra}</td>
                </tr>         
          ))}
      </table>
  );

}
export default App;
