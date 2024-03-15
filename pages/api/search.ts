import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    method,
    query: { query },
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

        const result = await axios.get(`https://proton.api.atomicassets.io/atomicassets/v1/collections?page=1&limit=100&order=desc&sort=created&collection_whitelist=${whiteList.join(',')}`);
        const temResult = await axios.get(`https://proton.api.atomicassets.io/atomicassets/v1/templates?page=1&limit=100&order=desc&sort=created&collection_whitelist=${whiteList.join(',')}&match=${query}`);

        const collections = await result.data.data.filter((it) => -1 < it['name'].replace(',','').toLowerCase().indexOf(String(query).replace(',','').toLowerCase()));
        const authors = await result.data.data.filter((it) => -1 < it['author'].replace(',','').toLowerCase().indexOf(String(query).replace(',','').toLowerCase()));
        const templates = await temResult.data.data.filter((it) => -1 < it['immutable_data']['name'].replace(',','').toLowerCase().indexOf(String(query).replace(',','').toLowerCase()));
        

        res.status(200).send({ success: true, data: {
            collections,
            authors: authors.filter((arr, index, callback) => index === callback.findIndex((it) => it['author'] === arr['author'])),
            templates: templates.slice(0, 5)
        } });
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