import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

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
                const whiteApi = await axios.get(`${process.env.NEXT_PUBLIC_MY_URL}/api/data/whitelist`);
                const whiteList = whiteApi.data.data.whitelistName;
                let hasAssets = true;
                let page = 1;
                let newArr = [];
                let collections = [];
                let newAssets = [];
                while(hasAssets){
                  let assets = await axios.get(`https://proton.api.atomicassets.io/atomicassets/v1/assets?owner=${name}&authorized_account=${name}&page=${page}&limit=100&order=desc&sort=name&collection_blacklist=${whiteList.join(',')}`);
                  assets.data.data.map((it) => {
                    if(collections.indexOf(it['collection']['collection_name']) < 0){
                      collections.push(it['collection']['collection_name']);
                    }
                  })
                  newArr = [...newArr, ...assets.data.data];
                  page++;
                  if(assets.data.data.length < 100){
                    hasAssets = false;
                  }
                }
                
                for(let i = 0; i < collections.length; i++){
                  let newObj = {};
                  let filterData = await newArr.filter((item) => item['collection']['collection_name'] == collections[i]);
                  
                  if(0 < filterData.length){
                    newObj['assets'] = await filterData;
                    await newAssets.push(newObj);
                  }
                }

                await res.status(200).send({ success: true, data: newAssets });

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
