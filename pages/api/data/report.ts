import { NextApiRequest, NextApiResponse } from 'next';
import * as admin from 'firebase-admin';
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from 'firebase-admin/firestore';
import * as serviceAccount from './dg-market-b5c18-firebase-adminsdk-r2rkt-b75d0b1a24.json';

const firebaseConfig = {
    apiKey: "AIzaSyCzd5fNeSSsZGrIDxXUzJoCxpA1V5VMu8w",
    authDomain: "dg-market-b5c18.firebaseapp.com",
    projectId: "dg-market-b5c18",
    storageBucket: "dg-market-b5c18.appspot.com",
    messagingSenderId: "774350202441",
    appId: "1:774350202441:web:e3f8ee0f5df88a098dc198",
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    method,
    body: { reportingAccount, refType, refId, reason, url }
  } = req;
  switch (method) {
    case 'POST':
        {
            try {
                if (!admin.apps.length) {
                    await initializeApp(firebaseConfig);
                }
                const db = await getFirestore();
                await db.collection('report').add({
                        account: reportingAccount,
                        refType: refType,
                        refId: refId,
                        reaseon: reason,
                        url: url
                });
                await res.status(200).send({ success: true });
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
