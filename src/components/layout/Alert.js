import React from 'react'

const Alert = ({ alert }) => {
    // requires msg and type attributes in alert structure
    //   type is related to CSS class name for visualization
    //   can be danger, light, primary, dark, white, success, ...
    //   because CSS exists for alert-danger, alert-light ... in App.css
    return (
        alert != null && (
            <div className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle"></i> {alert.msg}
            </div>
        )
    )
};

export default Alert
