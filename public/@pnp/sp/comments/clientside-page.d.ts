import { ICommentInfo, IComment, ILikedByInformation } from "./types.js";
import { IItemUpdateResultData } from "../items/types.js";
declare module "../clientside-pages/types" {
    interface _ClientsidePage {
        addComment(info: string | ICommentInfo): Promise<IComment & ICommentInfo>;
        getCommentById(id: string | number): Promise<IComment & ICommentInfo>;
        clearComments(): Promise<boolean>;
        getComments(): Promise<ICommentInfo[]>;
        like(): Promise<void>;
        unlike(): Promise<void>;
        getLikedByInformation(): Promise<ILikedByInformation>;
        enableComments(): Promise<IItemUpdateResultData>;
        disableComments(): Promise<IItemUpdateResultData>;
        setCommentsOn(on: boolean): Promise<IItemUpdateResultData>;
    }
    interface IClientsidePage {
        /**
         * Adds a comment to this page
         *
         * @param info The comment information
         */
        addComment(info: string | Partial<ICommentInfo>): Promise<IComment & ICommentInfo>;
        /**
         *
         * @param id gets a comment by id
         */
        getCommentById(id: string | number): Promise<IComment & ICommentInfo>;
        /**
         * Deletes all comments for this page
         */
        clearComments(): Promise<boolean>;
        /**
         * Gets all the comments for this page
         */
        getComments(): Promise<ICommentInfo[]>;
        /**
         * Like this page
         */
        like(): Promise<void>;
        /**
         * Unlike this page
         */
        unlike(): Promise<void>;
        /**
         * gets list of who likes the page, current user's status, a few other details
         */
        getLikedByInformation(): Promise<ILikedByInformation>;
        /**
         * Enables comments for this page
         */
        enableComments(): Promise<IItemUpdateResultData>;
        /**
         * Disables comments for this page
         */
        disableComments(): Promise<IItemUpdateResultData>;
    }
}
//# sourceMappingURL=clientside-page.d.ts.map