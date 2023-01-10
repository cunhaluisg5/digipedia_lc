import React from 'react';

import './header.css';
import Digivice from '../../img/digivice.png';

const Header = ({titulo}) => {
    return(
        <div className='header'>
            <h1 className='tituloCabecalho'>{titulo}</h1>
            <img className='imagemDigivice' src={Digivice} alt={Digivice} />
        </div>
    )
}

export default Header;