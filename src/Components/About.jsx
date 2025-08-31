const About = () => {
    return (
        <>
            <div
                className="bg-image"
                style={{
                    backgroundImage:
                        "url('https://wallpaperbat.com/img/870492-wallpaper-windows-11-dark-abstract-microsoft-4k-os.jpg')",
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
            <h1 style={{ color: 'white' }}>This is About section.</h1>
        </>
    )
}
export default About;