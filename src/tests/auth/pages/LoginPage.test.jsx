import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';

import { LoginPage } from '../../../auth/pages/LoginPage';
import { authSlice } from '../../../store/auth';



const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },

})

 describe('probando el loginPage', () => {

    test('debe de mostrar el componente correctamente', () => {

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        screen.debug();
        expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1);


    });
    
 });