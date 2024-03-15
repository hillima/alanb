import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    method,
    body: { data: {name} }
  } = req;
  switch (method) {
    case 'POST':
        {
            try {
                
                const whiteApi = await axios.get(`${process.env.NEXT_PUBLIC_MY_URL}/api/data/whitelist`);
                const whiteList = whiteApi.data.data.whitelistName;
                // whitelist add
                const seller = await axios.get(`${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicmarket/v1/auctions?page=1&limit=100&state=1,4&sort=created&order=desc&seller=${name}&symbol=XPR`);
                const buyer = await axios.get(`${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicmarket/v1/auctions?page=1&limit=100&state=3&sort=ending&order=desc&hide_empty_auctions=true&buyer=${name}&symbol=XPR`);
                const sold = await axios.get(`${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicmarket/v1/auctions?page=1&limit=100&state=3&sort=ending&order=desc&hide_empty_auctions=true&seller=${name}&symbol=XPR`);
                const bidder = await axios.get(`${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicmarket/v1/auctions?page=1&limit=100&state=1,4&sort=created&order=desc&bidder=${name}&symbol=XPR`);
                await res.status(200).send({ success: true, data: {
                  seller: seller.data.data,
                  sold: sold.data.data,
                  buyer: buyer.data.data,
                  bidder: bidder.data.data
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
