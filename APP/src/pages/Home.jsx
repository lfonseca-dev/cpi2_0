import NavBar from "../components/NavBar";

function Home() {
    return ( 
        <div className="bg-zinc-600 min-w-screen min-h-screen">
            <NavBar />
            <h1 className="text-white">Home Page</h1>
        </div>
     );
}

export default Home;