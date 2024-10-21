import "./css/CarouselHome.css";
import img1 from "../assets/image.png";
import img2 from "../assets/image.png";
import img3 from "../assets/image.png";
import { CatalogoProductos } from "../pages/CatalogoProductos";


export const CarouselHome = () => {
    return (
        <div className="home-carousel">
        <div id="carouselExampleIndicators" className="carousel slide carousel-home">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner carousel-inner_Home">
                <div className="carousel-item active">
                    <img src={img1} alt="Img-Carousel" className="d-block w-100" />
                </div>
                <div className="carousel-item">
                    <img src={img2} alt="Img-Carousel" className="d-block w-100" />
                </div>
                <div className="carousel-item">
                    <img src={img3} alt="Img-Carousel" className="d-block w-100" />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
            </button>
        </div>

        <div className="home-productos">
            <CatalogoProductos />
        </div>
        </div>
    );
};