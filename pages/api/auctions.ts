import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    method,
    body: { data: {limit, page, state} }
  } = req;
  switch (method) {
    case 'POST':
        {
            try {
                
                const whiteApi = await axios.get(`${process.env.NEXT_PUBLIC_MY_URL}/api/data/whitelist`);
                const whiteList = whiteApi.data.data.whitelistName;
            
                // whitelist
                const result = await axios.get(`${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicmarket/v1/auctions?sort=ending&order=asc&state=${state}&limit=${limit}&page=${page}&symbol=XPR&collection_whitelist=${whiteList.join(',')}`);
                // const result = await axios.get(`${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicmarket/v1/auctions?sort=created&state=${state}&limit=${limit}&page=${page}&symbol=XPR`);

                await res.status(200).send({ success: true, data: [...result.data.data] });
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
