// Zustand state for search keyword & category

import {create} from 'zustand';
import {apiGetAssetID, apiSearchKeyword} from '../http/apiKeyword';
import {apiGetCategory, apiGetSubCategory} from '../http/apiCategory';

interface State {
  loading: boolean;
  imageList: {
    data: any[];
    meta: any;
  };
  categories: {
    data: any[];
    meta: any;
  };
  subCategories: {
    data: any[];
    meta: any;
  };
  assetID: any;
  searchKeyword: (_props: {name?: string; page?: number}) => Promise<any>;
  getCategories: (_props: {page?: number}) => Promise<any>;
  getSubCategories: (_props: {slug: string; page?: number}) => Promise<any>;
  getAssetID: (resource_id: number) => Promise<any>;
  resetAssetID: () => void;
}

const initialState = {
  loading: false,
  imageList: {
    data: [],
    meta: null,
  },
  categories: {
    data: [],
    meta: null,
  },
  subCategories: {
    data: [],
    meta: null,
  },
  assetID: null,
};

const useStoreSearch = create<State>()(set => ({
  ...initialState,
  async searchKeyword({name = '', page = 1}) {
    set({loading: true});

    try {
      const res = await apiSearchKeyword({name, page});
      set({
        imageList: {
          data: res?.data?.data ?? [],
          meta: res?.data?.meta ?? null,
        },
      });
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
  async getAssetID(resource_id) {
    set({loading: true, assetID: null});

    try {
      const res = await apiGetAssetID(resource_id);
      const arrData: any[] = res?.data?.data ?? [];

      // Find the image first!
      if (arrData.length > 0) {
        // Pick first asset as main object for drawing!
        set({assetID: arrData[0]});
        return res?.data;
      }

      return undefined;
    } catch (error: any) {
      return undefined;
    } finally {
      set({loading: false});
    }
  },
  resetAssetID() {
    set({assetID: null});
  },
}));

export default useStoreSearch;
