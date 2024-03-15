import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import proton from '../../../services/proton-rpc';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    method,
    body: { data: { userName } }
  } = req;
  switch (method) {
    case 'POST':
        {
            try {
                    const mutations = await proton.getUserMutations(userName);
                    const newArr = await axios.get(`https://proton.api.atomicassets.io/atomicassets/v1/collections?page=1&limit=100&order=desc&sort=created&collection_whitelist=${mutations['colwatches'].join(',')}`);

                    await res.status(200).send({ success: true, data: mutations['colwatches'].length < 1 ? [] : [...newArr.data.data] });
                
                
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
