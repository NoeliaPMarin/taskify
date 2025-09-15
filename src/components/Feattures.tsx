import { ViewColumnsIcon } from "@heroicons/react/24/solid";
import { AdjustmentsVerticalIcon } from "@heroicons/react/24/solid";
import { UserGroupIcon } from "@heroicons/react/24/solid";

export default function Feattures() {
    return (
        <div className="bg-tertiary">
            <div className="flex flex items-center justify-center gap-[80px] p-[80px]">
                <div className="flex flex-col items-center text-center w-[322px] gap-[40px]">
                    <div className="flex items-center justify-center rounded-full bg-accent w-[108px] h-[108px]">
                        <div className="h-[55px] w-[55px] text-white">
                            <ViewColumnsIcon className="h-full w-full text-white" />
                        </div>
                    </div>
                    <h3 className="h3 text-primaryText">Easily Organize</h3>
                    <p className="caption text-secondaryText">Organize all your tasks in visual boards and simple lists.</p>
                </div>
                <div className="flex flex-col items-center text-center w-[322px] gap-[40px]">
                    <div className="flex items-center justify-center rounded-full bg-accent w-[108px] h-[108px]">
                        <div className="h-[55px] w-[55px] text-white">
                            <AdjustmentsVerticalIcon className="h-full w-full text-white" />
                        </div>
                    </div>
                    <h3 className="h3 text-primaryText">Best Time Collaboration</h3>
                    <p className="caption text-secondaryText">Work with your team in real time and keep communication flowing.</p>
                </div>
                <div className="flex flex-col items-center text-center w-[322px] gap-[40px]">
                    <div className="flex items-center justify-center rounded-full bg-accent w-[108px] h-[108px]">
                        <div className="h-[55px] w-[55px] text-white">
                            <UserGroupIcon className="h-full w-full text-white" />
                        </div>
                    </div>
                    <h3 className="h3 text-primaryText">Smart Prioritization</h3>
                    <p className="caption text-secondaryText">Set priorities intelligently to focus on what matters most.</p>
                </div>
            </div>
        </div>
    );
}