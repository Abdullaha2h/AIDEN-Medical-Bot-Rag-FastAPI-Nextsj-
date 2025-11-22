export default function FloatingDoctor() {
  return (
    <div className="group fixed bottom-14 hidden md:block right-6 bg-background/50 backdrop-blur-md shadow-lg p-3 rounded-full border z-40 transition-all duration-500 ease-out hover:scale-125 hover:shadow-2xl  hover:backdrop-blur-lg">
      <img
        src="/medical.png"
        alt="Doctor Avatar"
        className="h-16 object-contain transition-all duration-700 ease-in-out group-hover:rotate-12 group-hover:scale-110"
      />
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-zinc-700 opacity-0 group-hover:opacity-20 blur-md transition-all duration-500 -z-10 dark:bg-zinc-400" />
      
      {/* Tooltip on hover */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2  bg-background/50 backdrop-blur-md dark:text-white text-zinc-800 text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
        Chat for help.
      </div>
    </div>
  );
}