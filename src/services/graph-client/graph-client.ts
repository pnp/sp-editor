import { Client } from '@microsoft/microsoft-graph-client';
import { loginRequest } from '../..';

export class GraphClient {
    private static client: Client;

    private static createClient(instance, account): Client {

        const graphClient = Client.initWithMiddleware({
            authProvider: {
                getAccessToken: async () => {

                    try {
                        const response = await instance.acquireTokenSilent({
                            ...loginRequest,
                            account,
                        })

                        return response.accessToken;
                    }
                    catch {
                        console.log('Something went wrong getting accesstoken')
                    }
                },
            },
        });
        return graphClient
    }

    public static createInstance(instance, account): Client {
        if (!GraphClient.client) {
            GraphClient.client = this.createClient(instance, account);
        }
        return GraphClient.client;
    }

    public static getInstance(): Client {
        return GraphClient.client;
    }
}