import qs from 'qs';
import httpCommon from './http-common';

// Search by keyword
export async function apiSearchKeyword({
  name,
  page = 1,
}: {
  name: string;
  page: number;
}) {
  // Create new variable name for keyword!
  const tempName = `${name} hitam putih untuk anak-anak`;

  const params = qs.stringify({page, name: tempName}, {encodeValuesOnly: true});

  return await httpCommon().get(`/keyword?${params}`);
}

// Get asset by resource_id
export async function apiGetAssetID(resource_id: number) {
  const params = qs.stringify({resource_id}, {encodeValuesOnly: true});

  return await httpCommon().get(`/get-asset?${params}`);
}
