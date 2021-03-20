import Mousetrap from "mousetrap";
import { useCallback, useRef, useEffect } from "react";
import areEqual from "fbjs/lib/areEqual";

const useDeepEqual = (obj: string[]) => {
  const objRef = useRef(obj);

  if (!areEqual(obj, objRef.current)) {
    objRef.current = obj;
  }

  return objRef.current;
};

type Callback = (...args: any[]) => void;

const useEventCallback = (fn: Callback) => {
  const ref = useRef(fn);

  useEffect(() => {
    ref.current = fn;
  }, [fn]);

  return useCallback((...args) => {
    return ref.current(...args);
  }, []);
};

const useHotKey = (inKeys: string[] | string, callback: Callback) => {
  const cb = useEventCallback(callback);

  const keyArr = Array.isArray(inKeys) ? inKeys : [inKeys];
  const keys = useDeepEqual(keyArr);

  useEffect(() => {
    Mousetrap.bind(keys, cb);

    return () => {
      Mousetrap.unbind(keys);
    };
  }, [keys, cb]);
};

export default useHotKey;
