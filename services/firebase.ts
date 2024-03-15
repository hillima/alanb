import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const useFirebaseFeaturedCollections = (): string[] => {
  const [collections, setCol] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      await axios.get('/api/collections').then(res=>{
        if(res.data.messeage == 'success'){
          setCol(res.data.data);
        }
      });
    })();
  }, []);

  return collections;
};
