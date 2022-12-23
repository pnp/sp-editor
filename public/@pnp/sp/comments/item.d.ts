import { IComments, ILikeData, ILikedByInformation, RatingValues } from "./types.js";
declare module "../items/types" {
    interface _Item {
        readonly comments: IComments;
        getLikedBy(): Promise<ILikeData[]>;
        like(): Promise<void>;
        unlike(): Promise<void>;
        getLikedByInformation(): Promise<ILikedByInformation>;
        rate(rating: RatingValues): Promise<number>;
    }
    interface IItem {
        readonly comments: IComments;
        /**
         * Gets the collection of people who have liked this item
         */
        getLikedBy(): Promise<ILikeData[]>;
        /**
         * Likes this client-side page as the current user
         */
        like(): Promise<void>;
        /**
         * Unlikes this client-side page as the current user
         */
        unlike(): Promise<void>;
        /**
         * Unlikes this item as the current user
         */
        getLikedByInformation(): Promise<ILikedByInformation>;
        /**
         * Rates this item as the current user
         * @param rating rating number between 1-5
         * @returns rating number
         */
        rate(rating: RatingValues): Promise<number>;
    }
}
//# sourceMappingURL=item.d.ts.map