import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import Header from "../../components/header";
import LoadingSpinner from "../../components/loadingSpinner";
import SPListsList from "./components/SPListsList";
import SPQueryBuilder from "./components/QueryBuilder";
import "./QueryBuilder.css"
import { ScrollablePane } from "@fluentui/react";

const QueryBuilder = () => {
    return (
        <IonPage>
            <Header title={"Query Builder"} showOnLoad={false} headline='' content='' />
            <IonContent>
                <LoadingSpinner />
                <div className="queryBuilderRoot">
                    <ScrollablePane style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '20px',
                        gap: '10px',
                        margin: '20px'
                    }}>
                        <SPListsList />
                        <SPQueryBuilder />
                    </ScrollablePane>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default QueryBuilder;