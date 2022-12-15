import './Anime.css'


const Anime = (props) => {

    if (props.status === 1)
        return (
            <section id="anime">
                <h2 className='heading'>ANIME</h2>
                <h2>{props.obj.title}</h2>
                <div class="container">
                    <div class="img-container">
                        <img src={props.obj.img} alt="manga-img" />
                    </div>
                    <p>
                        {props.obj.description}
                    </p>
                </div>
                <div class="status-container">
                    <h3>Airing Status: {props.obj.status}</h3>
                    <h3>First Episode: <a href={props.obj.link}>Ep1</a></h3>
                </div>
            </section>
        )
    else if (props.status === 0) {
        return (
            <section id="anime">
                <h2 className='heading'>ANIME</h2>
                <h2>No Item Searched</h2>
            </section>
        )
    }
    else {
        return (
            <section id="anime">
                <h2 className='heading'>ANIME</h2>
                <h2>No Results Found</h2>
            </section>
        )
    }

}
export default Anime