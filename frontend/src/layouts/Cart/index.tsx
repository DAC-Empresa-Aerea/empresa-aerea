import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/organisms/Header';
import Footer from '../../components/organisms/Footer';

const CartLayout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
          <Header />
          <main className="container mx-auto px-1 py-2 flex-grow">
            <Outlet />
          </main>
          <Footer />
        </div>
      );
    };

export default CartLayout;