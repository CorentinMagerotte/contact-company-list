export default function ContactForm({ handleSubmit, onSubmit, register, errors }) {

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
    );
}
