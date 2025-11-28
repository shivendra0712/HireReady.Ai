import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";


const Section9 = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userReducer);
  return (
    <div className='w-full flex flex-col justify-between items-center gap-4 py-6 lg:py-16 px-4 md:px-6 lg:px-1 '>
      <h1 className='w-full lg:w-[50%] text-3xl lg:text-4xl font-medium px-4 lg:px-0 text-center'>Ace Your Interviews with HireReady.Ai
        Get Started Today!</h1>
      <h2 className='w-full lg:w-[50%] text-lg/9 text-center px-3 lg:px-0 text-white/80 py-4'>Elevate your interview skills with personalized AI-driven practice. Start preparing for your next big opportunity with tailored questions and real-time feedback.</h2>
      {user ? (<button  onClick={() => navigate('/dashboard')} className="bg-[#BEF264] hover:bg-green-500 text-black font-medium py-2 px-4 rounded-lg text-sm inline-flex items-center transition-all duration-200">
        Create Interview
      </button>) : (
        <button onClick={() => navigate('/login')} className="bg-[#BEF264] hover:bg-green-500 text-black font-medium py-2 px-4 rounded-lg text-sm inline-flex items-center transition-all duration-200">
          Get Started for free
        </button>
      )}
    </div>
  )
}



export default Section9