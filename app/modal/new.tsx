import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@headlessui/react";
import {MdApartment, MdContacts} from "react-icons/md";

export default function ModalNew({ onClose, onSelect } : { onClose: () => void, onSelect: (selected: string) => void }) {

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <div className="flex flex-row items-center justify-center gap-10">
                        <Button
                            type={"button"}
                            onClick={() => onSelect('CONTACT')}
                            className="w-[200px] h-[100px] bg-blue-600 text-white font-bold rounded-lg flex flex-col items-center justify-center gap-2"
                        >
                            <MdContacts size={24} />
                            <span>Contact</span>
                        </Button>

                        <Button
                            type={"button"}
                            onClick={() => onSelect('COMPANY')}
                            className="w-[200px] h-[100px] bg-green-600 text-white font-bold rounded-lg flex flex-col items-center justify-center gap-2"
                        >
                            <MdApartment size={24} />
                            <span>Company</span>
                        </Button>
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>

    );
}
