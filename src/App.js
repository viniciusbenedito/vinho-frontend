import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from './api';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress'

function App() {

  const [vinhos, setVinhos] = useState([]);
  const [ loading, setLoading ] = useState(true);

    // executa para obter informações externas.
    // "executado uma única vez".
    useEffect(() => {
        api.get('/vinho').then((response) => {
            const itens = response.data;
            setVinhos(itens);
            setLoading(false);
        })
    }, [])

  return (
    <div style={{marginTop: '80px'}}>
      { loading ? <CircularProgress /> : <div/> } 
      <Table>
          <TableBody>
          {vinhos.map(item => (
                <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.nome}</TableCell>
                    <TableCell>{item.tipo}</TableCell>
                    <TableCell>{item.classificacao}</TableCell>
                    <TableCell>{item.safra}</TableCell>
                </TableRow>         
          ))}
          </TableBody>
      </Table>
      <br/>
      {/* <Link to="/create">Adicionar</Link> */}
      <Button variant="contained" color="primary">
            Primary
      </Button>
    </div>
  );

}
export default App;
