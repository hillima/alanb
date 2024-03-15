import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    method,
    body: { data: { name } }
  } = req;
  switch (method) {
    case 'POST':
        {
            try {
                
                const whiteApi = await axios.get(`${process.env.NEXT_PUBLIC_MY_URL}/api/data/whitelist`);
                const whiteList = whiteApi.data.data.whitelistName;
                // whitelist add
                const made = await axios.get(`${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicmarket/v1/buyoffers?page=1&limit=30&state=0,1,2,3&sort=updated&order=desc&buyer=${name}&symbol=XPR&collection_whitelist=${whiteList.join(',')}`);
                const received = await axios.get(`${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicmarket/v1/buyoffers?page=1&limit=30&state=0,1,2,3&sort=updated&order=desc&seller=${name}&symbol=XPR&collection_whitelist=${whiteList.join(',')}`);
                await res.status(200).send({ success: true, data: {
                  made: made.data.data,
                  received: received.data.data
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
