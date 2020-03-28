import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';



import heroImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api';


import './styles.css';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogon(e) {
        e.preventDefault();
        try {
            const result = await api.post('sessions', { id });
            const name = result.data.name;
            console.log(name)
            localStorage.setItem('ongName', name);
            localStorage.setItem('ongId', id);
            history.push('/profile');
        } catch (err) {
            alert('Erro no Login, tente novamente.');
        }

    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />
                <form onSubmit={handleLogon}>
                    <h1>Faça seu logon</h1>

                    <input type="text"
                        placeholder="Sua ID"
                        Value={id}
                        onChange={e => setId(e.target.value)}
                    />

                    <button className="button" type="submit">Entrar</button>
                    <Link to="/register" className="back-link"> <FiLogIn size={16} color="#E02041" /> Não tenho cadastro</Link>
                </form>
            </section>
            <img src={heroImg} alt="Heroes" />
        </div>
    );
}