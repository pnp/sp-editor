/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { MgtBaseComponent } from './baseComponent';
import { IProvider } from '../providers/IProvider';
/**
 * Abstract implementation for provider component
 *
 * @export
 * @abstract
 * @class MgtBaseProvider
 * @extends {MgtBaseComponent}
 */
export declare abstract class MgtBaseProvider extends MgtBaseComponent {
    /**
     * The IProvider created by this component
     *
     * @memberof MgtBaseProvider
     */
    get provider(): IProvider;
    set provider(value: IProvider);
    /**
     * Gets weather this provider can be used in this environment
     *
     * @readonly
     * @type {boolean}
     * @memberof MgtBaseProvider
     */
    get isAvailable(): boolean;
    /**
     * Higher priority provider that should be initialized before attempting
     * to initialize this provider. This provider will only be initialized
     * if all higher priority providers are not available.
     *
     * @type {MgtBaseProvider}
     * @memberof MgtBaseProvider
     */
    dependsOn: MgtBaseProvider;
    private _provider;
    /**
     * Invoked when the element is first updated. Implement to perform one time
     * work on the element after update.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * * @param _changedProperties Map of changed properties with old values
     */
    protected firstUpdated(changedProperties: any): void;
    /**
     * method called to initialize the provider. Each derived class should provide
     * their own implementation
     *
     * @protected
     * @memberof MgtBaseProvider
     */
    protected initializeProvider(): void;
    private stateChangedHandler;
}
//# sourceMappingURL=baseProvider.d.ts.map