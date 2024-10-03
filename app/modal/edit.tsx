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

export default function ModalEdit({ entity, onClose, reload } : { entity: EntityUnion, onClose: () => void, reload: () => void }) {
    const [isContact] = useState(entity.__typename === "Contact");

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<Inputs>();

    useEffect(() => {
        setValue("name", entity.name);
        setValue('email', entity.email);
        setValue('phone', entity.phone);
        setValue("industry", entity.industry);
        setValue("contactEmail", entity.contactEmail);
    }, [entity, setValue]);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {

            if (isContact) {
                const result = await client.mutate({
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
                console.log("Mutation result:", result);
            } else {
                const result = await client.mutate({
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
                console.log("Mutation result:", result);
            }

        } catch (e) {
            console.error("Error updating :", e);
        }
        reload();
        onClose();
    };

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
