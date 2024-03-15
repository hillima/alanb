import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import proton from '../../services/proton-rpc';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    method,
    body: { data: { templateId, page } }
  } = req;
  switch (method) {
    case 'POST':
        {
            try {
                let ar = true;
                let page = 1;
                let limit = 100;
                let allData = [];
                while(ar){
                  const result = await axios.get(`http://88.98.194.186:9000/atomicassets/v1/transfers?template_id=${templateId}&page=${page}&limit=${limit}`);
                  let newArr = result.data.data;               
                  allData = [...allData, ...newArr];

                  if(newArr.length < limit){
                    ar = false;
                  }
                  page++;
                }
                let newArr = allData;
                await Promise.all(
                  allData.map(async (item, index, arr) => {
                    item['price'] = '';
                    let dataFilter = newArr.filter((val) => val['txid'] == item['txid'] && val['recipient_name'] != item['recipient_name']);
                    if(0 < dataFilter.length){
                      if(item['recipient_name'] == 'atomicmarket'){
                        item['memo'] = 'Sale';
                        item['recipient_name'] = newArr[index - 1]['recipient_name'];
                        const response = await proton.getTransaction(item['txid']);
                        let nweaz = await response['traces'].filter(data => data['act']['data']['memo'] == 'deposit');
                        item['price'] = await nweaz[0]['act']['data']['quantity'];
                      }
                    }
                  })
                )
                await res.status(200).send({ success: true, data: [...allData] });
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
