import { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount  from './dg-market-b5c18-firebase-adminsdk-r2rkt-b75d0b1a24.json';

let key: any = serviceAccount;
const firebaseConfig = {
    apiKey: "AIzaSyCzd5fNeSSsZGrIDxXUzJoCxpA1V5VMu8w",
    authDomain: "dg-market-b5c18.firebaseapp.com",
    projectId: "dg-market-b5c18",
    storageBucket: "dg-market-b5c18.appspot.com",
    messagingSenderId: "774350202441",
    appId: "1:774350202441:web:e3f8ee0f5df88a098dc198",
    credential: cert(key)
};


const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    method,
    body: { data: { name, ipfs } }
  } = req;
  switch (method) {
    case 'POST':
        {
            try { 
                if (!admin.apps.length) {
                    await initializeApp(firebaseConfig);
                }
                const db = await getFirestore();
                const whiteRef = await db.collection('whitelist');
                const snapshot = await whiteRef.where('name', '==', name).get();
                if(0 < snapshot.docs.length){
                  const id = await snapshot.docs[0].id;
                  await whiteRef.doc(`${id}`).set({
                    banner: ipfs
                  }, { merge: true });

                  await res.status(200).send({ success: true });

                }else{
                  await res.status(200).send({ success: false, message: 'No whitelist' });
                }
                } catch (e) {
                  res.status(500).send({
                      success: false,
                      message: e.message
                  });
                }
        }
      break;
    case 'PUT':
      break;
    case 'PATCH':
      break;
    default: 
      break;
    }
}

export default handler;
