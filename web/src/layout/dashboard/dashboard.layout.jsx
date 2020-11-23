import React, { Component} from 'react';
import DashboardFooter from './dashboardFooter';
import DashboardHeader from './dashboardHeader';
import DashboardSidebar from './dashboardSidebar';
import { renderRoutes } from "react-router-config";

export class DashboardLayout extends Component {

    render(){
        console.log('Calling Dashboard!!')
        const { route } = this.props;
        
        return (
            <>
                {/* <DashboardHeader/>
                <DashboardSidebar/> */}
                <div className='mainx'>
                    <div>
                        {renderRoutes(route.routes)}
                    </div>
                    {/* <DashboardFooter/> */}
                </div>
        
             </>
        )
    }
}