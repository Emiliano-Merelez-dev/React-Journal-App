import { authSlice, checkingCredentials, login, logout } from "../../../store/auth/authSlice"
import { authenticated, demoUser, initialState } from "../../fixtures/authFixtures"

describe('probando el authSlcie', () => {

    test('debe de regresar el estado inicial y llamarse "auth" ', () => {

        const state = authSlice.reducer( initialState, {});

        expect( state ).toEqual( initialState );
        expect( authSlice.name ).toBe('auth');
    });

    test('debe de realizar la autenticacion', () => {

        const state = authSlice.reducer( initialState, login( demoUser ) );
        expect( state ).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
        });
    });

    test('debe de realizar el logout sin argumentos', () => { 

        const state = authSlice.reducer( authenticated, logout( demoUser ) );
        expect( state ).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined,
        });
        

    });

    test('debe de realizar el logout con argumentos', () => { 

        const errorMessage = 'credenciales no son correctas'

        const state = authSlice.reducer( authenticated, logout({errorMessage}) );
        expect( state ).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage,
        });

    });

    test('debe de mostar el status en checking', () => {

        const state = authSlice.reducer( authenticated, checkingCredentials() );
        expect( state.status ).toBe('checking');

    });


});