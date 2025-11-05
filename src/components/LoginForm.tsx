import Button from "./Button";
import { Link } from "react-router-dom";

export default function LoginForm() {
    return (
        <form className="w-[507px] flex flex-col gap-4">
            <input
                type="email"
                placeholder="Email"
                className="border h-[78px] border-secondaryBackground rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
                type="password"
                placeholder="Password"
                className="border h-[78px] border-secondaryBackground rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Link
                to="/forgot-password"
                className="body underline text-accent hover:text-primary/80 justify-end self-end mb-6"
            >
                Forgot password?
            </Link>
            <div className="mb-16">
                <Button size="lg" variant="primary">
                    Log In
                </Button>
            </div>
        </form>
    );
}