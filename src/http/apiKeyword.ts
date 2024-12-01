import httpCommon from './http-common';

// Search by keyword
export async function apiSearchKeyword(name: string) {
  return await httpCommon().get(`/keyword?name=${name}`);
}
