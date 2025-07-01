import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import Header from "../../components/header";
import LoadingSpinner from "../../components/loadingSpinner";
import SPListsList from "./components/SPListsList";
import SPQueryBuilder from "./components/QueryBuilder";
import "./QueryBuilder.css"

const QueryBuilder = () => {
    return (
        <IonPage>
            <Header title={"Query Builder"} showOnLoad={false} headline='' content='' />
            <IonContent>
                <LoadingSpinner />
                <div className="queryBuilderRoot">
                    <SPListsList />
                    <SPQueryBuilder />
                </div>
            </IonContent>
        </IonPage>
    );
};

export default QueryBuilder;
