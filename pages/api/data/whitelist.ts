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
    body
  } = req;
  switch (method) {
    case 'GET':
        {
            try {
                if (!admin.apps.length) {
                    await initializeApp(firebaseConfig);
                }
                const verifiedValue = [];
                const whitelistName = [];
                const db = await getFirestore();
                const whiteRef = await db.collection('whitelist').get();
                await whiteRef.forEach((white) =>{
                    verifiedValue.push(white.data());
                    whitelistName.push(white.data().name);
                })
                await res.status(200).send({ success: true, data: {
                    verifiedValue,
                    whitelistName
                } });
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
