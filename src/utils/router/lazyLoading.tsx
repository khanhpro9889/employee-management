import React, { ComponentType, Suspense } from "react";
import Loading from "../../components/Loading";
const lazyLoading = (func: () => Promise<{ default: ComponentType<any> }>) => {
  const Page = React.lazy(func);
  return (
    <Suspense fallback={<Loading />}>
      <Page />
    </Suspense>
  );
};

export default lazyLoading;
