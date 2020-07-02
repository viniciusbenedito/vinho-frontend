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
        const [ lista, setLista ] = useState([]);
        const [ open, setOpen ] = useState(false);
        const [ nome, setNome ] = useState('');
        const [ tipo, setTipo ] = useState('');
        const [ classificacao, setClassificacao ] = useState('');
        const [ safra, setSafra ] = useState('');
        const [ id, setId ] = useState('');
        const [ botaoEditar, setBotaoEditar ] = useState(false);
        const [ botaoAdicionar, setBotaoAdicionar ] = useState(false);
        

    function openModal() {
        setBotaoAdicionar(true);
        setBotaoEditar(false);
        setNome('');
        setTipo('');
        setClassificacao('');
        setSafra('');
        setId('');
        setOpen(true);
    };

    function closeModal() {
        setOpen(false);
    };

    function listaVinho(){
         api.get('/vinho').then((response) => {
            const itens = response.data;
            setLista(itens);
                setNome('');
                setTipo('');
                setClassificacao('');
                setSafra('');
                setId('');
        });
    };
    useEffect(() => {
        listaVinho();
    }, []);

    //Função para adicionar uma garrafa.
    function addGarrafa() {
        api.post('/vinho', {nome: nome, tipo: tipo, classificacao: classificacao, safra: safra}).then((response) => {
        setNome('');
        setTipo('');
        setClassificacao('');
        setSafra('');
        setId('');
        setOpen(false);
        listaVinho();
        })
    }

    //Função para apagar uma garrafa
     function deleteGarrafa(id) {
        api.delete(`/vinho/${id}`).then((response) => { 
        listaVinho()
        })
     }

     //Função para editar uma garrafa
    function openEditar(id,nome,tipo,classificacao,safra){
        setBotaoAdicionar(true);
        setBotaoEditar(true);
        setNome(nome);
        setTipo(tipo);
        setClassificacao(classificacao);
        setSafra(safra);
        setId(id);
        setOpen(true);

      };

      function editarGarrafa(){
        api.put(`/vinho/${id}`,{nome: nome, tipo: tipo, classificacao: classificacao, safra: safra}).then((response) => {
            setOpen(false);
            setNome('');
            setTipo('');
            setClassificacao('');
            setSafra('');
            setId('');
            listaVinho();
        });
    };

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
                        <TableCell>Editar/Apagar</TableCell>
                    
                    </TableRow>
                </TableHead>
                <TableBody>
                {lista.map(item => ( 
                    <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.nome}</TableCell>
                        <TableCell>{item.tipo}</TableCell>
                        <TableCell>{item.classificacao}</TableCell>
                        <TableCell>{item.safra}</TableCell>
                        <TableCell>
                            &nbsp;
                            <Button variant="outlined" size="small" color="primary" onClick={() => openEditar(item.id,item.nome, item.tipo, item.classificacao, item.safra)}>Editar</Button>
                            &nbsp;
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
            <Button onClick={botaoEditar ? editarGarrafa : addGarrafa} color="primary">
                Salvar
            </Button>
            </DialogActions>
        </Dialog>   
        </>
        );

}
export default App;