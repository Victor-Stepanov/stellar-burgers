import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
  import { AppDispatch, RootState, AppThunk} from '../services/types/index';
  
  export const useAppDispatch: () => AppDispatch & AppThunk = useDispatch
  export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector