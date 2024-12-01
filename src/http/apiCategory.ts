import qs from 'qs';
import httpCommon from './http-common';

// Get all category
export async function apiGetCategory(page: number = 1) {
  const params = qs.stringify(
    {
      populate: ['image'],
      pagination: {
        page,
        pageSize: 25,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  return await httpCommon().get(`/categories?${params}`);
}

// Get sub-category based on category slug
export async function apiGetSubCategory({
  slug,
  page = 1,
}: {
  slug: string;
  page?: number;
}) {
  const params = qs.stringify(
    {
      populate: ['image'],
      filters: {
        category: {
          slug: {$eq: slug},
        },
      },
      pagination: {
        page,
        pageSize: 25,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  return await httpCommon().get(`/sub-categories?${params}`);
}
