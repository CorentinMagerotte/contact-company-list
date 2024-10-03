import {useCallback, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import client from "@/app/lib/apollo-client";
import {GET_ENTITIES} from "@/app/queries/getEntities";
import {UPDATE_COMPANY_MUTATION} from "@/app/queries/updateCompany";
const GridCompanyView = ({dataRow, reload} : {dataRow: EntityUnion[], reload: () => void}) => {

    const [columnDefs] = useState([
        { field: 'name', editable: true },
        { field: 'industry', editable: true },
        { field: 'contactEmail', editable: true }
    ]);

    const handleCellValueChanged = useCallback((event) => {
        const { data, newValue, oldValue } = event;
        if (newValue !== oldValue) {
            updateCellInDatabase(data);
        }
    }, []);

    const updateCellInDatabase = (updatedRow) => {
        client.mutate({
            mutation: UPDATE_COMPANY_MUTATION,
            variables: {
                id: updatedRow.id,
                name: updatedRow.name,
                contactEmail: updatedRow.contactEmail,
                industry: updatedRow.industry,
            },
            refetchQueries: [
                {
                    query: GET_ENTITIES,
                },
            ],
            awaitRefetchQueries: true,
        }).then(() => reload());
    };

    return (
        <AgGridReact
            rowData={dataRow}
            columnDefs={columnDefs}
            onCellValueChanged={handleCellValueChanged}
            pagination={true}
            paginationPageSize={25}
            paginationPageSizeSelector={[10, 25, 50]}
        />
    );
};

export default GridCompanyView;
