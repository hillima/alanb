import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    method,
    body: { data: { name, state } }
  } = req;
  switch (method) {
    case 'POST':
        {
            try {
                const applyApi = await axios.get(`${process.env.NEXT_PUBLIC_MY_URL}/api/data/apply?name=${name}&state=${state}`);
                const applyValue = applyApi.data.data;
            
                await res.status(200).send({ success: true, data: [...applyValue] });
                
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
