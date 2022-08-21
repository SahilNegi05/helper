import React, { Component } from 'react';
import { Link } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const CategoryComponent = ({
    categoryData
}) => {
    return (
        <>
            <OwlCarousel className='owl-theme' autoplay loop margin={10} navs>
                {categoryData.map((e, index) => {
                    if (index) {
                        return (
                            <li>
                                <div class='item'>
                                    <Link to={`/category/${e.name}/${e.id}`} >
                                        <div className='category_img'><img src={e.catImgPath} alt={e.name} /></div>
                                        <div className="category_name">
                                            <p>{e.name}</p>
                                        </div>
                                    </Link>
                                </div>
                            </li>
                        )
                    }
                })}
            </OwlCarousel>
        </>
    )
}



export default CategoryComponent;

