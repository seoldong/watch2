import { initializeApp, getApps, cert } from 'firebase-admin/app';

<<<<<<< HEAD
=======
// const firebaseAdminConfig = {
//     type: process.env.TYPE,
//     project_id: process.env.PROJECT_ID,
//     private_key_id: process.env.PRIVATE_KEY_ID.replace(/\\n/g, '\n'),
//     private_key: process.env.PRIVATE_KEY,
//     client_email: process.env.CLIENT_EMAIL,
//     client_id: process.env.CLIENT_ID,
//     auth_uri: process.env.AUTH_URI,
//     token_uri: process.env.TOKEN_URI,
//     auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
//     client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
//     universe_domain: process.env.UNIVERSE_DOMAIN,
// };

// export function customInitApp() {
//     if (getApps().length <= 0) {
//         console.log('firebase-admin initializeApp');
//         admin.initializeApp({
//             credential: admin.credential.cert(firebaseAdminConfig),
//         });
//     }
// }
>>>>>>> a043a55940df2cc01bf95cf536c60c26cb9da8f9

const firebaseAdminConfig = {
    credential: cert({
        type: process.env.TYPE,
        project_id: process.env.PROJECT_ID,
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key: process.env.PRIVATE_KEY,
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        auth_uri: process.env.AUTH_URI,
        token_uri: process.env.TOKEN_URI,
        auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
        universe_domain: process.env.UNIVERSE_DOMAIN,
    })
};

export function customInitApp() {
    if (getApps().length <= 0) {
        initializeApp(firebaseAdminConfig);
    }
}