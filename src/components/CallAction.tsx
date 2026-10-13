import Button from "./Button";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function CallAction() {
    const { user } = useAuth();
    return (
        <div className="bg-white py-16 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-8 px-6 text-center max-w-[750px]">
                <h2 className="h2 text-primaryText">
                    Ready to organize smarter?<br />
                    Join Taskify today and boost your productivity.
                </h2>
                <Link to={user ? "/tasks" : "/signup"}><Button variant="secondary">{user ? "Open your dashboard" : "Get Started — It’s Free"}</Button></Link>
            </div>
        </div>
    );
}
