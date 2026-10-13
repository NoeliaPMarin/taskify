import { ViewColumnsIcon, AdjustmentsVerticalIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";

export default function Features() {
    return (
        <div className="bg-tertiary">

            <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-10 md:gap-[80px] p-8 md:p-[80px]">

                <div className="flex flex-col items-center text-center max-w-[322px] gap-6 md:gap-[40px] min-h-[220px]">
                    <div className="flex items-center justify-center rounded-full bg-accent w-[108px] h-[108px]">
                        <div className="h-[55px] w-[55px] text-white">
                            <ViewColumnsIcon className="h-full w-full text-white" />
                        </div>
                    </div>
                    <h3 className="h3 text-primaryText">Easily Organize</h3>
                    <p className="caption text-secondaryText">
                        Organize all your tasks in visual boards and simple lists.
                    </p>
                </div>

                <div className="flex flex-col items-center text-center max-w-[322px] gap-6 md:gap-[40px] min-h-[220px]">
                    <div className="flex items-center justify-center rounded-full bg-accent w-[108px] h-[108px]">
                        <div className="h-[55px] w-[55px] text-white">
                            <AdjustmentsVerticalIcon className="h-full w-full text-white" />
                        </div>
                    </div>
                    <h3 className="h3 text-primaryText">Flexible Workflows</h3>
                    <p className="caption text-secondaryText">
                        Group tasks into lists, track progress and stay ahead of due dates.
                    </p>
                </div>

                <div className="flex flex-col items-center text-center max-w-[322px] gap-6 md:gap-[40px] min-h-[220px]">
                    <div className="flex items-center justify-center rounded-full bg-accent w-[108px] h-[108px]">
                        <div className="h-[55px] w-[55px] text-white">
                            <ShieldCheckIcon className="h-full w-full text-white" />
                        </div>
                    </div>
                    <h3 className="h3 text-primaryText">Private Workspace</h3>
                    <p className="caption text-secondaryText">
                        Keep every account and its tasks securely separated from other users.
                    </p>
                </div>

            </div>
        </div>
    );
}
