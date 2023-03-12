import React, { useState, useEffect } from 'react';

const url = 'https://jsonplaceholder.typicode.com/posts';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error('something went wrong while requesting posts');
      })
      .then((posts) => setPosts(posts))
      .catch((error) => setError(error.message));
  }, []);

  if (error) return <h1>{error}</h1>;

  return <div></div>;
}



function Post(props) {
    const { id, title, body } = props.data;
    return (
      <div className="post">
        <small>{id}</small>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    );
  }


  function Pagination({ data, RenderComponent, title, pageLimit, dataLimit }) {
    const [pages] = useState(Math.round(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState(1);
  
    function goToNextPage() {
        setCurrentPage((page) => page + 1);
    }
  
    function goToPreviousPage() {
        setCurrentPage((page) => page + 1);
    }
  
    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
  setCurrentPage(pageNumber);
    }
  
    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
      };

      
      const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
      }
  
      return (
        <div>
          <h1>{title}</h1>
      
          {/* show the posts, 10 posts at a time */}
          <div className="dataContainer">
            {getPaginatedData().map((d, idx) => (
              <RenderComponent key={idx} data={d} />
            ))}
          </div>
      
          {/* show the pagiantion
              it consists of next and previous buttons
              along with page numbers, in our case, 5 page
              numbers at a time
          */}
          <div className="pagination">
            {/* previous button */}
            <button
              onClick={goToPreviousPage}
              className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
            >
              prev
            </button>
      
            {/* show page numbers */}
            {getPaginationGroup().map((item, index) => (
              <button
                key={index}
                onClick={changePage}
                className={`paginationItem ${currentPage === item ? 'active' : null}`}
              >
                <span>{item}</span>
              </button>
            ))}
      
            {/* next button */}
            <button
              onClick={goToNextPage}
              className={`next ${currentPage === pages ? 'disabled' : ''}`}
            >
              next
            </button>
          </div>
        </div>
      );
  }


  export default function App() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");
  
    useEffect(() => {
        useEffect(() => {
            window.scrollTo({ behavior: 'smooth', top: '0px' });
          }, [currentPage])
    }, []);
  
    if (error) return <h1>{error}</h1>;
  
    return (
      <div>
        {posts.length > 0 ? (
          <>
            <Pagination
              data={posts}
              RenderComponent={Post}
              title="Posts"
              pageLimit={5}
              dataLimit={10}
            />
          </>
        ) : (
         <h1>No Posts to display</h1>
        )}
      </div>
    );
  }



  function toDataURL(src, callback, outputFormat) {
    let image = new Image();
    image.crossOrigin = 'Anonymous';
    image.onload = function () {
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      let dataURL;
      canvas.height = this.naturalHeight;
      canvas.width = this.naturalWidth;
      ctx.drawImage(this, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      callback(dataURL);
    };
    image.src = src;
    if (image.complete || image.complete === undefined) {
      image.src = "data:image/gif;base64, R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      image.src = src;
    }
  }
  toDataURL('https://www.gravatar.com/avatar/0c6523b4d3f60hj548962bfrg2350',
    function (dataUrl) {
      console.log('RESULT:', dataUrl)
    }
  )
  1//https://www.w3docs.com/snippets/javascript/how-to-convert-the-image-into-a-base64-string-using-javascript.html

  2//https://github.com/codefreeeze/filters-materialui-react/tree/master/src
  3//const applyFilters = () => {
    let updatedList = dataList;

    // Rating Filter
    if (selectedRating) {
      updatedList = updatedList.filter(
        (item) => parseInt(item.rating) === parseInt(selectedRating)
      );
    }

    // Category Filter
    if (selectedCategory) {
      updatedList = updatedList.filter(
        (item) => item.category === selectedCategory
      );
    }

    // Cuisine Filter
    const cuisinesChecked = cuisines
      .filter((item) => item.checked)
      .map((item) => item.label.toLowerCase());

    if (cuisinesChecked.length) {
      updatedList = updatedList.filter((item) =>
        cuisinesChecked.includes(item.cuisine)
      );
    }

    // Search Filter
    if (searchInput) {
      updatedList = updatedList.filter(
        (item) =>
          item.title.toLowerCase().search(searchInput.toLowerCase().trim()) !==
          -1
      );
    }

    // Price Filter
    const minPrice = selectedPrice[0];
    const maxPrice = selectedPrice[1];

    updatedList = updatedList.filter(
      (item) => item.price >= minPrice && item.price <= maxPrice
    );

    setList(updatedList);

    !updatedList.length ? setResultsFound(false) : setResultsFound(true);
  };
  
  
  
  const path = require("path");
const webpack = require("webpack");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const BrowserifyZlib = require("browserify-zlib");

const { name: NAME, version: VERSION } = require("./package.json");

module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),

  output: {
    publicPath: "",
    chunkFilename: "[id].js",
    filename: `${NAME}-${VERSION}.js`,
    path: path.resolve(__dirname, "./build"),
    filename: "bundle.js",
  },

  resolve: {
    extensions: [".jsx", ".js"],
  },

  devServer: {
    historyApiFallback: true,
    port: 3010,
    hot: true,
  },

  optimization: {
    chunkIds: "total-size",
    concatenateModules: true,
    minimize: true,
    minimizer: [new TerserWebpackPlugin({ test: /\.js(\?.*)?$/i })],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|otf|ttf|woff|woff2|eot)$/i,
        type: "asset/resource",
        use: [
          {
            loader: "url-loader",
            options: {
              outputPath: "images",
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
      favicon: "./public/logo512.png",
    }),

    new MiniCssExtractPlugin({
      filename: `${NAME}-${VERSION}.css`,
      linkType: "text/css",
    }),

    new webpack.ProvidePlugin({
      process: "process/browser",
      zlib: BrowserifyZlib,
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public"),
          to: path.resolve(__dirname, "build"),
          globOptions: {
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
  ],

  target: "web",
};

  
  
