import React, { Component } from "react";
import Categories from "./categories";
import Header from "../../components/header/index";
import Footer from "../../components/footer/index";

class Productcategories extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <>
                <div className="container"><Categories Categorie={this.props.computedMatch.params.category_id} pageName={this.props.computedMatch.params.page_slug} /></div>

            </>
        )
    };
}
export default Productcategories;