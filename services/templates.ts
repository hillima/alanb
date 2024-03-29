import { getFromApi } from '../utils/browser-fetch';
import { Sale, getLowestPriceAsset, getLowestPriceOwnerAsset } from './sales';
import { addPrecisionDecimal, toQueryString } from '../utils/';
import { TOKEN_SYMBOL, PAGINATION_LIMIT } from '../utils/constants';
import { Collection } from './collections';

export type SchemaFormat = {
  name: string;
  type: string;
};

export type Schema = {
  schema_name: string;
  format: SchemaFormat[];
  created_at_block: string;
  created_at_time: string;
};

type ImmutableData = {
  name: string;
  glbthumb?: string;
  image?: string;
  series: number;
  desc: string;
  video?: string;
  model?: string;
  stage?: string;
  skybox?: string;
};

export interface Template {
  data?: ImmutableData;
  immutable_data?: ImmutableData;
  template_id?: string;
  contract?: string;
  collection?: Collection;
  schema?: Schema;
  name?: string;
  max_supply?: string;
  is_transferable?: boolean;
  is_burnable?: boolean;
  created_at_time?: string;
  created_at_block?: string;
  issued_supply?: string;
  lowestPrice?: string;
  totalAssets?: string;
  assetsForSale?: string;
  template?: Template;
  listing_price?: string;
}

type GetCollectionOptions = {
  keyword?: string;
  type?: string;
  limit?: number;
  page?: number;
  minValue?: number;
  maxValue?: number;
};

export type Account = {
  assets: number;
  collections: Array<{
    collection: { collection_name: string };
  }>;
  templates: {
    assets: string;
    collection_name: string;
    template_id: string;
  }[];
};

type formatTemplatesWithLowPriceAndAssetCountProps = {
  templateIds: string[];
  templates: Template[];
  assetCountById: {
    [templateId: string]: string;
  };
  assetCountByIdWithHidden: {
    [templateId: string]: string;
  };
};

/**
 * Get a specific template detail
 * Mostly used in viewing a specific template's detail page
 * @param  {string} collectionName   The name of the collection the template belongs in
 * @param  {string} templateId       The specific template id number you need to look up details for
 * @return {Template[]}              Returns array of templates, most likely will only return one item in the array
 */

