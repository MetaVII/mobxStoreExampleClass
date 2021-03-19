import React, { useContext } from 'react';
import PostsStore from './PostsStore';

type TRootStateContext = {
  postsStore: PostsStore;
};

const RootStateContext = React.createContext<TRootStateContext>(
  {} as TRootStateContext
);

const postsStore = new PostsStore();

export const RootStateProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => (
  <RootStateContext.Provider value={{ postsStore }}>
    {children}
  </RootStateContext.Provider>
);

export const useRootStore = () => useContext(RootStateContext);
