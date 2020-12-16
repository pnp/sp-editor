import React, { ReactNode } from 'react';
import { Wc, WcProps, WcTypeProps } from 'wc-react';
export declare class Mgt extends Wc {
    private _templates;
    constructor(props: WcTypeProps);
    protected getTag(): any;
    render(): React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    /**
     * Sets the web component reference and syncs the props
     *
     * @protected
     * @param {HTMLElement} element
     * @memberof Wc
     */
    protected setRef(component: HTMLElement): void;
    /**
     * Removes all event listeners from web component element
     *
     * @protected
     * @returns
     * @memberof Mgt
     */
    protected cleanUp(): void;
    /**
     * Renders a template
     *
     * @protected
     * @param {*} e
     * @returns
     * @memberof Mgt
     */
    protected handleTemplateRendered(e: any): void;
    /**
     * Prepares templates for rendering
     *
     * @protected
     * @param {ReactNode} children
     * @returns
     * @memberof Mgt
     */
    protected processTemplates(children: ReactNode): void;
}
/**
 * Creates a new React Functional Component that wraps the
 * web component with the specified tag name
 *
 * @template T - optional props type for component
 * @param {(string | Function)} tag
 * @returns React component
 */
export declare const wrapMgt: <T = WcProps>(tag: string) => React.FC<T>;
//# sourceMappingURL=Mgt.d.ts.map