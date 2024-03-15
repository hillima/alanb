import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    method,
    body: { data: { userName } }
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
                  const result = await axios.get(`https://proton.api.atomicassets.io/atomicassets/v1/transfers?account=${userName}&page=${page}&limit=${limit}`);
                  let newArr = result.data.data;               
                  allData = [...allData, ...newArr];

                  if(newArr.length < limit){
                    ar = false;
                  }
                  page++;
                }
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
