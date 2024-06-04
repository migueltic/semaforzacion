import { NavLink } from 'react-router-dom'

export default function SideBar() {
  return (
    <aside className="w-28 h-screen shadow-md bg-gradient-to-b from-green-700 to-indigo-900 py-5 flex flex-col items-center">
      <NavLink to='/'>
        <h2 className="text-3xl text-white  font-bold text-center mb-10 w-[70px] h-[55px] flex justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-300 rounded-full shadow-md">M</h2>
      </NavLink>
      <ul className="w-full h-1/2 flex flex-col items-center justify-around">
        <li className="w-[55px] h-[55px] bg-gradient-to-r from-blue-500 to-indigo-300 rounded-full  shadow-md">
          <NavLink to='/chat-01' className="w-full h-full flex items-center justify-center text-2xl text-white font-bold cursor-pointer ">1</NavLink>
        </li>
        <li className="w-[55px] h-[55px] bg-gradient-to-r from-blue-500 to-indigo-300 rounded-full  shadow-md">
          <NavLink to='/chat-02' className="w-full h-full flex items-center justify-center text-2xl text-white font-bold cursor-pointer">2</NavLink>
        </li>
        <li className="w-[55px] h-[55px] bg-gradient-to-r from-blue-500 to-indigo-300 rounded-full  shadow-md">
          <NavLink to='/chat-03' className="w-full h-full flex items-center justify-center text-2xl text-white font-bold cursor-pointer">3</NavLink>
        </li>
        <li className="w-[55px] h-[55px] bg-gradient-to-r from-blue-600 to-green-300 rounded-full  shadow-md">
          <NavLink to='/chat-04' className="w-full h-full flex items-center justify-center text-2xl text-white font-bold cursor-pointer">4</NavLink>
        </li>
      </ul>
    </aside>
  );
}