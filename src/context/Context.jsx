import React, { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(0);

  const context = {
    page,
    pageChangeHandler: (newState) => setPage(newState),
    data,
    dataChangeHandler: (newState) => setData(newState),
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}
