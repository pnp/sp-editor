/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { HTMLTemplateResult } from 'lit';
/**
 * Interprets a template literal and dynamically rewrites `<mgt-` tags with the
 * configured disambiguation if necessary.
 *
 * ```ts
 * const header = (title: string) => mgtHtml`<mgt-flyout>${title}</mgt-flyout>`;
 * ```
 *
 * The `mgtHtml` tag is a wrapper for the `html` tag from `lit` which provides for dynamic tag re-writing
 */
export declare const mgtHtml: (strings: TemplateStringsArray, ...values: unknown[]) => HTMLTemplateResult;
//# sourceMappingURL=mgtHtml.d.ts.map