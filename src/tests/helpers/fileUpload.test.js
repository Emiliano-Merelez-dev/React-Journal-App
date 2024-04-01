import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({
    cloud_name: 'react8',
    api_key: '932314645314458',
    api_secret: 'vUZ1Qas-PS6D2qpfSKAs-6Gwz6U',
    secure: true,
})

describe('probando el fileUpload', () => {

    test('debe de subir correctamente el archivo de claudinary', async() => {

        const imageUrl = 'https://images.unsplash.com/photo-1707343843344-011332037abb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');

        const url = await fileUpload( file );
        expect(typeof url).toBe('string'); 

        const segments = url.split('/');
        const imageId = segments[ segments.length - 1 ].replace('.jpg','');

        const cloudResp = await cloudinary.api.delete_resources([ 'journal/' + imageId ],{
            resource_type: 'image'
        });
        
    });

    test('debe de devolver un null', async() => {

        const file = new File([], 'foto.jpg');
        const url = await fileUpload( file );
        expect(url).toBe(null); 

    })
})