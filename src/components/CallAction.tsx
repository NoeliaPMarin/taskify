import Button from "./Button";

export default function CallAction() {
    return (
        <div className="h-[336px] flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-[40px]">
                <h2 className="h2 max-w-[750px] text-center text-primaryText">Ready to organize smarter?<br /> Join Taskify today and boost your productivity.</h2>
                <Button>Get Started — It&rsquo;s Free</Button>
            </div>
        </div>
    );
}