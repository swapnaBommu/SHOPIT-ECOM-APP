import React,{useState  } from 'react'
import { Link } from 'react-router-dom'
const SideMenu = ({menuItems}) => {
    const [activeMenuItem,setActiveMenuItem] = useState(window.location.pathname);
    const handleMenuItemClick = (menuItemUrl) =>{
      setActiveMenuItem(menuItemUrl);
    }
  return (
    <div className="list-group mt-5 pl-4">
        {menuItems.map((menuItem, index) => (
            <Link
            key={index}
            to={menuItem.url}
            className={`fw-bold list-group-item list-group-item-action 
            ${activeMenuItem.includes(menuItem.url)? "active" : ""}`}
            onClick={() => handleMenuItemClick(menuItem.url)}
            area-current={activeMenuItem.includes(menuItem.url) ? "true" : "false"}
          >
            <i className={`${menuItem.icon} fa-fw pe-2`}></i>{menuItem.name}
          </Link>
        ))}
    
    </div>
  )
}

export default SideMenu