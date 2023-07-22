/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { TemplateResult } from 'lit';
import { MgtTemplatedComponent } from '@microsoft/mgt-element';
import { SearchHit } from '@microsoft/microsoft-graph-types';
/**
 * **Preview component** Custom element for making Microsoft Graph get queries.
 * Component may change before general availability release.
 *
 * @fires {CustomEvent<DataChangedDetail>} dataChange - Fired when data changes
 *
 * @cssprop --answer-border-radius - {Length} Border radius of an answer
 * @cssprop --answer-box-shadow - {Length} Box shadow of an answer
 * @cssprop --answer-border - {Length} Border of an answer
 * @cssprop --answer-padding - {Length} Padding of an answer
 *
 * @class mgt-search-results
 * @extends {MgtTemplatedComponent}
 */
export declare class MgtSearchResults extends MgtTemplatedComponent {
    /**
     * Default page size is 10
     */
    private _size;
    /**
     * Array of styles to apply to the element. The styles should be defined
     * user the `css` tag function.
     */
    static get styles(): import("lit").CSSResult[];
    /**
     * Gets all the localization strings for the component
     */
    protected get strings(): {
        modified: string;
        back: string;
        next: string;
        pages: string;
        page: string;
    };
    private _queryString;
    /**
     * The query to send to Microsoft Search
     *
     * @type {string}
     * @memberof MgtSearchResults
     */
    get queryString(): string;
    set queryString(value: string);
    /**
     * Query template to use in complex search scenarios
     * Query Templates are currently supported only on the beta endpoint
     */
    queryTemplate: string;
    /**
     * One or more types of resources expected in the response.
     * Possible values are: list, site, listItem, message, event,
     * drive, driveItem, externalItem.
     *
     * @type {string[]}
     * @memberof MgtSearchResults
     */
    entityTypes: string[];
    /**
     * The scopes to request
     *
     * @type {string[]}
     * @memberof MgtSearchResults
     */
    scopes: string[];
    /**
     * Content sources to use with External Items
     *
     * @type {string[]}
     * @memberof MgtSearchResults
     */
    contentSources: string[];
    /**
     * Api version to use for request
     *
     * @type {string}
     * @memberof MgtSearchResults
     */
    version: string;
    /**
     * Specifies the offset for the search results.
     * Offset 0 returns the very first result.
     *
     * @type {number}
     * @memberof MgtSearchResults
     */
    get from(): number;
    /**
     * The size of the page to be retrieved.
     * The maximum value is 1000.
     *
     * @type {number}
     * @memberof MgtSearchResults
     */
    get size(): number;
    set size(value: number);
    /**
     * The maximum number of pages to be clickable
     * in the paging control
     *
     * @type {number}
     * @memberof MgtSearchResults
     */
    pagingMax: number;
    /**
     * Sets whether the result thumbnail should be fetched
     * from the Microsoft Graph
     *
     * @type {boolean}
     * @memberof MgtSearchResults
     */
    fetchThumbnail: boolean;
    /**
     * Contains the fields to be returned for each resource
     *
     * @type {string[]}
     * @memberof MgtSearchResults
     */
    fields: string[];
    /**
     * This triggers hybrid sort for messages : the first 3 messages are the most relevant.
     * This property is only applicable to entityType=message
     *
     * @type {boolean}
     * @memberof MgtSearchResults
     */
    enableTopResults: boolean;
    /**
     * Enables cache on the response from the specified resource
     * default = false
     *
     * @type {boolean}
     * @memberof MgtSearchResults
     */
    cacheEnabled: boolean;
    /**
     * Invalidation period of the cache for the responses in milliseconds
     *
     * @type {number}
     * @memberof MgtSearchResults
     */
    cacheInvalidationPeriod: number;
    /**
     * Gets or sets the response of the request
     *
     * @type any
     * @memberof MgtSearchResults
     */
    private response;
    private isRefreshing;
    private get searchEndpoint();
    private get maxPageSize();
    private readonly defaultFields;
    private _currentPage;
    get currentPage(): number;
    set currentPage(value: number);
    constructor();
    /**
     * Synchronizes property values when attributes change.
     *
     * @param {string} name
     * @param {string} oldValue
     * @param {string} newValue
     * @memberof MgtSearchResults
     */
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    /**
     * Refresh the data
     *
     * @param {boolean} [hardRefresh=false]
     * if false (default), the component will only update if the data changed
     * if true, the data will be first cleared and reloaded completely
     * @memberof MgtSearchResults
     */
    refresh(hardRefresh?: boolean): void;
    /**
     * Clears state of the component
     *
     * @protected
     * @memberof MgtSearchResults
     */
    protected clearState(): void;
    /**
     * Invoked on each update to perform rendering tasks. This method must return
     * a lit-html TemplateResult. Setting properties inside this method will *not*
     * trigger the element to update.
     */
    protected render(): TemplateResult;
    /**
     * load state into the component.
     *
     * @protected
     * @returns
     * @memberof MgtSearchResults
     */
    protected loadState(): Promise<void>;
    /**
     * Render the loading state.
     *
     * @protected
     * @returns
     * @memberof MgtSearchResults
     */
    protected renderLoading(): TemplateResult;
    /**
     * Render the result item.
     *
     * @protected
     * @returns
     * @memberof MgtSearchResults
     */
    protected renderResult(result: SearchHit): TemplateResult;
    /**
     * Renders the footer with pages if required
     *
     * @param hitsContainer Search results
     */
    private renderFooter;
    /**
     * Validates if paging is required based on the provided results
     *
     * @param hitsContainer
     */
    private pagingRequired;
    /**
     * Gets a list of active pages to render for paging purposes
     *
     * @param totalResults Total number of results of the search query
     */
    private getActivePages;
    /**
     * Renders all sequential pages buttons
     *
     * @param pages
     */
    private renderAllPages;
    /**
     * Renders the "First page" button
     *
     * @param pages
     */
    private renderFirstPage;
    /**
     * Constructs the "dot dot dot" button title
     */
    private getDotButtonTitle;
    /**
     * Renders the "Previous page" button
     */
    private renderPreviousPage;
    /**
     * Renders the "Next page" button
     */
    private renderNextPage;
    /**
     * Triggers a specific page click
     *
     * @param pageNumber
     */
    private onPageClick;
    /**
     * Triggers a first page click
     *
     */
    private readonly onFirstPageClick;
    /**
     * Triggers a previous page click
     */
    private readonly onPageBackClick;
    /**
     * Triggers a next page click
     */
    private readonly onPageNextClick;
    /**
     * Validates if the current page is the last page of the collection
     */
    private isLastPage;
    /**
     * Scroll to the top of the search results
     */
    private scrollToFirstResult;
    /**
     * Gets the resource type (entity) of a search result
     *
     * @param resource
     */
    private getResourceType;
    /**
     * Renders a driveItem entity
     *
     * @param result
     */
    private renderDriveItem;
    /**
     * Renders a site entity
     *
     * @param result
     * @returns
     */
    private renderSite;
    /**
     * Renders a list entity
     *
     * @param result
     * @returns
     */
    private renderList;
    /**
     * Renders a listItem entity
     *
     * @param result
     * @returns
     */
    private renderListItem;
    /**
     * Renders a person entity
     *
     * @param result
     * @returns
     */
    private renderPerson;
    /**
     * Renders a bookmark entity
     *
     * @param result
     */
    private renderBookmark;
    /**
     * Renders an acronym entity
     *
     * @param result
     */
    private renderAcronym;
    /**
     * Renders a qna entity
     *
     * @param result
     */
    private renderQnA;
    /**
     * Renders an answer entity
     *
     * @param result
     */
    private renderAnswer;
    /**
     * Renders any entity
     *
     * @param result
     */
    private renderDefault;
    /**
     * Gets default resource URLs
     *
     * @param resource
     */
    private getResourceUrl;
    /**
     * Gets default resource Names
     *
     * @param resource
     */
    private getResourceName;
    /**
     * Gets default result summary
     *
     * @param resource
     */
    private getResultSummary;
    /**
     * Gets default resource icon
     *
     * @param resource
     */
    private getResourceIcon;
    /**
     * Validates if cache should be retrieved
     *
     * @returns
     */
    private shouldRetrieveCache;
    /**
     * Validates if cache should be updated
     *
     * @returns
     */
    private shouldUpdateCache;
    /**
     * Builds the appropriate RequestOption for the search query
     *
     * @returns
     */
    private getRequestOptions;
    /**
     * Gets the fields and default fields for default render methods
     *
     * @returns
     */
    private getFields;
}
//# sourceMappingURL=mgt-search-results.d.ts.map