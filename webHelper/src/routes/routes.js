import { exact } from 'prop-types';
import React from 'react';
import { components } from 'react-select';
import {
  USER_SUPER_ADMIN,
  USER_SCHOOL_ADMIN,
  USER_PARENT,
  USER_STUDENT,
  USER_TEACHER
} from '../constants';
;

// Common
const NotFound = React.lazy(() => import('../pages/not-found'));
const ForbiddenAccess = React.lazy(() => import('../pages/forbidden-access'));

// User onboarding
const Login = React.lazy(() => import('../pages/user/login'));
const Registration = React.lazy(() => import('../pages/user/user-regestration'))
const ForgotPassword = React.lazy(() => import('../pages/user/forgot-password'));
const ChangePassword = React.lazy(() => import('../pages/user/change-password'));
const MyProfile = React.lazy(() => import('../pages/user/my-profile'));
const EditProfile = React.lazy(() => import('../pages/user/edit-profile'));
const Dashboard = React.lazy(() => import('../pages/dashboard'));

// Home
const Home = React.lazy(() => import('../pages/homepage/index'));
const Product = React.lazy(() => import('../pages/product/index'));
const Details = React.lazy(() => import('../pages/product/details'));
const ProductDetails = React.lazy(() => import('../pages/product/index'));
const ProductCategories = React.lazy(() => import('../pages/ProductCategories/index'));
const Search = React.lazy(() => import('../pages/search/index'));
const PostJobs = React.lazy(() => import('../pages/post/index'))
const UpdateJobs = React.lazy(() => import('../pages/post/update'))
const ViewPost = React.lazy(() => import('../pages/post/viewpost'))
const AboutUs = React.lazy(() => import('../pages/aboutUs/aboutUs'))
const ProductByLoaction = React.lazy(() => import('../pages/product/productByLoaction'))
const Description = React.lazy(() => import('../pages/product/sellerDescription'))
// chat

const Chat = React.lazy(() => import('../pages/chat/index'));


// Other Pages
const otherPages = React.lazy(() => import('../pages/otherPages'));


const configureRoutes = () => {
  const routes = [
    {
      component: Home,
      exact: true,
      path: '/',
      title: 'Login',
      type: 'public',
    },
    {
      component: Login,
      exact: true,
      path: '/login',
      title: 'Login',
      type: 'public',
    },
    {
      component: Registration,
      exact: true,
      path: '/registration',
      title: 'Registration',
      type: 'public',
    },
    {
      component: ForgotPassword,
      exact: true,
      path: '/forgot-password',
      title: 'Forgot Password',
      type: 'public',
    },
    {
      accessible: [],
      component: Dashboard,
      exact: true,
      path: '/dashboard',
      title: 'Dashboard',
      type: 'private',
    },
    {
      accessible: [USER_SUPER_ADMIN, USER_SCHOOL_ADMIN, USER_STUDENT, USER_TEACHER, USER_PARENT],
      component: ChangePassword,
      exact: true,
      path: '/change-password',
      title: 'Change Password',
      type: 'private',
    },
    {
      accessible: [USER_SUPER_ADMIN, USER_SCHOOL_ADMIN, USER_STUDENT, USER_TEACHER, USER_PARENT],
      component: MyProfile,
      exact: true,
      path: '/my-profile',
      title: 'My Profile',
      type: 'private',
    },
    {
      accessible: [USER_SUPER_ADMIN, USER_SCHOOL_ADMIN, USER_STUDENT, USER_TEACHER, USER_PARENT],
      component: EditProfile,
      exact: true,
      path: '/edit-profile',
      title: 'Edit Profile',
      type: 'private',
    },


    {
      component: ProductCategories,
      exact: true,
      path: '/category/:page_slug/:category_id',
      title: 'Product Listing',
      type: 'public',
    },

    {
      component: Search,
      exact: true,
      path: '/search/:keywords',
      title: 'Search Listing',
      type: 'public',
    },
    {
      component: ProductByLoaction,
      exact: true,
      path: '/products/:location',
      title: 'products By location',
      type: 'public',
    },

    {
      component: ProductDetails,
      exact: true,
      path: '/product/:page_slug/:product_id',
      title: 'Details',
      type: 'public',
    },
    {
      component:Description,
      exact: true,
      path: '/product/:product_id',
      title: 'description',
      type: 'public',
    },
    {
      component: PostJobs,
      exact: true,
      path: '/post-jobs',
      title: 'Post Jobs',
      type: 'private',
    },
    {
      component: UpdateJobs,
      exact: true,
      path: '/update-post/:pid',
      title: 'Update Post',
      type: 'private',
    },
    {
      component: AboutUs,
      exact: true,
      path: '/detailPage/:pname/:pid',
      title: 'Information pages',
      type: 'public',
    },
    {
      component: ViewPost,
      exact: true,
      path: '/view-post',
      title: 'View Post',
      type: 'private',
    },

    // {
    //   component: ProductCategories,
    //   exact: true,
    //   path: '/productcategories/:page_slug/:product_id',
    //   title: 'Categories',
    //   type: 'public',
    // },

    // Pages
    {
      component: otherPages,
      exact: true,
      path: '/others',
      title: 'Other',
      type: 'private',
    },
    {
      component: Chat,
      exact: true,
      path: '/chat',
      title: 'Chat',
      type: 'private',
    },


    // General routes
    {
      component: ForbiddenAccess,
      exact: true,
      path: '/forbidden-access',
      title: '403 Forbidden Access',
      type: 'error',
    },
    {
      component: NotFound,
      exact: true,
      path: '*',
      title: '404 Not Found',
      type: 'error',
    },
  ];

  return routes;
};

export default configureRoutes;
