import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    method,
    query: { page, keyword },
  } = req;
  switch (method) {
    case 'POST':
      break;
    case 'PUT':
      break;
    case 'PATCH':
      break;
    default: {      
      try {
        const whiteApi = await axios.get(`${process.env.NEXT_PUBLIC_MY_URL}/api/data/whitelist`);
        const whiteList = whiteApi.data.data.whitelistName;

        const temResult = await axios.get(`https://proton.api.atomicassets.io/atomicassets/v1/templates?page=${page}&limit=100&order=desc&sort=created&collection_whitelist=${whiteList.join(',')}&match=${keyword}`);

        res.status(200).send({ success: true, data: temResult.data.data});
        
      } catch (e) {
        res.status(500).send({
          success: false,
          message: e.message || 'Error retrieving search results',
        });
      }
      break;
    }
  }
};

export default handler;