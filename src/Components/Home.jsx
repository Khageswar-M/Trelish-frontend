const Home = () => {
    return (
        <>
            <div
                className="bg-image"
                style={{
                    backgroundImage:
                        "url('https://wallpaperbat.com/img/870473-black-abstract-wallpaper-4k-dark-background-abstract.jpg')",
                    height: "100vh",              // full viewport height
                    width: "100%",                // full width
                    backgroundSize: "cover",      // cover the entire area
                    backgroundPosition: "center", // center the image
                    backgroundRepeat: "no-repeat",// prevent tiling
                    position: "fixed",            // stick to screen even if scrolling
                    top: 0,
                    left: 0,
                    zIndex: 1                    // keep it behind other content
                }}
            >
            </div>
            <h1 style={{ color: 'white' }}>This is home section</h1>
        </>
    )
}
export default Home;