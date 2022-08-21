import React from "react"
import { Carousel } from 'react-bootstrap';
import { Link } from "react-router-dom";
import ProductDetails from "../../pages/product/index";
import { generatePageSlug } from '../../helper/pageSlug.helper'
import { IMAGE_PATH } from '../../constants/path'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const ProductComponent = ({ categoryData, ProductData }) => {
    return (
        <>
            {categoryData.map((x, i) => {
                let count = 0;
                if ((ProductData.filter((e) => e.categories_name == x.name).length != 0)) {
                    return (
                        <>
                            <div className="View_AllHeding">
                                <div class="related_ads_heading">
                                    <Link to={`/category/${x.name}/${x.id}`}><h2>{x.name}</h2></Link>
                                </div>
                                <div className="addViesad"><Link to={`/category/${x.name}/${x.id}`}><p>view all</p></Link></div>
                            </div>
                            <ul className='ads_focus' id='sasd_sdss'>
                                <OwlCarousel className='owl-theme' margin={10} navs>

                                    {ProductData.sort((a, b) => (a.createdDate.split(' ')[0] > b.createdDate.split(' ')[0]) ? 1 : -1).map((e) => {
                                        if (e.categories_name == x.name) {
                                            count += 1;
                                            if (count < 10) {
                                                return (
                                                    <>
                                                        <div className='item' id='item'>
                                                            <div class="card card_1 itemCard " id="card1">
                                                                <Link to={`/product/${e.categories_name}/${e.id}`} >
                                                                    <div class="image_productListing">
                                                                        <img
                                                                            src={e.img1 && e.img1 != 'NULL' ? e.img1 : IMAGE_PATH + 'noimage.jpg'}
                                                                        />
                                                                    </div>
                                                                    <h2>$ {e.price}</h2>
                                                                    <p>{e.title.length > 28 ? e.title.slice(0, 28) + '...' : e.title}</p>
                                                                    <h4 class="three">{e.state} <span>{e.createdDate}</span></h4>

                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        }
                                    })}
                                </OwlCarousel >
                            </ul>
                        </>
                    )
                }
            })
            }
        </>
    )
}

export default ProductComponent;