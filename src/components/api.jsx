export const BASE_URL = "https://api.jewelcloud.com/api/RingBuilder";
export const DEALER_ID = 4141; 

export const getMountingList = (isLabSettingsAvailable, pageNumber, pageSize, shape = '', collection = '', metalType = '', centerStoneMinCarat = '', centerStoneMaxCarat = '', priceMin = 0, priceMax = 29678.00, orderBy = 'cost asc') => {
    return `${BASE_URL}/GetMountingList?DealerID=${DEALER_ID}&IsLabSettingsAvailable=${isLabSettingsAvailable}&PageNumber=${pageNumber}&PageSize=${pageSize}&Shape=${shape}&Collection=${collection}&MetalType=${metalType}&CenterStoneMinCarat=${centerStoneMinCarat}&CenterStoneMaxCarat=${centerStoneMaxCarat}&PriceMin=${priceMin}&PriceMax=${priceMax}&OrderBy=${orderBy}`;
};

export const getFilters = (isLabSettingsAvailable) => {
    return `${BASE_URL}/GetFilters?DealerID=${DEALER_ID}&IsLabSettingsAvailable=${isLabSettingsAvailable}`;
};

export const getMountingDetail = (sid) => {
    return `${BASE_URL}/GetMountingDetail?DealerId=${DEALER_ID}&SID=${sid}`;
};