/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { MgtBaseComponent } from '@microsoft/mgt-element';
/**
 * Custom Component used to handle loading state in components.
 *
 * @export MgtSpinner
 * @class MgtSpinner
 * @extends {MgtBaseComponent}
 */
export declare class MgtSpinner extends MgtBaseComponent {
    /**
     * Array of styles to apply to the element. The styles should be defined
     * user the `css` tag function.
     */
    static get styles(): import("lit").CSSResult[];
    /**
     * Render the loading spinner
     *
     * @returns
     * @memberof MgtSpinner
     */
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=mgt-spinner.d.ts.map