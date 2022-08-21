import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link, NavLink } from "react-router-dom";
import { ProductServiceById, ProductService, ViewChat, Savechat } from '../../services/api/api.service';
import { generatePageSlug } from '../../helper/pageSlug.helper';
import Chat from '../../pages/chat/index';
import Loading from '../../components/loading/loader'
import { IMAGE_PATH } from '../../constants/path'


const Product_Main = (props) => {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         ProductList: [],
    //         product_id: this.props.product_id,
    //         productData: {},
    //         showModal: false,
    //         owner_id: ""
    //     }
    // }
    const [data, setData] = useState({

        ProductList: [],
        product_id: props.product_id,
        productData: {},
        showModal: false,
        owner_id: "",
        loading: false

    })
    console.log(props);


    const getProductData = () => {
        setData({
            ...data,
            loading: true
        })
        ProductServiceById(data.product_id)
            .then((e) => {
                setData({
                    ...data,
                    loading: false
                })
                for (let obj of e.data.data) {
                    if (obj.id == data.product_id) {
                        setData({
                            ...data,
                            productData: obj,
                            owner_id: obj.customer_id
                        })
                    }
                }
            })
            .catch((err) => {
                setData({
                    ...data,
                    loading: false
                })
            })
    }
    const getCategories = () => {
        ProductService().then((res) => {
            if (res.data.status == 200) {
                setData({
                    ...data,
                    ProductList: res.data.data
                })
            }
        })
            .catch((err) => {
                setData({
                    ...data,
                    loading: false
                })
            })
    }

    const getSaveChat = (udi, msg, product_id, product_owner_id) => {
        Savechat(udi, msg, product_id, product_owner_id)
            .then(res => console.log("SaveChat", res))
    }

    function showModalFun() {
        if (document.getElementById('blur_effect')) {
            document.getElementById('blur_effect').style.display = "block";
        }
        setData({
            ...data,
            showModal: true
        })
    }


    const closefunc = () => {
        document.getElementById('blur_effect').style.display = "none";
    }


    // componentDidMount() {
    //     this.getCategories()
    //     this.getProductData()
    // }
    useEffect(() => {
        getCategories();
        getProductData();
    }, [])
    // render() {
    //  console.log(this.state)
    const { description, img1, img2, img3, img4, price, city, createdDate, categories_name, title, categories_id } = data.productData
    return (
        <>
            {data.loading ? <Loading /> : null}
            <div class="container_fluid">
                <div class="container">
                    <div class="bredcrupms">
                        <ul>
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to={`/category/${generatePageSlug(categories_name || '')}/${categories_id}`}>{categories_name}  </NavLink></li>
                            <li><a>{title}</a></li>

                        </ul>
                    </div>
                </div>
            </div>

            {/* mid section */}
            <div class="container_fluid banner">
                <div class="container">
                    <div class="banner_left">
                        <Carousel>
                            <Carousel.Item interval={1000}>

                            </Carousel.Item>
                            <Carousel.Item interval={500}>
                                <img
                                    className="d-block w-100"
                                    src={img2 && img2 != 'NULL' ? img2 : IMAGE_PATH + 'noimage.jpg'}
                                    alt="Second slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={img3 && img3 != 'NULL' ? img3 : IMAGE_PATH + 'noimage.jpg'}
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={img4 && img4 != 'NULL' ? img4 : IMAGE_PATH + 'noimage.jpg'}
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </div>

                    <div class="banner_middle">
                        <div class="banner_middle_left">
                            <div class='Detailsprice'>$ {price}</div>
                            <div className="detailsTitle"> {title}</div>
                            <div class="desciptionp"> {description}</div>
                            <div className='LocationDetails'>
                                <p>{city}</p>
                                <p>{createdDate} Ago</p>
                            </div>

                        </div>
                    </div>
                    <div class="banner_right">

                        <div class="banner_right_content">
                            <h4>
                                {price}
                            </h4>
                            <p class='Ex-ydc_as'>
                                {title}
                            </p>
                            <div className='LocationDetails'>
                                <p>{city}</p>
                                <p>{createdDate} Ago</p>
                            </div>
                        </div>
                        <div class="banner_right_content_lower">
                            <p>Seller Description</p>
                            <p>Name of the Seller Contact</p>
                            <button>
                                <Link to="/Chat" element={<Chat />}>
                                    <i class="fa fa-phone" aria-hidden="true"></i>
                                    Contact Seller
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/*  Related Adds */}
            <div class="container_fluid related_ads">
                <div class="container">
                    <div class="related_ads_heading">
                        <h2>Related Ads</h2>
                    </div>
                    <ul>
                        {data.ProductList.map((e, index) => {

                            if (index <= 5) {
                                if (e.categories_id == categories_id) {
                                    return (
                                        <>
                                            <li className='MX-ycs_cs'>
                                                <div class="Cars">

                                                    <img
                                                        className="d-block w-100"
                                                        src={e.img1 && e.img1 != 'NULL' ? e.img1 : IMAGE_PATH + 'noimage.jpg'}
                                                    />
                                                </div>


                                                <div class="relatedtext">
                                                    <p class="one">Rs:{e.price}</p>
                                                    <p class="product_Title">{e.title}</p>
                                                    <p class="three">{e.city},{e.state}<span>{e.createdDate}</span></p>
                                                </div>
                                            </li>
                                        </>
                                    )
                                }
                            }
                        })}

                    </ul>
                </div>
            </div>
        </>
    );
    // }
}
export default Product_Main;