import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link, NavLink, Redirect } from 'react-router-dom';
import ProductDetails from '../product/index';
import { useHistory } from 'react-router-dom';
import { CategoriesService, ProductService, coustomerProfile } from '../../services/api/api.service';
import CategoryComponent from '../../components/products/categoryComponent';
import ProductComponent from '../../components/products/ProductComponent';
import Loading from '../../components/loading/loader';
import { IMAGE_PATH } from '../../constants/path';
import { connect } from 'react-redux';
import { userLoginModalHide, USER_LOGIN_MODAL_HIDE } from '../../actions/app-action-types';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryData: [],
      ProductData: [],
      loading: false,
      username: null,
      modalStatus: false,
    };
  }
  getCategoriesService = () => {
    this.setState({
      loading: true,
    });
    CategoriesService().then((res) => {
      if (res.data.status == 200) {
        this.setState({
          categoryData: res.data.data,
        });
      }
    });
  };

  getuserdetail = () => {
    coustomerProfile(this.props.getUserId)
      .then((response) => {
        if (response.status == 200) {
          console.log(response);
          return response.data.data;
        }
      })
      .then((response) => {
        setTimeout(() => {
          this.setState({
            ...this.state,
            username: response[0].name,
          });
        }, 2000);
      });
    if (this.state.username) {
      this.setState({
        ...this.state,
        modalStatus: true,
      });
    }
    console.log(this.state.username);
  };

  getProductService = () => {
    ProductService()
      .then((res) => {
        this.setState({
          loading: false,
        });
        if (res.data.status == 200) {
          this.setState({
            ProductData: res.data.data,
          });
        }
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
      });
  };

  hideModal() {}
  componentDidMount() {
    this.getCategoriesService();
    this.getProductService();
    this.getuserdetail();
  }

  render() {
    return (
      <>
        {this.props.modalView && (
          <div class="contents modalPopup">
            <div class="alert alert-success alert-white rounded">
              <button
                type="button"
                class="close"
                data-dismiss="alert"
                aria-hidden="true"
                onClick={() => {
                  this.props.handelModal();
                }}
              >
                ×
              </button>
              <div class="icon">
                <i class="fa fa-check"></i>
              </div>
              <strong>Success!</strong> you have loged in successfully! {this.state.username}
            </div>
          </div>
        )}
        {this.state.loading ? <Loading /> : null}
        <div class="container_fluid banner_section">
          <Carousel>
            <Carousel.Item>
              <img className="d-block w-100" src="public\images/Group 61.png" alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src="public\images/banner.png" alt="Second slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src="public\images/banner2.jpg" alt="Third slide" />
            </Carousel.Item>
          </Carousel>
          <div class="banner_text">
            <NavLink to={'/login'}>
              <button>{this.props.token ? 'sell products ' : 'login or signup'}</button>
            </NavLink>
          </div>
        </div>

        {/* Top slider section */}
        <div class="container_fluid">
          <div class="container">
            <div className="logo_home">
              <img src={IMAGE_PATH + 'lg_logo.jpg'} alt="LG Logo" />
            </div>
            <div class="top_sldr">
              <ul class="align ">
                <CategoryComponent categoryData={this.state.categoryData} />
              </ul>
            </div>
          </div>
        </div>

        {/* Cars section */}

        <div class="container_fluid related_ads">
          <div class="container">
            <ProductComponent ProductData={this.state.ProductData} categoryData={this.state.categoryData} />
          </div>
        </div>

        {/* Sail home banner */}
        {/* <div class="container_fluid banner_section">
                    <div class="banner_section_middle">
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="public\images/Group 60.png"
                                    alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="public\images/Group 60.png"
                                    alt="Second slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="public\images/Group 60.png"
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div> */}
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    handelModal: () => {
      dispatch({ type: USER_LOGIN_MODAL_HIDE });
    },
  };
};

const mapStateToProps = (state) => {
  console.log(state.app.isVisible);
  return {
    token: state.user.token,
    getUserId: state.user.userDetail.userId,
    modalView: state.app.isVisible,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
