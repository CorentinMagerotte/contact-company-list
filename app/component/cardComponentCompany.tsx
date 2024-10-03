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
        <Card key={index} onClick={() => handleCardPress(entity)} style={{ cursor: 'pointer' }} className="w-[400px] border-l-green-600 border-l-4 overflow-hidden">
            <CardHeader>
                <CardTitle>{entity.name}</CardTitle>
                <CardDescription>
                    <div className="flex flex-row items-center">
                        <MdApartment size={20} style={{marginRight: 5}}/>
                        <span>Company</span>
                    </div>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-[1fr_4fr] gap-4">
                    <p>Email: </p>
                    <p className="break-words">{entity.contactEmail}</p>
                    <p>Industry: </p>
                    <p className="break-words">{entity.industry}</p>
                </div>
            </CardContent>
        </Card>
    );
}
