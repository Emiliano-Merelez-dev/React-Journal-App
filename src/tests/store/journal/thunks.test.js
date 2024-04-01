import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { addNewEmptyNote, savingNewNote, setActiveNote, startNewNote } from "../../../store/journal";
import { FirebaseDB } from "../../../firebase/config";


describe('probando el journalThunks', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    // tenes que hacer el journalSlice acordate


    test('startNewNote debe de crear una nota', async() => {

        const uid = 'TEST-UID';
        getState.mockReturnValue({ auth: { uid: uid } });

        await startNewNote()(dispatch, getState);

        expect( dispatch ).toHaveBeenCalledWith( savingNewNote() );
        expect( dispatch ).toHaveBeenCalledWith( addNewEmptyNote({
            body: '',
            title: '',
            id: expect.any( String ),
            date: expect.any( Number ),
            imageUrls: [],
            
        }));
        expect( dispatch ).toHaveBeenCalledWith( setActiveNote({
            body: '',
            title: '',
            imageUrls: [],
            id: expect.any( String ),
            date: expect.any( Number ),
        }));


        const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes`);
        const docs = await getDocs( collectionRef );
        
        const deletePromise = [];
        docs.forEach( doc => deletePromise.push( deleteDoc( doc.ref ) ) );
        await Promise.all( deletePromise );

        
    });
});