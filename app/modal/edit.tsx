import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@headlessui/react";
import {UPDATE_CONTACT_MUTATION} from "@/app/queries/updateContact";
import client from "@/app/lib/apollo-client";
import {UPDATE_COMPANY_MUTATION} from "@/app/queries/updateCompany";
import {GET_ENTITIES} from "@/app/queries/getEntities";
import ContactForm from "@/app/modal/component/contactForm";
import CompanyForm from "@/app/modal/component/companyForm";

type Inputs = {
    email: string;
    name: string;
    phone: string;
    industry: string;
    contactEmail: string;
};

/**
 * Modal of edition for contact and company component
 * @param entity The entity (Contact or Company) to edit
 * @param onClose Function to close the modal
 * @param reload Function to reload the parent list
 */
export default function ModalEdit({ entity, onClose, reload } : { entity: EntityUnion, onClose: () => void, reload: () => void }) {

    // Check if the entity to edit is a contact or a company
    const [isContact] = useState(entity.__typename === "Contact");

    // Init the form state and func
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<Inputs>();

    // Fill the form with the value who exist already
    useEffect(() => {
        setValue("name", entity.name);
        setValue('email', entity.email);
        setValue('phone', entity.phone);
        setValue("industry", entity.industry);
        setValue("contactEmail", entity.contactEmail);
    }, [entity, setValue]);

    // Called when the form is confirmed, update the object with the new data then reload the parent list and close the modal
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {

            if (isContact) {
                await client.mutate({
                    mutation: UPDATE_CONTACT_MUTATION,
                    variables: {
                        id: entity.id,
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
                    mutation: UPDATE_COMPANY_MUTATION,
                    variables: {
                        id: entity.id,
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

    // Close the modal when the openChange of Dialog is called
    const handleOnOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            onClose();
        }
    };

    return (
        <Dialog open={true} onOpenChange={handleOnOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{entity.name}</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    {isContact
                        ? <ContactForm register={register} errors={errors} handleSubmit={handleSubmit} onSubmit={onSubmit} />
                        : <CompanyForm register={register} errors={errors} handleSubmit={handleSubmit} onSubmit={onSubmit} />
                    }
                </DialogDescription>

                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit(onSubmit)}
                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
