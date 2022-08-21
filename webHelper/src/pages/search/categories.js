import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { ProductService } from '../../services/api/api.service';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { IMAGE_PATH } from '../../constants/path'
import Loading from '../../components/loading/loader'
import Switch from '@mui/material/Switch';
class Categories extends Component {
    constructor(props) {
        super(props)
        this.state = {
            locationFilter: true,
            datalocationFilter: false,
            ProductList: [],
            loading: false,
            finalProductList: [],
            keywords: this.props.keywords || ''
        }
    }

    getProductService = () => {
        this.setState({
            loading: true
        })
        ProductService()
            .then((res) => {
                this.setState({
                    loading: false
                })
                if (res.data.status == 200) {
                    this.setState({
                        ProductList: res.data.data
                    })
                }
            })
            .catch((err) => {
                this.setState({
                    loading: false
                })
            })
    }
    loactionChecked = () => {
        this.setState({
            locationFilter: !this.state.locationFilter,
            datalocationFilter: !this.state.datalocationFilter
        })
        const data = this.state.ProductList.filter(e => e.state == localStorage.getItem('state') && e.title == this.props.keywords)
        this.setState({
            finalProductList: data
        })
    }

    componentDidMount() {
        setTimeout(() => {
            console.log(this.state.finalProductList)
        }, 1000);
        if (this.props.Categorie) {
            this.getProductService()
        }
    }

    render() {
        console.log(this.props)
        return (
            <div className='container_fluid related_ads PrOductListIng'>
                <div class="bredcrupms">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li>{this.props.keywords}</li>
                    </ul>
                </div>
                <div className='filtterSwitch'><Switch onClick={this.loactionChecked} defaultChecked={false} />
                    <div>filter Product For Your Location</div>
                </div>
                <div className='categoriesHading'><p>{this.props.pageName}</p></div>
                {this.state.loading ? <Loading /> : null}
                {this.state.locationFilter && <ul className='ads_focus'>
                    <>
                        {this.state.ProductList.filter((e) => e.title.toLowerCase().search(this.state.keywords) >= 0).length == 0 ? <Stack><Alert severity="info">No Result Found</Alert></Stack> : this.state.ProductList
                            .filter((e) => e.title.toLowerCase().search(this.state.keywords) >= 0)
                            .map((e) => {
                                return (
                                    <>
                                        <div class="card card_1" id="card1">
                                            <Link to={`/product/${e.categories_name}/${e.id}`} >
                                                <div class="image_productListing">
                                                    <img
                                                        src={e.img1 && e.img1 != 'NULL' ? e.img1 : IMAGE_PATH + 'noimage.jpg'}
                                                    />
                                                </div>
                                                <h2>{e.price}</h2>
                                                <p>{e.title.length > 25 ? e.title.slice(0, 25) + '...' : e.title}</p>
                                                <h4 class="three">{e.state} <span>{e.createdDate}</span></h4>

                                            </Link>
                                        </div>
                                    </>
                                )
                                //  }
                            })}
                    </>
                </ul>}
                {this.state.datalocationFilter && <ul className='ads_focus'>
                    <>
                        {this.state.finalProductList.length == 0 ? <Stack><Alert severity="info">No Result Found</Alert></Stack> : this.state.finalProductList.map((e) => {
                            return (
                                <>
                                    <div class="card card_1" id="card1">
                                        <Link to={`/product/${e.categories_name}/${e.id}`} >
                                            <div class="image_productListing">
                                                <img
                                                    src={e.img1 && e.img1 != 'NULL' ? e.img1 : IMAGE_PATH + 'noimage.jpg'}
                                                />
                                            </div>
                                            <h2>{e.price}</h2>
                                            <p>{e.title}</p>
                                            <h4 class="three">{e.state} <span>{e.createdDate}</span></h4>

                                        </Link>
                                    </div>
                                </>
                            )
                            //  }
                        })}
                    </>
                </ul>}
            </div >
        );
    }
}
export default Categories;