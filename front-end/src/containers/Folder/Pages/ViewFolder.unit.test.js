import {React} from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {useSelector} from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Route } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import {NewNote} from './NewNote';

window.alert = jest.fn();

// Mocking redux module
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn( () => jest.fn((param) => param) )
}));

// Mocking the state
const mockAppState = {
    users: [
        {email: "grupo4@teste.com", 
        password: "$2a$10$NI/hL/IqIaZTQce5olXsAuu9G6cowlyp2tZqYJtsszFUVC/HBGCL.", 
        id: "f560ba87-b8df-4c70-bfc5-7fb112309b07"
    }]    
}
test('button View folder', () => {
    const history = createMemoryHistory();
    let pasta = {id: 1, nome: 'Pasta1'}; //confirmar se existe algum objeto Pasta
    render(<Router history={history}><div>Pagina de uma Pasta existente </div></Router>);
    const leftClick = { button: 0 };
    userEvent.click(screen.getByText(/yourArchive/), leftClick); //confirmar essa rota
    expect(history.location.pathname).toBe('/projetos/1'); //rota de uma Pasta Existente
});