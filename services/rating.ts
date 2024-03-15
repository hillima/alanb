import axios from "axios";

interface Rating {
    rating: string,
    name: string
}
export const ratingCheck = async ({ collectionName }): Promise<Rating[]> => {
    try {
        const result = await axios.post<Rating[]>(
          `/api/rating`, {
            data: {
                collection: collectionName
            }
          }
        );
        return result.data;
      } catch (e) {
        throw new Error(e);
      }
};