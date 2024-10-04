import {useEffect, useState} from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {
    Select,
    SelectContent, SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import GridContactView from "@/app/pages/component/gridContactView";
import GridCompanyView from "@/app/pages/component/gridCompanyView";
/**
 * Display the card list and show the grid view according to the type of the filter selected
 * @param data The mixed list of Company and Contact
 * @param reload Reload the list when a data is edited
 */
const GridView = ({data, reload} : {data: EntityUnion[], reload: () => void }) => {

    // Contain the filter selected, by default it's 'Contact'
    const [selectedFilter, setSelectedFilter] = useState<string>('Contact');
    const [copiedData, setCopiedData] = useState<EntityUnion[]>([]);

    useEffect(() => {
        // Deep clone the data to avoid direct editing of original data
        const dataFiltered = data.filter((entity) => entity.__typename === selectedFilter);
        const clonedData = JSON.parse(JSON.stringify(dataFiltered));
        setCopiedData(clonedData);
    }, [data, selectedFilter]);

    // Called when the value of the filter is changed
    const handleFilterValueChange = (value: string) => {
        setSelectedFilter(value);
    };

    return (
        <div className="ag-theme-quartz-dark" style={{ width: '93vw', height: '80vh' }}>
            <Select onValueChange={handleFilterValueChange}>
                <SelectTrigger className="w-64 mb-7 text-black dark:text-white" defaultValue={selectedFilter} value={selectedFilter}>
                    <SelectValue placeholder="Select an option" color={'black'} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="Contact">Contact</SelectItem>
                        <SelectItem value="Company">Company</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <div className="ag-theme-quartz-dark" style={{ width: '93vw', height: '80vh' }}>
                {selectedFilter === 'Contact'
                    ? <GridContactView dataRow={copiedData as Contact[]} reload={reload}/>
                    : <GridCompanyView dataRow={copiedData as Company[]} reload={reload}/>
                }
            </div>

        </div>
    );
};

export default GridView;
