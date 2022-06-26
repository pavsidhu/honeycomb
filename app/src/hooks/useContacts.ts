import * as Contacts from "expo-contacts";
import { useEffect, useMemo, useState } from "react";

export interface useContactsOptions {
  query?: string;
  order?: "ascending" | "descending";
}

export default function useContacts({ query, order }: useContactsOptions) {
  const [data, setData] = useState<Contacts.Contact[]>();
  const [error, setError] = useState<Error>();

  const orderedData = useMemo(() => {
    if (!order) return data;

    return data?.sort((a, b) => {
      if (a.name < b.name) return order === "ascending" ? -1 : 1;
      if (a.name > b.name) return order === "ascending" ? 1 : -1;
      return 0;
    });
  }, [data, order]);

  const filteredData = useMemo(() => {
    if (!query) return orderedData;

    const lowercaseQuery = query.toLowerCase();
    return orderedData?.filter((it) =>
      it.name.toLowerCase().includes(lowercaseQuery)
    );
  }, [orderedData, query]);

  return {
    data: filteredData,
    error,
  };
}
