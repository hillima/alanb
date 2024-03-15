import { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.NEXT_PUBLIC_SEND_KEY);


const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    method,
  } = req;
  switch (method) {
    case 'POST':
        {
            // const { body: { data: { answer, colname, rating, name, state, author, img, banner } } } = req;
            try {
                sgMail.send({
                    to: "ownerree@gmail.com",
                    from: "Help@digital-galaxy.io",
                    templateId: 'd-574811bac9b04c92bec131d0de6f2ba0',
                    dynamicTemplateData: {
                        blockchain: "proton",    
                        legal_permission: "Yes, i have the license to use the art",
                        rating: "gold",
                        col_name: "fakecol",
                        col_desc: "fakecol desc",
                        royalties: "10",
                        thumb_img: "https://proton.mypinata.cloud/ipfs/QmWQCxDGisnqRRE6urScgbTiDPExKPhrnvy8mhXiw9ZGgc",
                        banner_img: "https://proton.mypinata.cloud/ipfs/QmbsTz9DhjY6fTwewUKk1o9QV3V89UHJVrcLuNTPzVVGpC"
                    },
                })
                .then((result) => {
                    res.status(200).send({ success: true });
                })
                .catch(console.log);
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
