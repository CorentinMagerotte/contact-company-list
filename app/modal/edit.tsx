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

type Inputs = {
    email: string;
    exampleRequired: string;
};

export default function ModalEdit({ entity, onClose } : { entity: EntityUnion, onClose: () => void }) {
    const [isContact] = useState(entity.__typename === "Contact");

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<Inputs>();

    useEffect(() => {
        setValue("email", entity.email);
    }, [entity, setValue]);

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log("Form data:", data);
        onClose(); // Fermer le modal après la soumission
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
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
                            <h1>
                                {isContact ? "Email:" : "Industry:"}
                            </h1>
                            <input
                                id="email"
                                placeholder="Enter email"
                                className="p-2 border border-gray-300 rounded"
                                type="email"
                                {...register("email", {
                                    required: "L'email est obligatoire",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Entrez un email valide",
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="text-red-600 text-sm">{errors.email.message}</p>
                            )}
                        </form>
                    </DialogDescription>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit(onSubmit)}>
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
