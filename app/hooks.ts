import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
// Import the base React‑Redux hooks.
// We will wrap them with TypeScript types so your app gets full type‑safety.

import { store } from '../store'
// Import your Redux store so we can extract its types.

// Infer the full Redux state shape from the store.
// RootState becomes the type of your entire Redux state tree.
export type RootState = ReturnType<typeof store.getState>

// Infer the dispatch type from the store.
// AppDispatch ensures dispatch() knows about thunks and typed actions.
export type AppDispatch = typeof store.dispatch

// Typed versions of useDispatch and useSelector.
// These should be used everywhere in your app instead of the plain hooks.

// useAppDispatch()
// Ensures dispatch() is correctly typed with AppDispatch.
export const useAppDispatch = () => useDispatch<AppDispatch>()

// useAppSelector()
// Ensures selector functions know the exact shape of RootState.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
   