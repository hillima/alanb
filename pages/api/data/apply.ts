import { NextApiRequest, NextApiResponse } from 'next';
import *  as admin from 'firebase-admin';
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from 'firebase-admin/firestore';
import * as serviceAccount from './dg-market-b5c18-firebase-adminsdk-r2rkt-b75d0b1a24.json';
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.NEXT_PUBLIC_SEND_KEY);
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
  } = req;
  switch (method) {
    case 'GET': {
        const { query: { name, state } } = req;
        try {
            if (!admin.apps.length) {
                await initializeApp(firebaseConfig);
            }
            const db = await getFirestore();
            const applyRef = await db.collection('apply');
            const queryRef = await applyRef.where('author', '==', name).where('state', '==', state).get();
            let newArr = [];
            if (queryRef.empty) {
                console.log('No matching documents.');
                return;
              }
              
              queryRef.forEach(doc => {
                newArr.push(doc.data());
              });

            await res.status(200).send({ success: true, data: newArr });
        } catch (e) {
            res.status(500).send({
                success: false,
                message: e.message
            });
        }
    }
        break;
    case 'POST':
        {
            const { body: { data: { 
              answer, colname, rating, name, state, author, img, banner,
              contacts, sites, proofs, coldesc, royalties
            } } } = req;
            try {
                const answer2 = ['Yes , i am the author', 'Yes, i have the license to use the art', 'No'];
                if (!admin.apps.length) {
                    await initializeApp(firebaseConfig);
                }
                sgMail.send({
                  to: "Help@digital-galaxy.io",
                  from: "Help@digital-galaxy.io",
                  templateId: 'd-574811bac9b04c92bec131d0de6f2ba0',
                  dynamicTemplateData: {
                      blockchain: answer[0],    
                      legal_permission: answer[1] == '1' ? answer2[0] : answer[1] == '2' ? answer2[1] : answer2[2],
                      rating: rating,
                      col_name: name,
                      col_desc: coldesc,
                      royalties: royalties,
                      thumb_img: `${process.env.NEXT_PUBLIC_IPFS_URL}${img}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`,
                      banner_img: `${process.env.NEXT_PUBLIC_IPFS_URL}${banner}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`,
                      contact_name: contacts['name'],
                      contact_phone: contacts['phone'],
                      contact_email: contacts['email'],
                      col_twitter: sites['twitter'],
                      col_website: sites['website'],
                      col_discord: sites['discord'],
                      proof_work_img: `${process.env.NEXT_PUBLIC_IPFS_URL}${proofs['work']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`,
                      proof_desc: proofs['desc']
                  },
              })
              .then(async (result) => {
                  const db = await getFirestore();
                  await db.collection('apply').add({
                          answer: answer,
                          colname: colname,
                          coldesc: coldesc,
                          name: name,
                          royalties: royalties,
                          rating: rating,
                          state: state,
                          author: author,
                          img: img,
                          banner: banner,
                          contacts: contacts,
                          sites: sites,
                          proofs: proofs,
                  });
                  await res.status(200).send({ success: true });
              })
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
