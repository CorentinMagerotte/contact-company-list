import { MdApartment } from 'react-icons/md';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function CardComponentCompany({entity, index, handleCardPress} : {entity: Company, index: number, handleCardPress: (entity: Company) => void}) {

    return (
        <Card key={index} onClick={() => handleCardPress(entity)} style={{ cursor: 'pointer' }}>
            <CardHeader>
                <CardTitle>{entity.name}</CardTitle>
                <CardDescription>
                    <div className="flex flex-row items-center">
                        <MdApartment size={20} color="black" style={{marginRight: 5}}/>
                        <span>Company</span>
                    </div>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>{`Industry: ${entity.industry}`}</p>
            </CardContent>
        </Card>
    );
}
