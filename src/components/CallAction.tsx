import Button from "./Button";

export default function CallAction() {
    return (
        <div className="bg-white py-16 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-8 px-6 text-center max-w-[750px]">
                <h2 className="h2 text-primaryText">
                    Ready to organize smarter?<br />
                    Join Taskify today and boost your productivity.
                </h2>
                <Button variant="secondary">
                    Get Started — It&rsquo;s Free
                </Button>
            </div>
        </div>
    );
}
