import { MdContacts } from 'react-icons/md';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

/**
 * Contact card component: displays contact details and handles click events
 * @param entity The contact object to display
 * @param index The index of the contact object from the mixed list
 * @param handleCardPress The func called when the card is clicked
 */
export default function CardComponentContact({entity, index, handleCardPress} : {entity: Contact, index: number, handleCardPress: (entity: Contact) => void}) {
    return (
        <Card key={index} onClick={() => handleCardPress(entity)} style={{ cursor: 'pointer' }} className="w-[400px] border-l-blue-600 border-l-4 overflow-hidden">
            <CardHeader>
                <CardTitle>{entity.name}</CardTitle>
                <CardDescription>
                    <div className="flex flex-row items-center">
                        <MdContacts size={20} style={{marginRight: 5}}/>
                        <span>Contact</span>
                    </div>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-[1fr_4fr] gap-4">
                    <p>Email: </p>
                    <p className="break-words">{entity.email}</p>
                    <p>Phone: </p>
                    <p className="break-words">{entity.phone}</p>
                </div>
            </CardContent>
        </Card>
    );
}
