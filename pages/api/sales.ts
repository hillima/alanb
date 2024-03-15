import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    method,
    body: { data: {limit, page} }
  } = req;
  switch (method) {
    case 'POST':
        {
            try {
                
                const whiteApi = await axios.get(`${process.env.NEXT_PUBLIC_MY_URL}/api/data/whitelist`);
                const whiteList = whiteApi.data.data.whitelistName;
                const result = await axios.get(`${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicmarket/v2/sales?sort=created&state=1&limit=100&symbol=XPR&collection_whitelist=${whiteList.join(',')}`);
                let data = await result.data.data;
                let newArr = [];
                for(let i = 0; i < data.length; i++){
                  let index = await newArr.findIndex((it) => it['collection']['collection_name'] == data[i]['collection']['collection_name']);
                  if(index < 0){
                    await newArr.push(data[i]);
                  }
                  if(0 <= index && 43200000 <= (parseInt(newArr[index]['created_at_time']) - parseInt(data[i]['created_at_time']))){
                    await newArr.push(data[i]);
                  }
                  if(newArr.length == limit){
                    break;
                  }
                }
                
                
                await res.status(200).send({ success: true, data: [...newArr] }); 
                
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
