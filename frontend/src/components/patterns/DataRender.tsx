import { ReactNode, useEffect, useState } from 'react';

type Props<T> = {
  getData: () => Promise<T>;
  render: (data: T | null) => ReactNode;
};

export const DataSourceRender = <T,>({
  getData = async () => null as T,
  render,
}: Props<T>) => {
  const [resource, setResource] = useState<T | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getData();
      setResource(data);
    })();
  }, [getData]);

  return render(resource);
};
