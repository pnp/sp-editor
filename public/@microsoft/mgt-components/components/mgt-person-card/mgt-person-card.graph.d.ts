/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { IGraph } from '@microsoft/mgt-element';
import { Chat, ChatMessage } from '@microsoft/microsoft-graph-types';
import { IDynamicPerson } from '../../graph/types';
import { MgtPersonCardConfig, MgtPersonCardState } from './mgt-person-card.types';
/**
 * Get data to populate the person card
 *
 * @export
 * @param {IGraph} graph
 * @param {IDynamicPerson} personDetails
 * @param {boolean} isMe
 * @param {MgtPersonCardConfig} config
 * @return {*}  {Promise<MgtPersonCardState>}
 */
export declare const getPersonCardGraphData: (graph: IGraph, personDetails: IDynamicPerson, isMe: boolean, config: MgtPersonCardConfig) => Promise<MgtPersonCardState>;
/**
 * Initiate a chat to a user
 *
 * @export
 * @param {IGraph} graph
 * @param {{ chatType: string; members: [{"@odata.type": string,"roles": ["owner"],"user@odata.bind": string},{"@odata.type": string,"roles": ["owner"],"user@odata.bind": string}]  }} chatData
 * @return {*}  {Promise<Chat>}
 */
export declare const createChat: (graph: IGraph, person: string, user: string) => Promise<Chat>;
/**
 * Send a chat message to a user
 *
 * @export
 * @param {IGraph} graph
 * @param {{ body: {"content": string}  }} messageData
 * @return {*}  {Promise<ChatMessage>}
 */
export declare const sendMessage: (graph: IGraph, chatId: string, messageData: Pick<ChatMessage, 'body'>) => Promise<ChatMessage>;
//# sourceMappingURL=mgt-person-card.graph.d.ts.map