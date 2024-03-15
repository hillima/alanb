import { Asset } from './assets';
import { Collection } from './collections';
import { getFromApi } from '../utils/browser-fetch';
import { toQueryString, addPrecisionDecimal } from '../utils';
import { TOKEN_SYMBOL, PAGINATION_LIMIT } from '../utils/constants';
import proton from './proton-rpc';
import axios from 'axios';
type Price = {
  token_contract: string;
  token_symbol: string;
  token_precision: number;
  median: number | null;
  amount: number;
};

export type SaleAsset = {
  saleId: string;
  assetId: string;
  templateMint: string;
  salePrice: string;
};

export type Sale = {
  market_contract: string;
  assets_contract: string;
  sale_id: string;
  seller: string;
  buyer: string;
  offer_id: string;
  price: Price;
  listing_price: string;
  listing_symbol: string;
  assets: Asset[];
  collection_name: string;
  collection: Collection;
  maker_marketplace: string;
  taker_marketplace: string;
  is_seller_contract: boolean;
  updated_at_block: string;
  updated_at_time: string;
  created_at_block: string;
  created_at_time: string;
  state: number;
  asset_serial: string;
};

export type SaleAssetRecord = {
  rawPrices: {
    [templateMint: string]: string;
  };
  formattedPrices: {
    [templateMint: string]: string;
  };
  assets: SaleAsset[];
};

/**
 * Get the fulfilled sales for a specific templates (sales that were successful)
 * Mostly used in viewing sales history of a specific template
 * @param {string} templateId The template id of the history you want to look up
 * @param {number} page       The page to look up from atomicassets api if number of assets returned is greater than given limit (API defaults to a limit of 100)
 * @return {Sales[]}          Returns an array of Sales for that specific template id
 */

