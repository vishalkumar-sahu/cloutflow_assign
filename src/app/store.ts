import { configureStore } from '@reduxjs/toolkit';
import influencerReducer from '../features/influencers/influencerSlice';

export const store = configureStore({
  reducer: {
    influencer: influencerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
