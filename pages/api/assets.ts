import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { addPrecisionDecimal } from '../../utils';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    method,
    body: { data: { user } }
  } = req;
  switch (method) {
    case 'POST':
        {
            try {
                const whiteApi = await axios.get(`${process.env.NEXT_PUBLIC_MY_URL}/api/data/whitelist`);
                const whiteList = whiteApi.data.data.whitelistName;
                let ar = true;
                let sr = true;
                let allAssets = [];
                let allSales = [];
                let assetsPage = 1;
                let salesPage = 1;
                while(ar){
                  const assets = await axios.get(`http://88.98.194.186:9000/atomicassets/v1/assets?owner=${user}&page=${assetsPage}&limit=100&order=desc&sort=name&collection_whitelist=${whiteList.join(',')}`);
                  if(assets.data.data.length < 100){
                    ar = false;
                  }
                  await assetsPage ++;
                  allAssets = await [...allAssets, ...assets.data.data];
                }

                while(sr){
                  const sales = await axios.get(`http://88.98.194.186:9000/atomicmarket/v1/sales/templates?symbol=XPR&owner=${user}&page=${salesPage}&limit=100&order=desc&sort=price&collection_whitelist=${whiteList.join(',')}`);
                  if(sales.data.data.length < 100){
                    sr = false;
                  }
                  salesPage ++;
                  allSales = [...allSales, ...sales.data.data];
                }
                const newAssets = [];
                if(0 < allAssets.length){
                    for(let i = 0; i < whiteList.length; i++){
                        let newObj = {
                          assets: [],
                          floor: 0,
                          total: 0
                        };
                        let filterData = await allAssets.filter((item) => item['collection']['collection_name'] == whiteList[i]);
                        if(0 < filterData.length){
                          newObj['assets'] = await filterData;
                          await newAssets.push(newObj);
                        }
                    }
                    await Promise.all(newAssets.map(async (it) => {
                      let floor = await fetch(`http://88.98.194.186:9000/atomicmarket/v1/sales/templates?symbol=XPR&collection_name=${it['assets'][0]['collection']['collection_name']}&page=1&limit=1&order=asc&sort=price`).then(res => res.json());
                      it['floor'] = await floor.data.length == 0 ? 0 : addPrecisionDecimal(floor.data[0]['price']['amount'], 4, false);
                      it['total'] = await floor.data.length == 0 ? 0 : addPrecisionDecimal(String(parseInt(floor.data[0]['price']['amount']) * it['assets'].length), 4, false);
                    }));

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
