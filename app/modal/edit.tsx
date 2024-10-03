"use client";
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

type Inputs = {
    email: string;
    name: string;
    phone: string;
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
        // setValue("industry", entity.industry);
        // setValue("contactEmail", entity.contactEmail);
    }, [entity, setValue]);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {

            console.log(data)
            const result = await client.mutate({
                mutation: UPDATE_CONTACT_MUTATION,
                variables: {
                    id: entity.id,
                    email: data.email,
                    name: data.name,
                    phone: data.phone,
                    industry: data.industry,
                    contactEmail: data.contactEmail
                },
            });

            console.log("Mutation result:", result);
            onClose();
        } catch (e) {
            console.error("Error updating email:", e);
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
                </DialogDescription>

                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit(onSubmit)}
                            class="bg-blue-500 text-white font-bold py-2 px-4 rounded">
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
