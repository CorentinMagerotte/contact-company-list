import {useCallback, useState} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import client from "@/app/lib/apollo-client";
import {UPDATE_CONTACT_MUTATION} from "@/app/queries/updateContact";
import {GET_ENTITIES} from "@/app/queries/getEntities";

/**
 * Displays data in grid view with AG-Grid library
 * @param dataRow The data list to show
 * @param reload Reload the parent list when a data is edited
 */
const GridContactView = ({ dataRow, reload } : { dataRow: Contact[], reload: () => void }) => {

    // Init the column title of the grid
    const [columnDefs] = useState([
        { field: "name", editable: true },
        { field: "phone", editable: true },
        { field: "email", editable: true },
    ]);

    // Called when a value is changed in a cell, check if the new value is != than the oldest one
    const handleCellValueChanged = useCallback((event) => {
        const { data, newValue, oldValue } = event;
        if (newValue !== oldValue) {
            updateCellInDatabase(data);
        }
    }, []);

    // Update the DB of the celle edited with the new information
    const updateCellInDatabase = (updatedRow) => {
        client.mutate({
            mutation: UPDATE_CONTACT_MUTATION,
            variables: {
                id: updatedRow.id,
                name: updatedRow.name,
                email: updatedRow.email,
                phone: updatedRow.phone,
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

export default GridContactView;
