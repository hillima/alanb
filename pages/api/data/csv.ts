import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import {ExplorerApi} from "atomicassets"
import { addPrecisionDecimal } from '../../../utils';
import proton from '../../../services/proton-rpc';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    method,
    body: { data: { collectionName, name } }
  } = req;
  
  switch (method) {
    case 'POST':
        {
            try {
                const api = new ExplorerApi("http://88.98.194.186:9000", "atomicassets", { fetch });
                let owners = await api.countAccounts({ collection_name: collectionName });
                let total = await axios.get(`https://proton.api.atomicassets.io/atomicassets/v1/collections/${collectionName}/stats`);
                let xprvolume = await axios.get(`https://proton.api.atomicassets.io/atomicmarket/v1/stats/collections/${collectionName}?symbol=XPR`);
                let usdVolume = await axios.get(`http://88.98.194.186:9000/atomicmarket/v1/stats/collections/${collectionName}?symbol=XUSDC`);
                let floor = await axios.get(`http://88.98.194.186:9000/atomicmarket/v1/sales/templates?symbol=XPR&collection_name=${collectionName}&page=1&limit=1&order=asc&sort=price`);
                let highSales = await axios.get(`http://88.98.194.186:9000/atomicmarket/v2/sales?state=3&symbol=XPR&collection_name=${collectionName}&order=desc&sort=price`);
                let highAuctions = await axios.get(`http://88.98.194.186:9000/atomicmarket/v1/auctions?state=3&symbol=XPR&collection_name=${collectionName}&order=desc&sort=price`);
                let highBuyOffers = await axios.get(`http://88.98.194.186:9000/atomicmarket/v1/buyoffers?state=3&symbol=XPR&collection_name=${collectionName}&order=desc&sort=price`);
                let rate = await proton.getXPRrate();
                let usdXpr = await Math.floor((parseInt(addPrecisionDecimal(usdVolume.data.data.result.volume, 6, true)) / rate)) * 10000;
                let ar = true;
                let page = 1;
                let listedXPRArr = [];
                while(ar){
                  let listedXPR = await axios.get(`http://88.98.194.186:9000/atomicmarket/v2/sales?state=1&page=${page}&limit=100&order=desc&sort=created&symbol=XPR&collection_name=${collectionName}`);
                  listedXPRArr = [...listedXPRArr, ...listedXPR.data.data];
                  page++;
                  if(listedXPR.data.data.length < 100){
                    ar = false;
                  }
                }
                let highData = await highSales.data.data.length == 0 ? '0' : `${addPrecisionDecimal(highSales.data.data[0]['listing_price'], 4, false)} XPR`;

                if(0 < highAuctions.data.data.length){
                  highData = parseInt(highSales.data.data[0]['listing_price']) < parseInt(highAuctions.data.data[0]['price']['amount']) 
                  ? `${addPrecisionDecimal(highAuctions.data.data[0]['price']['amount'], 4, false)} XPR` : highData;
                }
                if(0 < highBuyOffers.data.data.length){
                  highData = parseInt(highData) < parseInt(highBuyOffers.data.data[0]['price']['amount']) 
                  ? `${addPrecisionDecimal(highBuyOffers.data.data[0]['price']['amount'], 4, false)} XPR` : highData;
                }

                let newData = await [
                    ['collection_id', 'collection_name', 'owner_count', 'floor_price', 
                    'total_supply', 'total_listed(XPR)', 'xpr_volume', 
                    'xpr_sales', 'highest_sale_price'],
                    [collectionName, name, owners, floor.data.data.length == 0 ? "0" : `${addPrecisionDecimal(floor.data.data[0]['price']['amount'], 4, false)} XPR`, 
                    total.data.data.assets - total.data.data.burned, listedXPRArr.length, xprvolume.data.data.result.volume == null ? 0 : `${addPrecisionDecimal(String(parseInt(xprvolume.data.data.result.volume) + usdXpr), 4, false)} XPR`,
                    xprvolume.data.data.result.sales, highData]
                ]
            
                await res.status(200).send({ success: true, data: newData });
                
                } catch (e) {
                  console.log(e);
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
