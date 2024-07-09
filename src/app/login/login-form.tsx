'use client';

import { signIn } from "next-auth/react"; // Import the signIn function from NextAuth for authentication.
import { useSearchParams, useRouter } from "next/navigation"; // Import Next.js navigation utilities.
import { ChangeEvent, useState } from "react"; // Import React hooks for managing component state.

export const LoginForm = () => {
    const router = useRouter(); // Initialize the Next.js router.
    const [loading, setLoading] = useState(false); // State for managing loading state.
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    }); // State for form input values.
    const [error, setError] = useState(""); // State for handling errors during authentication.

    const searchParams = useSearchParams(); // Get query parameters from the URL.
    const callbackUrl = searchParams.get("callbackUrl") || "/admin"; // Define a callback URL or use a default one.

    // Handle form submission
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the default form submission behavior.
        try {
            setLoading(true); // Set loading state to true.
            setFormValues({ email: "", password: "" }); // Clear form input values.


            // Attempt to sign in using the credentials (email and password).
            const res = await signIn("credentials", {
                redirect: false,
                email: formValues.email,
                password: formValues.password,
                callbackUrl
            });

            debugger;

            setLoading(false); // Set loading state back to false.

            if (!res?.error) {
                router.push(callbackUrl); // Redirect to the callback URL on successful authentication.
            } else {
                setError("invalid email or password"); // Set an error message for invalid credentials.
            }
        } catch (error: any) {
            setLoading(false); // Set loading state back to false on error.
            setError(error); // Set the error message for any other errors.
        }
    };

    // Handle input field changes
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value }); // Update the form input values.
    };

    // Define a CSS class for form inputs.
    const input_style =
        "form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

    return (
        <form onSubmit={onSubmit}>
            {error && (
                <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
            )}

            {/* Email input field */}
            <div className="mb-6">
                <input
                    required
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className={`${input_style}`}
                />
            </div>

            {/* Password input field */}
            <div className="mb-6">
                <input
                    required
                    type="password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className={`${input_style}`}
                />
            </div>

            {/* Sign In button */}
            <button
                type="submit"
                style={{ backgroundColor: `${loading ? "#ccc" : "#3446eb"}` }}
                className="inline-block px-7 py-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                disabled={loading}
            >
                {loading ? "loading..." : "Sign In"}
            </button>

        </form>
    );
};