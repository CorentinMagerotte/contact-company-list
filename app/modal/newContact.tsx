import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@headlessui/react";
import {SubmitHandler, useForm} from "react-hook-form";
import client from "@/app/lib/apollo-client";
import {UPDATE_CONTACT_MUTATION} from "@/app/queries/updateContact";
import {CREATE_CONTACT_MUTATION} from "@/app/queries/createContact";
import {GET_ENTITIES} from "@/app/queries/getEntities";

type Inputs = {
    email: string;
    name: string;
    phone: string;
    industry: string;
    contactEmail: string;
};

export default function ModalNewContact({ onClose, reload } : { onClose: () => void, reload: () => void }) {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {

            const result = await client.mutate({
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
            console.log("Mutation result:", result);

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
                    <DialogTitle>New contact</DialogTitle>
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
                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    );
}
