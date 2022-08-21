import React, { useEffect, useState } from 'react';
import { ProductServiceByCustomerId } from '../../services/api/api.service';
import { Link, NavLink } from 'react-router-dom';
import { generatePageSlug } from '../../helper/pageSlug.helper';
import { ProductDetails } from '../../pages/product/index';
import { IMAGE_PATH } from '../../constants/path';

const sellerDescription = (props) => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [owner_id, setOwner_id] = useState('');

  console.log(props.computedMatch.params.product_id, 'productId');
  useEffect(() => {
    ProductServiceByCustomerId(props.computedMatch.params.product_id)
      .then((e) => {
        setLoading(true);
        if (e.status == 200) {
          console.log('hello', e.data.data);
          setPost(e.data.data);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);
  return (
    <>
      <div className="mx_20">
        <div className="container">
          <ul className="ads_focus">
            {post.map((e) => {
              return (
                <>
                  <div class="card card_1" id="card1">
                    <Link to={`/product/${generatePageSlug(e.title)}/${e.id}`} element={<ProductDetails />}>
                      <div class="image_productListing">
                        <img src={e.img1 && e.img1 != 'NULL' ? e.img1 : IMAGE_PATH + 'noimage.jpg'} />
                      </div>
                      <h2>$ {e.price}</h2>
                      <p>{e.title.length > 25 ? e.title.slice(0, 25) + '...' : e.title}</p>
                      <h4 class="three">
                        {e.state} <span>{e.createdDate}</span>
                      </h4>
                    </Link>
                  </div>
                </>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default sellerDescription;
