import React, { Suspense } from 'react';
import '../index.css';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import CustomerRoot from '../layout/customer/CustomerRoot.jsx';
import CustomerSignup from '../components/forms/signup/CustomerSignup.jsx';
import CustomerLogin from '../components/forms/login/CustomerLogin.jsx';

import Product from '../pages/customer/Product.jsx';
import Products from '../pages/seller/Products/Products.jsx';
import MyStore from '../pages/seller/MyStore.jsx';
import Dashboard from '../pages/seller/Dashboard.jsx';
import AddProducts from '../pages/seller/Products/AddProducts.jsx';
import EditProducts from '../pages/seller/Products/EditProducts.jsx';
import ManageProducts from '../pages/seller/ManageProducts/ManageProducts.jsx';
import Orders from '../pages/seller/Orders/Orders.jsx';
import ManageOrders from '../pages/seller/Orders/ManageOrders.jsx';

import ProductDetails from '../components/ui/product/ProductDetails.jsx';

import SellerRoot from '../layout/seller/SellerRoot.jsx';
import SellerSignup from '../components/forms/signup/SellerSignup.jsx';
import SellerLogin from '../components/forms/login/SellerLogin.jsx';
import SellerDashboardRoot from '../layout/seller/SellerDashboardRoot.jsx';

import PrivateRoute from '../components/authGuard/PrivateRoute.jsx';

import Cart from '../components/ui/product/Cart.jsx';
import Loader from '../components/reuseables/Loader.jsx';
import NotFoundPage from '../pages/seller/PageNotFound/NotFoundPage.jsx';

const Home = React.lazy(() => import('../pages/customer/Home.jsx'));
const ProductPreview = React.lazy(
  () => import('../pages/seller/myStore/ProductPreview.jsx')
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* customer routes */}
      <Route element={<CustomerRoot />} replace>
        <Route path="/login" element={<CustomerLogin />} />
        <Route path="/signup" element={<CustomerSignup />} />
      </Route>

      {/*home*/}
      <Route
        path="/"
        element={
          <Suspense
            fallback={
              <>
                <Loader size={'xs'} type="spin" color={'gray'} />
                Loading...
              </>
            }
          >
            <Home />
          </Suspense>
        }
      />
      <Route
        path="/product"
        element={
          <Suspense
            fallback={
              <>
                <Loader size={'xs'} type="spin" color={'gray'} />
                Loading...
              </>
            }
          >
            <Product />
          </Suspense>
        }
      />
      <Route path="/product/:prod_id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />

      {/*===============================================================*/}
      {/* seller public routes */}
      <Route path="/" element={<SellerRoot />} replace>
        <Route path="seller-login" element={<SellerLogin />} />
        <Route path="seller-register" element={<SellerSignup />} />
      </Route>

      {/* seller private routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <SellerDashboardRoot />
          </PrivateRoute>
        }
        replace
      >
        <Route path="products" element={<Products />} />
        <Route path="products/add-products" element={<AddProducts />} />
        <Route path="manage-products" element={<ManageProducts />} />
        <Route
          path="/manage-products/edit/:prod_id"
          element={<EditProducts />}
        />
        <Route
          path="/store/:prod_id"
          element={
            <Suspense fallback={<Loader size={'md'} type="spin" />}>
              <ProductPreview />
            </Suspense>
          }
        />
        <Route path="orders" element={<Orders />}>
          <Route path="manage-orders" element={<ManageOrders />} />
        </Route>
        <Route path="store" element={<MyStore />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>

      {/*=====================================================================*/}
      {/*Not found route*/}
      <Route path="/*" element={<NotFoundPage />} />
    </>
  )
);

function AppRouters() {
  return <RouterProvider router={router} />;
}

export default AppRouters;
