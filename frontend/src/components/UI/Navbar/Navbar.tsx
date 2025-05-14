import React, { SyntheticEvent, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RouteData } from "../../../types/common";
// import MyButton from "../button/MyButton";
// import { AuthContext } from "../../../context";

export type BeforeNavigateHandler = (event: SyntheticEvent, path: string) => void;

interface NavbarProps {
    routes: RouteData[];
    listClassName: string;
    itemClassName: string;
    beforeNavigateHandler?: BeforeNavigateHandler;
}

const Navbar: React.FC<NavbarProps> = ({routes, listClassName, itemClassName, beforeNavigateHandler}: NavbarProps) => {
    const navigate = useNavigate();

    const usedOnClick = (event: SyntheticEvent, path: string) => {
        if (beforeNavigateHandler) {
            event.preventDefault();
            beforeNavigateHandler(event, path);
            navigate(path);
        }
    }

    if (beforeNavigateHandler) {
        return (
            <div className={listClassName}>
                {routes.map(route => route.isVisible &&
                    <Link 
                        key={route.path} 
                        className={itemClassName} 
                        to={route.path}
                        onClick={(event) => usedOnClick(event, route.path)}
                        >
                        {route.caption}
                    </Link>
                )}
            </div>
        );
    } else {
        return (
            <div className={listClassName}>
                {routes.map(route => route.isVisible &&
                    <Link 
                        key={route.path} 
                        className={itemClassName} 
                        to={route.path}
                        // onClick={(event) => usedOnClick(event, route.path)}
                        >
                        {route.caption}
                    </Link>
                )}
            </div>
        );        
    }
}

export default Navbar;