import React, { useState, useEffect } from 'react';
import { ProductService } from '../../services/api/api.service'
import Loading from '../../components/loading/loader';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Link, NavLink } from 'react-router-dom';
import { IMAGE_PATH } from '../../constants/path'
import { state } from '../../components/state'

const ProductByLoaction = (props) => {

    const [ProductList, getProductList] = useState([])
    const [loading, isLoading] = useState(false)
    const [inputValue, getinputValue] = useState()
    const [locationContainer, locationContainerstate] = useState(false)
    const [stateSearch, setStateSearch] = useState()
    const [Countrystate, getCountrystate] = useState(state)
    useEffect(() => {
        isLoading(true)
        ProductService()
            .then((res) => {
                isLoading(false)
                if (res.data.status == 200) {
                    getProductList(res.data.data)

                }
            })
            .catch((err) => {
                isLoading(false)
            })
    }, [])
    const setStateSecrch = (e) => {
        setStateSearch((e.target.value).toLowerCase())
        if (e.target.value.length !== 0) {
            locationContainerstate(true)
        } else if (e.target.value.length == 0 || null || this.state.stateSearch == null) {
            locationContainerstate(false)
        }
    }
    const hideModal = () => {
        locationContainerstate(false)
        setStateSearch('')
    }
    return (
        <div className='container_fluid related_ads PrOductListIng'>
            <div class="bredcrupms">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li>products</li>
                </ul>
            </div>
            <div className='search_By_location'>
                <input type="search" placeholder="search by location" value={stateSearch} onChange={(e) => setStateSecrch(e)} />

                {locationContainer && <div className="search_suges_locations">{Countrystate
                    .filter((e) => (e.name).toLowerCase().includes(stateSearch))
                    .map((e) => <li onClick={hideModal}><Link to={`/products/${e.name}`}>{e.name}</Link></li>)}</div>}
            </div>

            <div className='categoriesHading'><p>{'Product list'}</p></div>
            {loading ? <Loading /> : null}
            <ul className='ads_focus'>
                <>
                    {ProductList.length == 0 ? <Stack><Alert severity="info">No Result Found</Alert></Stack> : ProductList.filter((e) => e.state == props.computedMatch.params.location).map((e) => {
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
                                        <p>{e.title.length > 28 ? e.title.slice(0, 28) + '...' : e.title}</p>
                                        <h4 class="three">{e.state} <span>{e.createdDate}</span></h4>

                                    </Link>
                                </div>
                            </>
                        )
                        //  }
                    })}
                </>
            </ul>

        </div >
    )

}
export default ProductByLoaction;

