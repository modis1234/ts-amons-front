import { AppDispatch, RootState } from "./store";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * @description
 * type을 정해줘야하는 Typescript의 특성에서 비롯된 사용 방법이라고 생각된다.
   개발 편의성을 증진시키기 위해, 매번 type을 import하는 것을 막아준다는 것 같다.
 */
