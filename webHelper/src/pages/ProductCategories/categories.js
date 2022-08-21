import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link, NavLink } from "react-router-dom";
import { ProductByCategoryId, ProductService, CategoriesService } from '../../services/api/api.service';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { IMAGE_PATH } from '../../constants/path'
import Loading from '../../components/loading/loader'
import Switch from '@mui/material/Switch';


const Categories = (props) => {
    const [locationFilter, filteredLocation] = useState(true)
    const [datalocationFilter, filteredData] = useState(false)
    const [ProductList, getProductList] = useState([])
    const [loading, isLoading] = useState(false)
    const [finalProductList, getFinalProductList] = useState([])
    const [categories, getCategories] = useState([]);
    const [stateSearch, setStateSearch] = useState([])
    const [nameselected, selectedStateName] = useState()



    useEffect(() => {
        isLoading(true)
        ProductByCategoryId(props.Categorie)
            .then((res) => {
                isLoading(false)
                if (res.data.status == 200) {
                    getProductList(res.data.data)
                    setStateSearch(res.data.data)
                }
            })
            .catch((err) => {
                isLoading(false)
            })
    }, [props.Categorie])



    useEffect(() => {
        CategoriesService()
            .then((response) => {
                if (response.status == 200) {
                    console.log("CategoriesService", response.data.data)
                    getCategories(response.data.data)
                }
            })
    }, [])

    const loactionChecked = () => {
        filteredLocation(!locationFilter)
        filteredData(!datalocationFilter)

        const data = ProductList.filter(e => e.state == localStorage.getItem('state'))
        getFinalProductList(data)
    }
    const updateFeilds = (e) => {
        selectedStateName(e.target.value)
    }


    return (
        <div className='container_fluid related_ads PrOductListIng'>
            <div class="bredcrupms">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li>{props.pageName}</li>
                </ul>
            </div>

            <div className='Categories_menu'>
                <ul>
                    {categories.map((e) => <li className={e.name == props.pageName ? 'selected_categ' : 'cateSelected'}><Link to={`/category/${e.name}/${e.id}`}>{e.name}</Link></li>)}
                </ul>
            </div>

            <div className='filtterSwitch'><Switch onClick={loactionChecked} defaultChecked={false} />
                <div>filter Product For Your Location</div>
            </div>
            <div className="searchiv">
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">State Name</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="statename"
                        label="State Name"
                        name='category_id'
                        fullWidth={false}
                        onChange={(e) => updateFeilds(e)}
                    >
                        {
                            stateSearch.filter((schema, index, self) => index === self.findIndex((obj) => (obj.state === schema.state))).map((e) => {
                                return <MenuItem value={e.state}>{e.state}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
            </div>

            <div className='categoriesHading'><p>{props.pageName}</p></div>
            {loading ? <Loading /> : null}
            {
                locationFilter && <ul className='ads_focus'>
                    <>
                        {ProductList.length == 0 ? <Stack><Alert severity="info">No Result Found</Alert></Stack> : ProductList.filter((e) => nameselected || e.state == null ? e.state == nameselected : e.state).map((e) => {
                            console.log(e)
                            return (
                                <>

                                    <div class="card card_1" id="card1">
                                        <Link to={`/product/${e.categories_name}/${e.id}`} >
                                            <div class="image_productListing">
                                                <img
                                                    src={e.img1 && e.img1 != 'NULL' ? e.img1 : IMAGE_PATH + 'noimage.jpg'}
                                                />
                                            </div>
                                            <h2>$ {e.price}</h2>
                                            <p>{e.title.length > 25 ? e.title.slice(0, 25) + '...' : e.title}</p>
                                            <h4 class="three">{e.state} <span>{e.createdDate}</span></h4>

                                        </Link>
                                    </div>
                                </>
                            )
                            //  }
                        })}
                    </>
                </ul>
            }
            {
                datalocationFilter && <ul className='ads_focus'>
                    <>
                        {finalProductList.length == 0 ? <Stack><Alert severity="info">No Result Found</Alert></Stack> : finalProductList.map((e) => {
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
                </ul>
            }
        </div >
    );
}

export default Categories;