export const getSalesHistoryForTemplate = async (
  templateId: string,
  page?: number
): Promise<Sale[]> => {
  try {
    const pageParam = page ? page : 1;
    const queryObject = {
      template_id: templateId,
      page: pageParam,
      limit: PAGINATION_LIMIT,
      symbol: 'XPR'
    };
    const queryString = toQueryString(queryObject);
    const latestSalesRes = await getFromApi<Sale[]>(
      `${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicmarket/v1/sales/templates?${queryString}`
    );

    if (!latestSalesRes.success) {
      throw new Error((latestSalesRes.message as unknown) as string);
    }

    return latestSalesRes.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const getActivities = async (
  templateId: string,
  page?: number
): Promise<Sale[]> => {
  try {
    const activities = await axios.post(`/api/activity`, {
      data: {
        templateId: templateId
      }
    })

    return activities.data.data;
  } catch (e) {
    throw new Error(e);
  }
};


/**
 * Get the fulfilled sales for a specific asset (sales that were successful)
 * Mostly used in viewing sales history of a specific asset
 * @param {string} assetId The asset id of the history you want to look up
 * @param {number} page    The page to look up from atomicassets api if number of assets returned is greater than given limit (API defaults to a limit of 100)
 * @return {Sales[]}       Returns an array of Sales for that specific template id
 */

export const getSalesHistoryForAsset = async (
  assetId: string,
  page?: number
): Promise<Sale[]> => {
  try {
    const pageParam = page ? page : 1;
    const queryObject = {
      state: '3', // Valid sale, Sale was bought
      asset_id: assetId,
      sort: 'updated',
      order: 'desc',
      page: pageParam,
      limit: PAGINATION_LIMIT,
    };
    const queryString = toQueryString(queryObject);
    const latestSalesRes = await getFromApi<Sale[]>(
      `${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicmarket/v2/sales?${queryString}`
    );

    if (!latestSalesRes.success) {
      throw new Error((latestSalesRes.message as unknown) as string);
    }

    return latestSalesRes.data;
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Get the unfulfilled sale for a specific asset
 * @param assetId Id of the asset listed for sale
 * @param seller  Owner of the asset listed for sale
 * @returns {SaleAsset[]}
 */

export const getAssetSale = async (
  assetId: string,
  seller?: string
): Promise<Sale[]> => {
  try {
    const queryObject = {
      asset_id: assetId,
      state: '1', // assets listed for sale
      seller: seller ? seller : '',
    };

    const queryString = toQueryString(queryObject);

    const result = await getFromApi<Sale[]>(
      `${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicmarket/v2/sales?${queryString}`
    );

    if (!result.success) {
      throw new Error((result.message as unknown) as string);
    }

    return result.data;
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Get the unfulfilled sales for a specific template
 * Mostly used in purchasing an asset of a specific template
 * @param  {string} templateId     The template id of an asset you want to purchase
 * @return {SaleAssetRecord}       Returns a SaleAssetRecord including a record of prices by sale ID and an array of assets for sale
 */

export const getAllTemplateSales = async (
  templateId: string,
  owner?: string
): Promise<SaleAssetRecord> => {
  try {
    const limit = 100;
    let sales = [];
    let hasResults = true;
    let page = 1;

    while (hasResults) {
      const queryObject = {
        state: '1',
        sort: 'template_mint',
        order: 'asc',
        template_id: templateId,
        page,
        owner: owner || '',
        symbol: 'XPR',
        limit,
      };
      const queryParams = toQueryString(queryObject);
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicmarket/v2/sales?${queryParams}`, {cache: 'no-store'}
      ).then(res => res.json());


      if (!result.success) {
        throw new Error((result.message as unknown) as string);
      }
      if (result.data.length < limit) {
        hasResults = false;
      }
      sales = sales.concat(result.data);
      page += 1;
    }

    let saleAssets = [];
    const pricesBySaleId = {};
    const pricesBySaleIdRaw = {};
    for (const sale of sales) {
      const {
        assets,
        listing_price,
        listing_symbol,
        sale_id,
        seller,
        price: { token_precision },
      } = sale;
      const salePrice = `${addPrecisionDecimal(
        listing_price,
        token_precision
      )} ${listing_symbol}`;
      const rate = await proton.getXPRrate();
      const xpr = await addPrecisionDecimal(listing_price, token_precision, true);
      const dollar = await (parseInt(xpr) * rate).toFixed(2);
      const rawListingPrice = `${addPrecisionDecimal(
        listing_price,
        token_precision,
        true
      )} ${listing_symbol}`;
      pricesBySaleId[sale_id] = salePrice;
      pricesBySaleIdRaw[sale_id] = rawListingPrice;
      let formattedAssets;
      if(1 < assets.length){
        formattedAssets = {
          saleId: sale_id,
          templateMint: assets.map((asset, index) => index == assets.length - 1 ? `${asset['template_mint']}` : `${asset['template_mint']},`),
          listingPrice: listing_price,
          salePrice,
          assetId: assets[0]['asset_id'],
          assetIds: assets.map((asset) => asset['asset_id']),
          dollar: dollar,
          assetCount: assets.length,
          seller
        };
      }else {
        formattedAssets = {
            saleId: sale_id,
            templateMint: assets[0]['template_mint'],
            listingPrice: listing_price,
            salePrice,
            assetId: assets[0]['asset_id'],
            dollar: dollar,
            assetCount: assets.length,
            seller
        };
      }
      saleAssets = saleAssets.concat(formattedAssets);
    }

    return {
      formattedPrices: pricesBySaleId,
      rawPrices: pricesBySaleIdRaw,
      assets: saleAssets
    };
  } catch (e) {
    throw new Error(e);
  }
};

export const getLowestPriceAsset = async (
  collection: string,
  templateId: string
): Promise<Sale[]> => {
  try {
    const queryObject = {
      collection_name: collection,
      template_id: templateId,
      sort: 'price',
      order: 'asc',
      state: '1', // assets listed for sale
      limit: '1',
      symbol: 'XPR',
    };
    const queryString = toQueryString(queryObject);

    const saleRes = await getFromApi<Sale[]>(
      `${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicmarket/v2/sales?${queryString}`
    );

    const xprObject = {
      collection_name: collection,
      template_id: templateId,
      sort: 'price',
      order: 'asc',
      state: '1', // assets listed for sale
      limit: '1',
      symbol: 'XPR',
    };
    const xprString = toQueryString(xprObject);

    const xprRes = await getFromApi<Sale[]>(
      `${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicmarket/v2/sales?${xprString}`
    );

    if (!saleRes.success || !xprRes.success) {
      throw new Error((saleRes.message as unknown) as string);
    }
  
    return saleRes.data.concat(xprRes.data);
  } catch (e) {
    throw new Error(e);
  }
};



export const getLowestPriceOwnerAsset = async (
  collection: string,
  owner: string
): Promise<Sale[]> => {
  try {
    const queryObject = {
      collection_name: collection,
      sort: 'price',
      order: 'asc',
      state: '1', // assets listed for sale
      limit: '100',
      symbol: 'XPR',
      owner: owner
    };
    const queryString = toQueryString(queryObject);

    const saleRes = await getFromApi<Sale[]>(
      `${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicmarket/v2/sales?${queryString}`);

    if (!saleRes.success) {
      throw new Error((saleRes.message as unknown) as string);
    }
    return saleRes.data;
  } catch (e) {
    throw new Error(e);
  }
};


 export const getRecentSales = async ({ limit }): Promise<Sale[]> => {
  try {
    const result = await axios.post(
      `/api/sales`,
      {
        data: {
          limit: limit
        }
      }
    );
    return result.data.data;
  } catch (e) {
    throw new Error(e);
  }
};
