/**
 * Render the company form used for edition and creation with submit, register and error message
 */
export default function CompanyForm({ handleSubmit, onSubmit, register, errors }) {
    return (
        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => {
            if (e.key === 'Enter') {
                handleSubmit(onSubmit)();
            }}}>
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
    );
}
