import { useEffect } from "react";

import { dataFromSnapshot } from "../firebase/firestoreService";
import { message } from "antd";

export default function useFirestoreDoc({
  query,
  data,
  deps,
  stopListener,
  shouldExecuteQuery,
}) {
  useEffect(() => {
    let unsubscribe = () => {};
    if (shouldExecuteQuery) {
      unsubscribe = query().onSnapshot(
        (snapshot) => {
          if (snapshot.exists) {
            data(dataFromSnapshot(snapshot));
          } else {
            query().set({});
          }
        },
        (error) => message.error(error.message)
      );
    }
    return () => {
      if (stopListener) {
        unsubscribe();
      }
    };
  }, deps);
}
