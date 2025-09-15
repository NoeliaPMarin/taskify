export default function Footer() {
    return (
        <div className="bg-primary">
            <div className="px-6 flex items-center justify-between">
                <div className="ml-[190px]">
                    <img
                        src="/images/logoWhite.svg"
                        alt="Taskify Logo"
                        className="h-12 w-40 m-4"
                    />
                </div>
                <ul className="hidden md:flex gap-10 mr-[190px] text-background font-semibold text-[18px] leading-[20px]">
                    <li><a href="#features" className="hover:text-primary">Features</a></li>
                    <li><a href="#pricing" className="hover:text-primary">Pricing</a></li>
                    <li><a href="#contact" className="hover:text-primary">Contact</a></li>
                </ul>
            </div>
            <div className="h-[2px] bg-background my-8"></div>
            <p className="font-body text-background text-center pb-8">© 2025 Taskify. All rights reserved.</p>
        </div>
    );
}
