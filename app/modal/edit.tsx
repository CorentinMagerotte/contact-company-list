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

    const contactForm = () => {
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex space-x-4">
                    <div className="w-1/2">
                        <label>Name</label>
                        <div>
                            <input
                                id="name"
                                placeholder="Enter name"
                                className="w-full p-2 border border-gray-300 rounded"
                                type="text"
                                {...register("name", {
                                    required: "Name is required",
                                })}
                            />
                        </div>
                    </div>

                    <div className="w-1/2">
                        <label>Phone</label>
                        <div>
                            <input
                                id="phone"
                                placeholder="Enter phone number"
                                className="w-full p-2 border border-gray-300 rounded"
                                type="tel"
                                {...register("phone", {
                                    pattern: {
                                        value: /^\+?[1-9]\d{0,14}([- ]?\d{1,14})*$/,
                                        message: "Phone number is invalid",
                                    },
                                })}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <label>Email</label>
                    <div>
                        <input
                            id="email"
                            placeholder="Enter email"
                            className="w-full p-2 border border-gray-300 rounded"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Email incorrect",
                                },
                            })}
                        />
                    </div>
                </div>

                {errors.email && (
                    <p className="text-red-600 text-sm">{errors.email.message}</p>
                )}

                {errors.phone && (
                    <p className="text-red-600 text-sm">{errors.phone.message}</p>
                )}
            </form>
        )
    }

    const companyForm = () => {
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex space-x-4">
                    <div className="w-1/2">
                        <label>Name</label>
                        <div>
                            <input
                                id="name"
                                placeholder="Enter name"
                                className="w-full p-2 border border-gray-300 rounded"
                                type="text"
                                {...register("name", {
                                    required: "Name is required",
                                })}
                            />
                        </div>
                    </div>

                    <div className="w-1/2">
                        <label>Industry</label>
                        <div>
                            <input
                                id="industry"
                                placeholder="Enter industry name"
                                className="w-full p-2 border border-gray-300 rounded"
                                type="tel"
                                {...register("industry")}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <label>Contact Email</label>
                    <div>
                        <input
                            id="contactEmail"
                            placeholder="Enter contact email"
                            className="w-full p-2 border border-gray-300 rounded"
                            type="email"
                            {...register("contactEmail", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Email incorrect",
                                },
                            })}
                        />
                    </div>
                </div>

                {errors.contactEmail && (
                    <p className="text-red-600 text-sm">{errors.contactEmail.message}</p>
                )}
            </form>
        )
    }

    return (
        <Dialog open={true} onOpenChange={handleOnOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{entity.name}</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    {isContact ? contactForm() : companyForm()}
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
