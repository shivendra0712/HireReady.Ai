import React from 'react'

const DashboardContent = () => {

    const userData = {
        name: 'Shivendra',
        stats: {
            totalInterviews: 1,
            totalTimeSpent: '1 min',
            completedInterviews: 1,
            availableInterviews: 0,
            percentFromLastWeek: '0%',
            completionRate: '100%',
        },
    };


    return (
        <div className='w-full h-full p-2 bg-[#18181B] rounded-2xl px-20'>
            {/* Main content */}
            <div className="flex-1 p-8 overflow-auto">
                {/* Header */}
                <div className=" mb-8">
                    <h1 className="text-2xl font-bold">Hello, {userData.name} 👋</h1>

                </div>

                {/* Overview */}
                <div className="mb-8 ">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-semibold">Overview</h2>
                        <a href="/create-interview">
                            <button className="bg-[#BEF264] hover:bg-green-500 text-black font-medium py-2 px-4 rounded-md text-sm">
                                Create Interview
                            </button>
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <OverviewCard title="Total interviews" value={userData.stats.totalInterviews} note={`${userData.stats.percentFromLastWeek} from last week`} />
                        <OverviewCard title="Total time spent" value={userData.stats.totalTimeSpent} note={`${userData.stats.percentFromLastWeek} from last week`} />
                        <OverviewCard title="Completed interviews" value={userData.stats.completedInterviews} note={`${userData.stats.completionRate} of total interviews`} />
                        <OverviewCard title="Available interviews" value={userData.stats.availableInterviews} note="Free credit" />
                    </div>

                </div>



            </div>
        </div>
    )
}

// Reusable card component
const OverviewCard = ({ title, value, note }) => (
    <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-gray-400 text-sm mb-2">{title}</h3>
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-sm text-gray-500 mt-2">{note}</p>
    </div>
);


export default DashboardContent;