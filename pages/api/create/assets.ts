import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { addPrecisionDecimal } from '../../../utils';

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
                const testlist = ['322142131552', '214142313334', 'turingprides', '441324344334'];
                const whiteApi = await axios.get(`${process.env.NEXT_PUBLIC_MY_URL}/api/data/whitelist`);
                const whiteList = whiteApi.data.data.whitelistName;
                const assets = await axios.get(`https://proton.api.atomicassets.io/atomicassets/v1/assets?authorized_account=${name}&owner=${name}&page=1&limit=100&order=desc&sort=name&collection_whitelist=${whiteList.join(',')}`);
                const sales = await axios.get(`https://proton.api.atomicassets.io/atomicmarket/v1/sales/templates?symbol=XPR&authorized_account=${name}&owner=${name}&page=1&limit=100&order=desc&sort=price&collection_whitelist=${whiteList.join(',')}`);

                let lowestPriceByTemplateIds = {};
                let floor = {};
                for (const sale of sales.data.data) {
                  const {
                    listing_price,
                    assets,
                    price: { token_precision },
                  } = sale;
            
                  if (!assets.length) {
                    continue;
                  }
            
                  const {
                    template: { template_id },
                  } = assets[0];
            
                  lowestPriceByTemplateIds[template_id] = `${addPrecisionDecimal(listing_price, token_precision, false)} XPR`;
                  floor[template_id] = parseInt(listing_price);
                }
                const newAssets = [];
                if(0 < assets.data.data.length){
                    for(let i = 0; i < whiteList.length; i++){
                        let newObj = {};
                        let total = 0;
                        let floorPrice = 0;
                        let filterData = await assets.data.data.filter((item) => item['collection']['collection_name'] == whiteList[i]);
                        let newData = await filterData.map(data => (
                          total += floor[data['template']['template_id']] || 0,
                          floorPrice = floor[data['template']['template_id']] < floorPrice ? floor[data['template']['template_id']] : floorPrice == 0 && 0 < floor[data['template']['template_id']] ? floor[data['template']['template_id']] : floorPrice,
                          {
                            ...data,
                            lowestPrice: lowestPriceByTemplateIds[data['template']['template_id']] || '',
                            floor: floor[data['template']['template_id']] || 0
                          }
                        ));

                        if(0 < filterData.length){
                          newObj['assets'] = await newData;
                          newObj['total'] = await total;
                          newObj['floor'] = await floorPrice;
                          await newAssets.push(newObj);
                        }
                    }
                    await res.status(200).send({ success: true, data: [...newAssets] });
                }else{
                    await res.status(200).send({ success: true, data: [] });
                }
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
