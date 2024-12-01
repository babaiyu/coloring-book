// Zustand state for search keyword & category
import {create} from 'zustand';
import {apiSearchKeyword} from '../http/apiKeyword';
import {apiGetCategory, apiGetSubCategory} from '../http/apiCategory';

interface State {
  loading: boolean;
  imageList: any[];
  categories: {
    data: any[];
    meta: any;
  };
  subCategories: {
    data: any[];
    meta: any;
  };
  searchKeyword: (name?: string) => Promise<any>;
  getCategories: (_props: {page?: number}) => Promise<any>;
  getSubCategories: (_props: {slug: string; page?: number}) => Promise<any>;
}

const initialState = {
  loading: false,
  imageList: [],
  categories: {
    data: [],
    meta: null,
  },
  subCategories: {
    data: [],
    meta: null,
  },
};

const useStoreSearch = create<State>()(set => ({
  ...initialState,
  async searchKeyword(name = '') {
    set({loading: true});

    try {
      const res = await apiSearchKeyword(name);
      return res.data;
    } catch (error: any) {
      return undefined;
    } finally {
      set({loading: false});
    }
  },
  async getCategories({page = 1}) {
    set({loading: true});

    try {
      const res = await apiGetCategory(page);
      set({
        categories: {
          data: res?.data?.data ?? [],
          meta: res?.data?.meta ?? null,
        },
      });
      return res?.data;
    } catch (error: any) {
      return undefined;
    } finally {
      set({loading: false});
    }
  },
  async getSubCategories({slug, page = 1}) {
    set({loading: true});

    try {
      const res = await apiGetSubCategory({slug, page});
      set({
        subCategories: {
          data: res?.data?.data ?? [],
          meta: res?.data?.meta ?? null,
        },
      });
      return res?.data;
    } catch (error: any) {
      return undefined;
    } finally {
      set({loading: false});
    }
  },
}));

export default useStoreSearch;
