import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
    <Route {...rest} component={(props) => (
      isAuthenticated ? (
        <div>
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/login" />
        // <DelayedRedirect to={'/login'} delay={5000} />
        // setTimeout(() => {  <Redirect to="/login" />  }, 2000)
  
        )
    )} />
  );

// const mapStateToProps = (state) => ({
//   isAuthenticated: false
// });

function mapStateToProps(state) {
    return {
           isAuthenticated: state.shipping_platform_user.account.user_info.user_id
    }
  }

export default connect(mapStateToProps)(PrivateRoute);