export const getTemplateDetails = async (
  collectionName: string,
  templateId: string
): Promise<Template> => {
  try {
    const templatesQueryObject = {
      collection_name: collectionName,
      ids: templateId,
      page: 1,
      limit: 1,
    };

    const templatesQueryParams = toQueryString(templatesQueryObject);
    const templatesResponse = await getFromApi<Template[]>(
      `${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicassets/v1/templates?${templatesQueryParams}`
    );

    if (!templatesResponse.success || !templatesResponse.data.length) {
      throw new Error('NFT not found');
    }

    const saleForTemplateAsc = await getLowestPriceAsset(
      collectionName,
      templateId
    );
    const lowestPriceSale = saleForTemplateAsc[0];
    const lowestPrice =
      lowestPriceSale && lowestPriceSale.listing_price
        ? `${addPrecisionDecimal(
            lowestPriceSale.listing_price,
            lowestPriceSale.price.token_precision
          )} ${lowestPriceSale.listing_symbol}`
        : '';

    return {
      ...templatesResponse.data[0],
      lowestPrice,
    };
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Get a list of templates within a collection by page
 * Mostly used in viewing all the templates of a collection (i.e. in the homepage or after searching for one collection)
 * @param  {string} type         The name of the collection
 * @param  {string} page         Page number of results to return (defaults to 1)
 * @return {Template[]}          Returns array of templates in that collection
 */

 export const getTemplatesByCollection = async ({
  type,
  page,
}: GetCollectionOptions): Promise<Template[]> => {
  try {
    const templatesQueryObject = {
      collection_name: type,
      page: page || 1,
      limit: PAGINATION_LIMIT,
      has_assets: true,
    };

    const templatesQueryParams = toQueryString(templatesQueryObject);
    const templatesResponse = await getFromApi<Template[]>(
      `${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicassets/v1/templates?${templatesQueryParams}`
    );

    if (!templatesResponse.success) {
      const errorMessage =
        typeof templatesResponse.error === 'object'
          ? templatesResponse.error.message
          : templatesResponse.message;
      throw new Error(errorMessage as string);
    }

    return templatesResponse.data;
  } catch (e) {
    throw new Error(e);
  }
};


export const getLastestTemplatesByCollection = async ({
  page,
}: GetCollectionOptions): Promise<Template[]> => {
  try {
    const templatesQueryObject = {
      page: page || 1,
      limit: PAGINATION_LIMIT,
      has_assets: true
    };
    const templatesQueryParams = toQueryString(templatesQueryObject);
    const templatesResponse = await getFromApi<Template[]>(
      `${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicassets/v1/templates?template_data.marketplace=digitalgalaxy&${templatesQueryParams}`
    );
    // for(let i = 0; i < templatesResponse.data.length; i++){
    //   try{
    //     const prices = await getFromApi<any>(`${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicmarket/v1/sales/templates?symbol=XUSDC&template_id=${templatesResponse.data[i].template_id}`);
    //     console.log(prices);
    //     if(prices.data.length === 0){
    //       const xprPrices = await getFromApi<any>(`${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicmarket/v1/sales/templates?symbol=XPR&template_id=${templatesResponse.data[i].template_id}`);
    //       templatesResponse.data[i]['xprPrice'] = await xprPrices.data[0].listing_price;
    //       templatesResponse.data[i]['tokenSymbol'] = await xprPrices.data[0].listing_symbol;
    //     }else{
    //       templatesResponse.data[i]['minPrice'] = await prices.data[0].listing_price;
    //       templatesResponse.data[i]['tokenSymbol'] = await prices.data[0].listing_symbol;
    //     }
    //   }catch(e){
    //   }
    // }
    if (!templatesResponse.success) {
      const errorMessage =
        typeof templatesResponse.error === 'object'
          ? templatesResponse.error.message
          : templatesResponse.message;
      throw new Error(errorMessage as string);
    }

    return templatesResponse.data;
  } catch (e) {
    throw new Error(e);
  }
};


export const getTrading = async ({
  page,
}: GetCollectionOptions): Promise<Template[]> => {
  try {
    const templatesQueryObject = {
      page: page || 1,
      limit: 100,
      order: 'desc',
      sort: 'updated'
    };

    const templatesQueryParams = toQueryString(templatesQueryObject);
    const templatesResponse = await getFromApi<Template[]>(
      `${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicmarket/v2/sales?state=3&template_data.marketplace=digitalgalaxy&${templatesQueryParams}`
    );
    if (!templatesResponse.success) {
      const errorMessage =
        typeof templatesResponse.error === 'object'
          ? templatesResponse.error.message
          : templatesResponse.message;
      throw new Error(errorMessage as string);
    }

    return templatesResponse.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const getGlbCollections = async (): Promise<any> => {
  try {
    const templatesQueryObject = {
    };

    const templatesQueryParams = toQueryString(templatesQueryObject);
    const templatesResponse = await getFromApi<Template[]>(
      `${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicassets/v1/templates?has_assets=true&template_data.marketplace=digitalgalaxy&${templatesQueryParams}`
    );

    if (!templatesResponse.success) {
      const errorMessage =
        typeof templatesResponse.error === 'object'
          ? templatesResponse.error.message
          : templatesResponse.message;
      throw new Error(errorMessage as string);
    }
    let newCol = [];
    await templatesResponse.data.map((item, index) => {
      if(newCol.indexOf(item.collection.collection_name) == -1){
        newCol.push(item.collection.collection_name);
      };
    });
    const collectionsResponse = await getFromApi<Template[]>(
      `${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicassets/v1/collections?collection_whitelist=${newCol.join(',')}`
    );
    return collectionsResponse.data;
  } catch (e) {
    throw new Error(e);
  }
};


export const getTemplatesSearchByCollection = async ({
  keyword,
  page,
}: GetCollectionOptions): Promise<Template[]> => {
  try {
    let page = 1;
    let ar = true;
    let templates = [];
    while(ar){
      const templatesQueryObject = {
        keyword: keyword,
        page: page
      };
  
      const templatesQueryParams = toQueryString(templatesQueryObject);
      const templatesResponse = await getFromApi<Template[]>(
        `/api/template/search?${templatesQueryParams}`
      );
  
      if (!templatesResponse.success) {
        const errorMessage =
          typeof templatesResponse.error === 'object'
            ? templatesResponse.error.message
            : templatesResponse.message;
        throw new Error(errorMessage as string);
      }

      if(templatesResponse.data.length == 0 || templatesResponse.data.length < 100){
        ar = false;
      }
      page ++;
      templates = [...templates, ...templatesResponse.data];
    }
    return templates;
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Get all templates within a collection
 * @param {string} type       The name of the collection
 * @param {number} limit      Max number of templates to return
 * @returns {Template[]}      Returns arrray of all templates in that collection
 */

export const getAllTemplatesByCollection = async ({
  type,
  limit = 100,
}: GetCollectionOptions): Promise<Template[]> => {
  try {
    let templates = [];
    let page = 1;
    let hasResults = true;

    while (hasResults) {
      const templatesQueryObject = {
        collection_name: type,
        limit,
        page,
        has_assets: true,
      };

      const templatesQueryParams = toQueryString(templatesQueryObject);
      const templatesResponse = await getFromApi<Template[]>(
        `${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicassets/v1/templates?${templatesQueryParams}`
      );

      if (!templatesResponse.success) {
        const errorMessage =
          typeof templatesResponse.error === 'object'
            ? templatesResponse.error.message
            : templatesResponse.message;
        throw new Error(errorMessage as string);
      }

      if (templatesResponse.data.length < limit || limit !== 100) {
        hasResults = false;
      }

      templates = templates.concat(templatesResponse.data);
      page += 1;
    }

    return templates;
  } catch (e) {
    throw new Error(e);
  }
};


export const getSaleTemplatesByCollection = async ({
  type,
  limit = 100,
  minValue = 0,
  maxValue = 0
}: GetCollectionOptions): Promise<Template[]> => {
  try {
    let templates = [];
    const limit = 100;
    let page = 1;
    let hasResults = true;
  
    while (hasResults) {
      const xprQueryObject = {
        collection_name: type,
        symbol: 'XPR',
        order: 'desc',
        limit,
        page,
        min_price: minValue,
        max_price: maxValue
      };

      const templatesQueryParams = toQueryString(xprQueryObject);
      const xprResult = await getFromApi<Sale[]>(
        `${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicmarket/v1/sales/templates?${templatesQueryParams}`
      );


      if (!xprResult.success) {
        const errorMessage =
          typeof xprResult.error === 'object'
            ? xprResult.error.message
            : xprResult.message;
        throw new Error(errorMessage as string);
      }

      if (xprResult.data.length < limit || limit !== 100) {
        hasResults = false;
      }
      let newArr = xprResult.data;
      for(let i = 0; i < xprResult.data.length; i++){
        newArr[i]['template_id'] = newArr[i]['assets'][0]['template']['template_id'];
        newArr[i]['immutable_data'] = newArr[i]['assets'][0]['immutable_data'];
        newArr[i]['data'] = newArr[i]['assets'][0]['data'];
        newArr[i]['name'] = newArr[i]['assets'][0]['name'];
        newArr[i]['lowestPrice'] = `${addPrecisionDecimal(newArr[i]['listing_price'],4)} XPR`
      }
      templates = templates.concat(newArr);
      page += 1;
    }
    return templates;
  } catch (e) {
    throw new Error(e);
  }
};
/**
 * Gets the lowest price of assets for sale for a collection's templates
 * Mostly used to display the lowest price of any of the templates with assets for sale in the collection
 * @param  {string} type               Name of collection that templates belong to
 * @return {Template[]}                Returns array of templates with an additional 'lowestPrice' flag
 */

export const getLowestPricesForAllCollectionTemplates = async ({
  type,
}: {
  type: string;
}): Promise<{ [id: string]: string }> => {
  const limit = 100;
  const lowestPriceByTemplateIds = {};
  let page = 1;
  let hasResults = true;

  while (hasResults) {
    const xprQueryObject = {
      collection_name: type,
      symbol: 'XPR',
      order: 'desc',
      limit,
      page,
    };

    const xprQueryParams = toQueryString(xprQueryObject);
    const xprResult = await getFromApi<Sale[]>(
      `${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicmarket/v1/sales/templates?${xprQueryParams}`
    );

    if (!xprResult.success) {
      const errorMessage =
        typeof xprResult.error === 'object'
          ? xprResult.error.message
          : xprResult.message;
      throw new Error(errorMessage as string);
    }

    for (const sale of xprResult.data) {
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

      lowestPriceByTemplateIds[template_id] = listing_price
        ? `${addPrecisionDecimal(
            listing_price,
            token_precision
          )} XPR`
        : '';
    }

    if (xprResult.data.length < limit) {
      hasResults = false;
    }

    page += 1;
  }

  return lowestPriceByTemplateIds;
};


export const getLowestPricesForAllSearchTemplates = async ({
  templateId,
}: {
  templateId: string;
}): Promise<any> => {
  const limit = 100;
  let lowestPrice = '';
  let page = 1;

    const xprQueryObject = {
      template_id: templateId,
      symbol: 'XPR',
      order: 'desc',
      limit,
      page,
    };

    const xprQueryParams = toQueryString(xprQueryObject);
    const xprResult = await getFromApi<Sale[]>(
      `${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicmarket/v1/sales/templates?${xprQueryParams}`
    );

    if (!xprResult.success) {
      const errorMessage =
        typeof xprResult.error === 'object'
          ? xprResult.error.message
          : xprResult.message;
      throw new Error(errorMessage as string);
    }

    for (const sale of xprResult.data) {
      const {
        listing_price,
        assets,
        price: { token_precision },
      } = sale;

      if (!assets.length) {
        continue;
      }
      lowestPrice = listing_price
        ? `${addPrecisionDecimal(
            listing_price,
            token_precision
          )} XPR`
        : '';
    }



  return lowestPrice;
};

/**
 * Formats an array of templates with a custom 'lowestPrice' flag
 * Mostly used to display the lowest price of any of the templates with assets for sale in the collection
 * @param  {string} templates         Array of templates to format
 * @param  {string} lowestPrices      Object of a collection's lowest priced assets organized by template ID
 * @return {Template[]}               Returns array of templates with an additional 'lowestPrice' flag
 */

export const formatTemplatesWithPriceData = (
  templates: Template[],
  lowestPrices: { [id: string]: string }
): Template[] =>
  templates.map((template) => ({
    ...template,
    lowestPrice: lowestPrices[template.template_id] || '',
  }));


export const formatSearchTemplatesWithPriceData = async (
    templates : Template[]
  ): Promise<any> =>
  await Promise.all(
    templates.map(async (template) => {
      let price = await getLowestPricesForAllSearchTemplates({templateId: template.template_id});
      return {
        ...template,
        lowestPrice: price || '',
      }
    })
  );
/***
 * Function returns templates with the following added keys: (used primarily for diaplying user's owned assets in My NFT page)
 *    totalAssets: Total number of assets owned by 'owner'
 *    assetsForSale: Number of assets for sale by 'owner'
 *    lowestPrice: Lowest price of an asset for sale in marketplace
 * @param {string} owner Owner of assets to look up
 * @param {number} page  Reference for pagination if number of template categories (based on owned assets) is greater than number of templates displayed per page
 * @return {Template[]}
 */

export const getAllTemplatesForUserWithAssetCount = async (
  owner: string
): Promise<{
  templates: Template[];
  collectionNames: string[];
}> => {
  try {
    const accountResponse = await getFromApi<Account>(
      `${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicassets/v1/accounts/${owner}`
    );

    if (!accountResponse.success) {
      throw new Error((accountResponse.message as unknown) as string);
    }

    const accountResponseWithHidden = await getFromApi<Account>(
      `${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicassets/v1/accounts/${owner}?hide_offers=true`
    );

    if (!accountResponseWithHidden.success) {
      throw new Error((accountResponseWithHidden.message as unknown) as string);
    }

    const userAssetsByTemplateId = {};
    accountResponse.data.templates.map(({ assets, template_id }) => {
      userAssetsByTemplateId[template_id] = assets;
    });

    const userAssetsWithHiddenByTemplateId = {};
    accountResponseWithHidden.data.templates.map(({ assets, template_id }) => {
      userAssetsWithHiddenByTemplateId[template_id] = assets;
    });

    const templateIds = accountResponse.data.templates.map(
      ({ template_id }) => template_id
    );
    
    if (!templateIds.length) {
      return {
        templates: [],
        collectionNames: [],
      };
    }

    const templates = await getTemplatesFromTemplateIds(templateIds);

    const templatesWithAssetsForSaleCount = formatTemplatesWithPriceAndAssetCountInCreateDescOrder(
      {
        templateIds: templateIds,
        templates: templates,
        assetCountById: userAssetsByTemplateId,
        assetCountByIdWithHidden: userAssetsWithHiddenByTemplateId,
      }
    );

    const collectionNames = Array.from(
      new Set([
        ...accountResponse.data.collections.map(
          ({ collection }) => collection.collection_name
        ),
        ...accountResponseWithHidden.data.collections.map(
          ({ collection }) => collection.collection_name
        ),
      ])
    );


    return {
      templates: templatesWithAssetsForSaleCount,
      collectionNames,
    };
  } catch (e) {
    throw new Error(e);
  }
};

export const getLowestPricesByTemplateId = async (
  collectionNames: string[]
): Promise<{ [templateId: string]: string }> => {
  let lowestPricesByTemplateId = {};

  const promises = collectionNames.map(async (collection_name: string) => {
    const lowestPricesForCollection = await getLowestPricesForAllCollectionTemplates(
      {
        type: collection_name,
      }
    );

    lowestPricesByTemplateId = {
      ...lowestPricesByTemplateId,
      ...lowestPricesForCollection,
    };
  });
  await Promise.all(promises);

  return lowestPricesByTemplateId;
};

/**
 * Function to add total asset count, assets for sale, and lowest price to template data for each template
 * Used in conjunction with function getAllTemplatesForUserWithAssetCount
 * @param templateIds list of templateIds of templates to add data to
 * @param templates   templates of the template Ids listed in templateIds param
 * @param assetCountById  total number of assets for each template that user owns
 * @param assetCountByIdWithHidden  total number of assets for each template that user owns minus those currently offered for sale
 * @param lowPriceById  lowest price of asset currently on offer for each template
 * @returns {Template[]}
 */

const formatTemplatesWithPriceAndAssetCountInCreateDescOrder = ({
  templateIds,
  templates,
  assetCountById,
  assetCountByIdWithHidden,
}: formatTemplatesWithLowPriceAndAssetCountProps) => {
  const templatesWithAssetsForSaleCount = templateIds
    .reduce((acc, templateId) => {
      const template = templates.find(
        ({ template_id }) => templateId == template_id
      );

      if (template) {
        template.totalAssets = `${assetCountById[templateId]}`;
        const assetsForSale =
          parseInt(assetCountById[templateId]) -
          parseInt(assetCountByIdWithHidden[templateId] || '0');

        template.assetsForSale = `${assetsForSale}`;
        
        if(0 < assetsForSale){
          acc.push(template);
        }
      }

      return acc;
    }, [])
    .sort((a, b) => Number(b.created_at_time) - Number(a.created_at_time));

  return templatesWithAssetsForSaleCount;
};

/**
 * Function to get templates using an array of tempalte ids as reference
 * @param templateIds templatesIds to grab templates for
 * @returns {Template[]}
 */

export const getTemplatesFromTemplateIds = async (
  templateIds: string[]
): Promise<Template[]> => {
  // Organize pagination with an object (key: page number, value: array of templateIds)
  const pages: { [page: number]: string[] } = {};
  for (let i = 0; i <= Math.ceil(templateIds.length / 100) - 1; i++) {
    const startIdx = i * 100;
    const endIdx = (i + 1) * 100;
    pages[i + 1] = templateIds.slice(startIdx, endIdx);
  }
  let templates = [];
  let page = 1;
  let hasResults = true;

  while (hasResults) {
    try {
      const templatesQueryObject = {
        ids: pages[page].join(','),
        has_assets: true,
      };

      const templatesQueryParams = toQueryString(templatesQueryObject);
      const templatesResponse = await getFromApi<Template[]>(
        `${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicassets/v1/templates?${templatesQueryParams}`
      );

      if (!templatesResponse.success) {
        throw new Error((templatesResponse.message as unknown) as string);
      }

      if (!pages[page + 1]) {
        hasResults = false;
      }

      page += 1;
      templates = templates.concat(templatesResponse.data);
    } catch (e) {
      throw new Error(e);
    }
  }

  return templates;
};

export const getPaginatedCreationsByCreator = async ({
  chainAccount,
  showZeroMints,
  page,
}: {
  chainAccount: string;
  showZeroMints: boolean;
  page?: number;
}): Promise<Template[]> => {
  try {
    const pageParam = page || 1;
    const templatesQueryObject = {
      authorized_account: chainAccount,
      sort: 'created',
      order: 'desc',
      page: pageParam,
      limit: PAGINATION_LIMIT,
      has_assets: Boolean(showZeroMints),
    };

    const templatesQueryParams = toQueryString(templatesQueryObject);
    const templatesResponse = await getFromApi<Template[]>(
      `${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicassets/v1/templates?${templatesQueryParams}`
    );

    if (!templatesResponse.success) {
      throw new Error((templatesResponse.message as unknown) as string);
    }

    return templatesResponse.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const getAllCreationsByCreator = async ({
  chainAccount,
  showZeroMints,
}: {
  chainAccount: string;
  showZeroMints: boolean;
}): Promise<Template[]> => {
  try {
    const limit = 100;
    let templates = [];
    let hasResults = true;
    let page = 1;

    while (hasResults) {
      const templatesQueryObject = {
        authorized_account: chainAccount,
        sort: 'created',
        order: 'desc',
        page,
        limit,
        has_assets: Boolean(showZeroMints),
      };

      const templatesQueryParams = toQueryString(templatesQueryObject);
      const templatesResponse = await getFromApi<Template[]>(
        `${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicassets/v1/templates?${templatesQueryParams}`
      );

      if (!templatesResponse.success) {
        throw new Error((templatesResponse.message as unknown) as string);
      }

      if (templatesResponse.data.length < limit) {
        hasResults = false;
      }

      templates = templates.concat(templatesResponse.data);
      page += 1;
    }

    return templates;
  } catch (e) {
    throw new Error(e);
  }
};
