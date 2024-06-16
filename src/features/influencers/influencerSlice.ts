import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Influencer } from '../../models/influencer';
import axios from 'axios';

interface Criteria {
    cost: [number, number];
    rating: [number, number];
    followers: [number, number];
    avilablity: boolean;
}

interface InfluencerState {
  criteria: Criteria;
  influencers: Influencer[];
  selectedInfluencer: Influencer | null;
  loading: boolean;
  error: string | null;
}

const initialState: InfluencerState = {
  criteria: {
    cost: [0, 50000],
    rating: [0, 5],
    followers: [0, 250000],
    avilablity: false,
  },
  influencers: [],
  selectedInfluencer: null,
  loading: false,
  error: null,
};

export const fetchInfluencersAsync = createAsyncThunk('influencers/fetchInfluencers', async (params, thunkAPI) => {
    try {
        // Making an API call to fetch influencers
        const response = await axios.get('https://mocki.io/v1/a2ab1166-337d-43d5-82ea-5a7b81254471', { params });
        return response.data.Influencers;
    } catch (error : any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

const influencerSlice = createSlice({
  name: 'influencers',
  initialState,
  reducers: {
    setCriteria: (state, action) => {
      state.criteria = action.payload;
    },
    selectInfluencer: (state, action) => {
      state.selectedInfluencer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInfluencersAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInfluencersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.influencers = action.payload;
      })
      .addCase(fetchInfluencersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch influencers';
      });
  },
});

export const { setCriteria, selectInfluencer } = influencerSlice.actions;
export default influencerSlice.reducer;
