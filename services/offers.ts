import { Asset } from './assets';
import { toQueryString } from '../utils';
import { getFromApi } from '../utils/browser-fetch';
import axios from 'axios';

export type Offer = {
  contract: string;
  offer_id: string;
  sender_name: string;
  recipient_name: string;
  memo: string;
  state: number;
  sender_assets: Asset[];
  recipient_assets: Asset[];
  is_sender_contract: boolean;
  is_recipient_contract: boolean;
  updated_at_block: string;
  updated_at_time: string;
  created_at_block: string;
  created_at_time: string;
};

/**
 * Get list of assets that user has listed for sale
 * @param sender The account name of the owner of the assets to look up
 * @returns {Offer[]}
 */

// export const getUserOffers = async (sender: string): Promise<Offer[]> => {
//   try {
//     const limit = 100;
//     let offers = [];
//     let hasResults = true;
//     let page = 1;

//     while (hasResults) {
//       const queryObject = {
//         sender,
//         state: '0', // Offer created and valid
//         page,
//         limit,
//       };
//       const queryParams = toQueryString(queryObject);
//       const result = await getFromApi<Offer[]>(
//         `${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicassets/v1/offers?${queryParams}`
//       );

//       if (!result.success) {
//         throw new Error((result.message as unknown) as string);
//       }

//       if (offers.length < limit) {
//         hasResults = false;
//       }

//       offers = offers.concat(result.data);
//       page += 1;
//     }

//     return offers;
//   } catch (e) {
//     throw new Error(e);
//   }
// };


export const getUserOffers = async (name): Promise<Offer[]> => {
  try {
    const result = await axios.post(`/api/user/offers`, {
      data: {
        name: name
      }
    });
    return result.data.data;

  } catch (e) {
    throw new Error(e);
  }
};




export const getBuyOffers = async (templateId: string): Promise<Offer[]> => {
  try {
    const limit = 100;
    let offers = [];
    let hasResults = true;
    let page = 1;

    while (hasResults) {
      const queryObject = {
        template_id: templateId,
        state: '0,1,2,3',
        page,
        limit,
      };
      const queryParams = toQueryString(queryObject);
      const result = await getFromApi<Offer[]>(
        `${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicmarket/v1/buyoffers?${queryParams}`
      );

      if (!result.success) {
        throw new Error((result.message as unknown) as string);
      }

      if (offers.length < limit) {
        hasResults = false;
      }

      offers = offers.concat(result.data);
      page += 1;
    }

    return offers;
  } catch (e) {
    throw new Error(e);
  }
};
