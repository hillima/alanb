import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    method,
    body: { data: {collection} }
  } = req;
  switch (method) {
    case 'POST':
        {
            try {
                const whiteApi = await axios.get(`${process.env.NEXT_PUBLIC_MY_URL}/api/data/whitelist`);
                const verifiedValue = whiteApi.data.data.verifiedValue;
            
                await res.status(200).send({ success: true, data: [...verifiedValue.filter((item) => item.name == collection)] });
                
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
