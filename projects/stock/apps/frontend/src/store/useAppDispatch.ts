import type { TypeStore } from '@src/store/index';
import { useDispatch } from '@stock/packages-redux';

export const useAppDispatch = () => useDispatch<TypeStore>();
