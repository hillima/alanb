import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import json from './response_1672902630603.json';
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    method,
  } = req;
  switch (method) {
    case 'GET':
        {
            try {
              let allSales = [];
              let ar = true;
              let page = 1;
              while(ar){
                let sales = await axios.get(`https://proton.api.atomicassets.io/atomicmarket/v1/buyoffers?state=3&collection_name=451325523114&page=${page}&limit=100&order=desc&sort=created`);
                if(sales.data.data.length < 100){
                  ar = false;
                }
                page ++;
                allSales = await [...allSales, ...sales.data.data];
              }


                await res.status(200).send({ success: true, data: allSales.filter((ele, index) => {
                  return allSales.findIndex((val) => val['buyer'] == ele['buyer']) === index;
                }).sort((a, b):any => {
                  return a['buyer'] < b['buyer'] ? -1 : a['buyer'] > b['buyer'] ? 1 : 0;
                }).map((val) => val['buyer']) });
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
