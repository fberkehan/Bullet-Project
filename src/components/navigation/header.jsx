import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/header.css';
import BulletLogo from '../../assets/img/bulletLogoYatay.png'; 
import { sidebarOpener, cartSidebarOpener } from '../../assets/js/utils';
import { useShoppingCart } from '../../ticketManagment';

function Header() {
    const [sayfaAdi, setSayfaAdi] = useState('');
    const { cartItems } = useShoppingCart();

    useEffect(() => {
        const sidebar = document.querySelector('.sidebar');
        const observer = new MutationObserver(() => {
            if (sidebar.classList.contains('activeSidebar')) {
                setSayfaAdi('Kategoriler');
            } else {
                setSayfaAdi('');
            }
        });

        observer.observe(sidebar, { attributes: true });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const totalTicketCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        document.getElementById('ticketCart').textContent = totalTicketCount.toString();
    }, [cartItems]);

    return (
        <nav className="bulletHeader">
            <i className="fa-solid fa-bars" onClick={sidebarOpener}></i>
            <div id="logoMain">
                {!sayfaAdi && <img className="navbar-brand d-inline-block align-top" src={BulletLogo} alt="Maskot" style={{ width: '150px' }}/>}
                {sayfaAdi && <h1 id="logoText" style={{ color: 'white', fontFamily: 'SamsungSharpSans-Bold', fontWeight: 'bold', fontSize: '26px', paddingTop: '10px' }}>{sayfaAdi}</h1>}
            </div>
            <div onClick={cartSidebarOpener}>
            <i className="fa-solid fa-ticket"></i>
            <div id='ticketCart'>0</div>
            </div>
            
        </nav>
    );
}

export default Header;
