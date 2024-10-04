import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@headlessui/react";
import {MdApartment, MdContacts} from "react-icons/md";
import {useState} from "react";
import ContactForm from "@/app/modal/component/contactForm";
import {SubmitHandler, useForm} from "react-hook-form";
import client from "@/app/lib/apollo-client";
import {CREATE_CONTACT_MUTATION} from "@/app/queries/createContact";
import {CREATE_COMPANY_MUTATION} from "@/app/queries/createCompany";
import {GET_ENTITIES} from "@/app/queries/getEntities";
import CompanyForm from "@/app/modal/component/companyForm";

type Inputs = {
    email: string;
    name: string;
    phone: string;
    industry: string;
    contactEmail: string;
};

/**
 * Modal of creation a new contact or company item
 * @param onClose Function to close the modal
 * @param reload Function to reload the parent list
 */
export default function ModalNew({ onClose, reload } : { onClose: () => void, reload: () => void }) {

    const [newSelected, setNewSelected] = useState<string | null>(null);

    // Init the form state and func
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    // Called when the form is confirmed, create the object with the new data then reload the parent list and close the modal
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {

            if (newSelected === 'CONTACT') {
                await client.mutate({
                    mutation: CREATE_CONTACT_MUTATION,
                    variables: {
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                    },
                    refetchQueries: [
                        {
                            query: GET_ENTITIES,
                        },
                    ],
                    awaitRefetchQueries: true,
                });
            } else {
                await client.mutate({
                    mutation: CREATE_COMPANY_MUTATION,
                    variables: {
                        name: data.name,
                        industry: data.industry,
                        contactEmail: data.contactEmail
                    },
                    refetchQueries: [
                        {
                            query: GET_ENTITIES,
                        },
                    ],
                    awaitRefetchQueries: true,
                });
            }
        } catch (e) {
            console.error("Error updating :", e);
        }

        reload();
        onClose();
    };

    // Fill the field newSelected when the selected value is clicked
    const handleNewSelected = (selected: string) => {
        setNewSelected(selected);
    }

    // Render the good form according to the value selected
    const renderForm = () => {
        if (newSelected === 'CONTACT') {
            return <ContactForm onSubmit={onSubmit} handleSubmit={handleSubmit} errors={errors} register={register} />
        } else if (newSelected === 'COMPANY') {
            return <CompanyForm onSubmit={onSubmit} handleSubmit={handleSubmit} errors={errors} register={register} />
        }
    }

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New {newSelected ? newSelected.toLowerCase() : ''}</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    {!newSelected ? (
                        <div className="flex flex-row items-center justify-center gap-10">
                            <Button
                                type={"button"}
                                onClick={() => handleNewSelected('CONTACT')}
                                className="w-[200px] h-[100px] bg-blue-600 text-white font-bold rounded-lg flex flex-col items-center justify-center gap-2"
                            >
                                <MdContacts size={24} />
                                <span>Contact</span>
                            </Button>

                            <Button
                                type={"button"}
                                onClick={() => handleNewSelected('COMPANY')}
                                className="w-[200px] h-[100px] bg-green-600 text-white font-bold rounded-lg flex flex-col items-center justify-center gap-2"
                            >
                                <MdApartment size={24} />
                                <span>Company</span>
                            </Button>
                        </div>
                    ) : (
                        <div>
                            {renderForm()}
                        </div>
                    )}
                </DialogDescription>
                {newSelected && (
                    <DialogFooter>
                        <Button type="submit" onClick={handleSubmit(onSubmit)}
                                className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
                            Save changes
                        </Button>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>

    );
}
