import React, { useState, useEffect } from 'react';
import api from './api';
import Header from './header';
import { 
    Container, 
    Table, 
    TableHead,
    TableRow, 
    TableCell, 
    Dialog, 
    Button, 
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions, 
    TableBody} from '@material-ui/core';
import './style.css';

    function App() {
        const [ vinhos, setVinhos ] = useState([]);
        const [ open, setOpen ] = useState(false);
        const [ nome, setNome ] = useState('');
        const [ tipo, setTipo ] = useState('');
        const [ classificacao, setClassificacao ] = useState('');
        const [ safra, setSafra ] = useState('');

    function loadData() { 
        api.get('/vinho').then((response) => { 
        const itens = response.data;
        setVinhos(itens);
        });
    }
    
    useEffect(() => loadData(), [])

    const openModal = () => setOpen(true);

    const closeModal = () => setOpen(false);

    //Função para adicionar uma garrafa.
    function addGarrafa() {
        api.post('/vinho', {nome: nome, tipo: tipo, classificacao: classificacao, safra: safra}).then((response) => {
        setNome('');
        setTipo('');
        setClassificacao('');
        setSafra('');
        setOpen(false);
        loadData();
        })
    }

    //Função para apagar uma garrafa
     function deleteGarrafa(id) {
        api.delete(`/vinho/${id}`).then((response) => { 
        loadData()
        })
     }

    return (
        <>
        <Header/>
        <Container maxWidth="lg" className="container">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Classificação</TableCell>
                        <TableCell>Safra</TableCell>
                        <TableCell>Apagar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {vinhos.map(item => ( 
                    <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.nome}</TableCell>
                        <TableCell>{item.tipo}</TableCell>
                        <TableCell>{item.classificacao}</TableCell>
                        <TableCell>{item.safra}</TableCell>
                        <TableCell>
                            <Button variant="outlined" size="small" color="secondary"onClick={() => deleteGarrafa(item.id)}>Apagar</Button>
                        </TableCell>
                    </TableRow> 
                ))} 
            </TableBody>
            </Table>
            <Button
                onClick={openModal}
                variant="contained" 
                color="primary" 
                style={{marginTop: '20px'}}>
                Adicionar
             </Button>
        </Container>
        <Dialog open={open} onClose={closeModal} fullWidth={true} maxWidth="sm">
            <DialogTitle id="form-dialog.title">Adicionar Garrafa</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Digite as informações referentes ao vinho.
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="nome"
                label="Nome"
                type="Text"
                fullWidth
                value={nome}
                onChange={e =>setNome(e.target.value)}
            />
            <TextField
                autoFocus
                margin="dense"
                id="tipo"
                label="Tipo"
                type="Text"
                fullWidth
                value={tipo}
                onChange={e =>setTipo(e.target.value)}
            />
            <TextField
                autoFocus
                margin="dense"
                id="classificacao"
                label="Classificação"
                type="Text"
                fullWidth
                value={classificacao}
                onChange={e =>setClassificacao(e.target.value)}
            />
            <TextField
                autoFocus
                margin="dense"
                id="safra"
                label="Safra"
                type="int"
                fullWidth
                value={safra}
                onChange={e =>setSafra(e.target.value)}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={closeModal} color="primary">
                Cancelar
            </Button>
            <Button onClick={addGarrafa} color="primary">
                Salvar
            </Button>
            </DialogActions>
        </Dialog>   
        </>
        );

}
export default App;