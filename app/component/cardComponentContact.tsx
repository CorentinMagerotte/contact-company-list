import { MdContacts } from 'react-icons/md';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function CardComponentContact({entity, index, handleCardPress} : {entity: Contact, index: number, handleCardPress: (entity: Contact) => void}) {

    return (
        <Card key={index} onClick={() => handleCardPress(entity)} style={{ cursor: 'pointer' }}>
            <CardHeader>
                <CardTitle>{entity.name}</CardTitle>
                <CardDescription>
                    <div className="flex flex-row items-center">
                        <MdContacts size={20} color="black" style={{marginRight: 5}}/>
                        <span>Contact</span>
                    </div>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p> {`Email: ${entity.email}`}</p>
            </CardContent>
        </Card>
    );
}
