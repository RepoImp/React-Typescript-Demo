import React, { useState, useCallback } from "react";
import SidebarMenu from "./SidebarMenu";
import { NavLink, useLocation } from "react-router-dom";
import '../../styles/sidebar.css';
import BetterLogo from '../../assets/Images/bettertrucklogo.png';
import Bticon from '../../assets/Images/bticon.png'
import { useLogoutMutation } from "../../api/auth";
import { actions } from "../../redux/store/store";

export default function MiniDrawer({ children }: any) {
    const ref = React.useRef<any>(null);
    const [isOpen, setIsOpen] = useState(true);
    const [routeName, setRouteName] = useState('');
    const [logout] = useLogoutMutation();
    let location = useLocation();

    const performLogout = useCallback(
        async (e: any) => {
            e.preventDefault();
            logout(null);
            actions.auth.setCurrentUser(null);
            localStorage.removeItem('token')
        },
        [logout]
    );

    React.useEffect(() => {
        routes.map((route, index) => {
            if (route?.subRoutes) {
                route?.subRoutes.map((subRoute, idx) => {
                    if (location?.pathname === subRoute.path) {
                        setRouteName(subRoute.name)
                    }
                })
            } else {
                if (location?.pathname === route.path) {
                    setRouteName(route.name)
                }
            }
        })
        let sidebar = document.querySelector(".sidebar");
        let closeBtn = document.querySelector("#btn");
        function menuBtnChange() {
            if (sidebar?.classList?.contains("open")) {
                closeBtn?.classList?.replace("bx-menu", "bx-menu-alt-right");
            } else {
                closeBtn?.classList?.replace("bx-menu-alt-right", "bx-menu");
            }
        }
        if (location.pathname !== '/login') {

            const handleClick = (event: any) => {
                sidebar?.classList?.toggle("open");
                menuBtnChange();
            };

            const element = ref?.current;
            element.addEventListener('click', handleClick);
            closeBtn?.addEventListener("click", handleClick);

            return () => {
                element.removeEventListener('click', handleClick);
            };
        }
    }, [location?.pathname]);

    const routes = [
        {
            path: "/dashboard",
            name: "GMT CSV",
            icon: <i className='bx bxs-file-css'></i>,
            temp: "TEMPLATE"
        },
        {
            path: "/customers",
            name: "Customers",
            icon: <i className='bx bx-group'></i>,
        },
        {
            path: "/generateInvoice",
            name: "Generate Invoices",
            icon: <i className='bx bx-chat' ></i>,
        },
        {
            path: "/invoices",
            name: "Invoices",
            icon: <i className='bx bx-pie-chart-alt-2' ></i>,
        },
        {
            path: "/settings",
            name: "Settings",
            icon: <i className='bx bx-cog' ></i>,
            subRoutes: [
                {
                    path: "/settings/users",
                    name: "Users",
                    icon: <i className='bx bx-user' ></i>,
                },
            ]
        },
    ];

    return (
        <>
            {location.pathname !== '/login' ?
                <>
                    <div className="sidebar open">
                        <div className="logo-details">
                            <img src={BetterLogo} alt="logo" />
                            <img className="bticon" src={Bticon} alt="logo" />
                        </div>
                        <ul className="nav-list">
                            {routes.map((route, index) => {
                                if (route.subRoutes) {
                                    return (
                                        <SidebarMenu
                                            setIsOpen={setIsOpen}
                                            route={route}
                                            isOpen={isOpen}
                                            location={location}
                                        />
                                    );
                                }
                                return (
                                    <li>
                                        <NavLink to={route.path} style={({ isActive }: any) => {
                                            return {
                                                color: isActive && '#fff',
                                                background: isActive && '#4195F5',
                                            };
                                        }}>
                                            {route.icon}
                                            <span className="links_name">{route.name}</span>
                                        </NavLink>
                                        <span className="tooltip">{route.name}</span>
                                    </li>
                                );
                            })}
                            <li className="profile" style={{ cursor: 'pointer' }}>
                                <a onClick={performLogout}>
                                    <i className='bx bx-log-out' id="log_out" style={{ paddingRight: '1rem' }}></i>
                                    <span className="links_name" style={{ paddingLeft: '1rem' }}>Logout</span>
                                </a>
                                <span className="tooltip">Logout</span>
                            </li>
                        </ul>

                    </div>
                    <section className="home-section">
                        <div className='mainchil'>
                            <i className='bx bx-menu' id="btn" ref={ref} style={{ color: '#4195F5', cursor: 'pointer', fontSize: '2rem' }} />
                            <div className='welcometxt'>{routeName}</div>
                        </div>
                        {children}
                    </section>
                </>
                :
                <section>
                    {children}
                </section>
            }
        </>
    );
}