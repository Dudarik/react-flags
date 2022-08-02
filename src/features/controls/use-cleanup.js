import { useDispatch } from "react-redux";
import { clearControls } from "./constrols-slice";

export const useCleanup = () => {
  const dispatch = useDispatch();

  const cleanUp = () => dispatch(clearControls());

  return cleanUp;
};
