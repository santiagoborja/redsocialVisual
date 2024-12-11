import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const PublicLayout = () => {
  return (
    <>
        {/*Layout */}
        <Header />

        {/*Contenido principal */}
        <section className="layout__content">
            <Outlet/>
        </section>
    </>
  )
}
