import './Manga.css'


const Manga = (props) => {
    if (props.status === 1)
        return (
            <section id="manga">
                <h2 className='heading'>MANGA</h2>
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
                    <h3>Publication Status: {props.obj.status}</h3>
                    <h3>Latest Chapter: <a href={props.obj.link}>Ch {props.obj.chap} </a></h3>
                </div>
            </section>

        )
    else if (props.status === 0) {
        return (
            <section id="manga">
                <h2 className='heading'>MANGA</h2>
                <h2>No Item Searched</h2>
            </section>
        )
    }
    else {
        return (
            <section id="manga">
                <h2 className='heading'>MANGA</h2>
                <h2>No Results Found</h2>
            </section>
        )
    }


}
export default Manga