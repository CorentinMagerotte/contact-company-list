"use client";
import {useState} from "react";
import {Dialog} from "@headlessui/react";
import {SubmitHandler, useForm} from "react-hook-form";

type Inputs = {
    example: string
    exampleRequired: string
}

export default function ModalEdit({entity, onClose}) {
    const [isContact] = useState( entity.__typename === "Contact");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    return (
        <Dialog open={true} onClose={() => onClose(false)} className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 text-center">
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                            {entity.name}
                        </Dialog.Title>

                        {/* include validation with required or other standard HTML validation rules */}
                        <input
                            id="email"
                            type="email"
                            {...register("email", {
                                required: "L'email est obligatoire",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Entrez un email valide",
                                },
                            })}
                        />

                        <div className="mt-2">
                            <p>{isContact ? `Email: ${entity.email}` : `Industry: ${entity.industry}`}</p>
                        </div>

                        <div className="mt-4 flex flex-row justify-between">
                            <button
                                type="button"
                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-700"
                                onClick={() => onClose(false)}>
                                Close
                            </button>
                            <button
                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-blue-700"
                                type="submit">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Dialog>
    );
}
