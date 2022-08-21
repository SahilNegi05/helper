import React, { Component, createContext, useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { ProductServiceById, ProductService, coustomerProfile, ViewChat, Savechat } from '../../services/api/api.service';
import { generatePageSlug } from '../../helper/pageSlug.helper';
import Chat from '../../pages/post/index';
import sellerDescription from './sellerDescription';
import Loading from '../../components/loading/loader';
import { IMAGE_PATH } from '../../constants/path';
import ProductContext from '../../contexter/productcontext';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

// export const ProductId = createContext()
const Product_Main = (props) => {
  const [userName, setUsername] = useState('');
  const [ProductList, setProductService] = useState([]);
  const [product_id, setProduct_id] = useState(props.product_id);
  const [productData, setProductdata] = useState({});
  const [showModal, setShowmodal] = useState(false);
  const [owner_id, setOwner_id] = useState('');
  const [loading, setLoading] = useState(true);

  console.log(props.product_id, 'productId');
  console.log(productData.customer_id, 'customerId');

  useEffect(() => {
    ProductServiceById()
      .then((e) => {
        setLoading(false);
        for (let obj of e.data.data) {
          if (obj.id == props.product_id) {
            setProductdata(obj);
            setOwner_id(obj.customer_id);
          }
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [props.product_id]);

  const getuserName = (uerid) => {
    coustomerProfile(uerid).then((response) => {
      if (response.status == 200) {
        setUsername(response.data.data[0].name);
      }
    });
  };
  getuserName(productData.customer_id);
  useEffect(() => {
    ProductService()
      .then((res) => {
        if (res.data.status == 200) {
          setProductService(res.data.data);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const getSaveChat = (udi, msg, product_id, product_owner_id) => {
    Savechat(udi, msg, product_id, product_owner_id).then((res) => console.log('SaveChat', res));
  };

  const showModalFun = () => {
    if (document.getElementById('blur_effect')) {
      document.getElementById('blur_effect').style.display = 'block';
    }
    setShowmodal(true);
  };

  const closefunc = () => {
    document.getElementById('blur_effect').style.display = 'none';
  };

  const getProviderData = () => {
    return {
      product_id: 1,
    };
  };

  const {
    description,
    img1,
    img2,
    img3,
    img4,
    price,
    city,
    createdDate,
    categories_name,
    title,
    categories_id,
    state,
    subtitle,
  } = productData;

  return (
    <>
      <ProductContext.Provider value={getProviderData}>
        {loading ? <Loading /> : null}
        <div class="container_fluid">
          <div class="container">
            <div class="bredcrupms">
              <ul>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to={`/category/${generatePageSlug(categories_name || '')}/${categories_id}`}>
                    {categories_name}{' '}
                  </NavLink>
                </li>
                <li>
                  <a>{title}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* mid section */}
        <div class="container_fluid banner">
          <div class="container">
            <div class="banner_left">
              <Carousel>
                {img1 ? (
                  <Carousel.Item interval={500}>
                    <img
                      className="d-block w-100"
                      src={img1 && img1 != 'NULL' ? img1 : IMAGE_PATH + 'noimage.jpg'}
                      alt="Second slide"
                    />
                  </Carousel.Item>
                ) : null}
                {img2 !== 'NULL' ? (
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={img2 && img2 != 'NULL' ? img2 : IMAGE_PATH + 'noimage.jpg'}
                      alt="Third slide"
                    />
                  </Carousel.Item>
                ) : null}
                {img3 !== 'NULL' ? (
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={img3 && img3 != 'NULL' ? img3 : IMAGE_PATH + 'noimage.jpg'}
                      alt="Third slide"
                    />
                  </Carousel.Item>
                ) : null}
                {img3 !== 'NULL' ? (
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={img4 && img4 != 'NULL' ? img4 : IMAGE_PATH + 'noimage.jpg'}
                      alt="Third slide"
                    />
                  </Carousel.Item>
                ) : null}
              </Carousel>
            </div>

            <div class="banner_middle">
              <div class="banner_middle_left">
                <div class="Detailsprice">$ {price}</div>
                <div className="detailsTitle"> {title}</div>
                <div class="desciptionp">
                  {' '}
                  <div dangerouslySetInnerHTML={{ __html: description }}></div>
                </div>
                <div className="LocationDetails">
                  <p>{state}</p>
                  <p>{createdDate} Ago</p>
                </div>
              </div>
            </div>
            <div class="banner_right">
              <div class="banner_right_content">
                <h4>Seller description</h4>
              </div>
              <div class="banner_right_content_lower">
                <div className="seller_discription">
                  <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                  <p className="sd_seller_cas">
                    <Link to={`/product/${productData.customer_id}`}>{userName}</Link>
                  </p>
                </div>

                <button
                  onClick={() => {
                    localStorage.setItem('product_id', JSON.stringify(product_id));
                  }}
                >
                  <Link to="/Chat" element={<Chat />}>
                    <i class="fa fa-phone" aria-hidden="true"></i>
                    Chat With Seller
                  </Link>
                </button>
              </div>
            </div>
          </div>
          <div className="seller-description_prodcuct-pg">
            <h4>Description</h4>
            <p>{subtitle ? subtitle : 'No product discription'}</p>
          </div>
        </div>

        {/*  Related Adds */}
        <div class="container_fluid related_ads">
          <div class="container">
            <div class="related_ads_heading">
              <h2>Related Ads</h2>
            </div>
            <ul className="ads_focus">
              <OwlCarousel className="owl-theme" id="AdsFocus" slideBy={2} margin={10} navs>
                {ProductList.map((e, index) => {
                  if (e.categories_id == categories_id) {
                    return (
                      <>
                        <div className="item" id="item">
                          <div class="card card_1 itemCard " id="card1">
                            <Link to={`/product/${e.categories_name}/${e.id}`}>
                              <div class="image_productListing">
                                <img src={e.img1 && e.img1 != 'NULL' ? e.img1 : IMAGE_PATH + 'noimage.jpg'} />
                              </div>
                              <h2>$ {e.price}</h2>
                              <p>{e.title.length > 28 ? e.title.slice(0, 28) + '...' : e.title}</p>
                              <h4 class="three">
                                {e.state} <span>{e.createdDate}</span>
                              </h4>
                            </Link>
                          </div>
                        </div>
                      </>
                    );
                  }
                })}
              </OwlCarousel>
            </ul>
          </div>
        </div>
      </ProductContext.Provider>
    </>
  );
};
export default Product_Main;

// <li className='MX-ycs_cs'>
// <NavLink to={`/product/${e.categories_name}/${e.id}`}>
//     <div class="Cars">

//         <img
//             className="d-block w-100"
//             src={e.img1 && e.img1 != 'NULL' ? e.img1 : IMAGE_PATH + 'noimage.jpg'}
//         />
//     </div>

//     <div class="relatedtext">
//         <p class="one">Rs:{e.price}</p>
//         <p class="product_Title">{e.title}</p>
//         <p class="three">{e.city},{e.state}<span>{e.createdDate}</span></p>
//     </div>
// </NavLink>
// </li>
