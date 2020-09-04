import { EventEmitter } from "events";

import Dispatcher from "./dispatcher";

import Constants from "./constants";
import Cookies from 'js-cookie';
import getSidebarNavItemsStudent from "../data/sidebar-nav-items-mahasiswa";
import getSidebarNavItemsDosen from "../data/sidebar-nav-items-dosen";
import getSidebarNavItemsAdmin from "../data/sidebar-nav-items-admin";



const userType = Cookies.get('userType');
let navItems;
switch (userType) {
    case 'student':
      navItems = getSidebarNavItemsStudent();
        break;
    case 'lecturer':
      navItems = getSidebarNavItemsDosen();
        break;
    case 'admin':
      navItems = getSidebarNavItemsAdmin();
        break;
    default:
      navItems = <></>
}

let _store = {
  menuVisible: false,
  navItems: navItems
};

class Store extends EventEmitter {
  constructor() {
    super();

    this.registerToActions = this.registerToActions.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);

    Dispatcher.register(this.registerToActions.bind(this));
  }

  registerToActions({ actionType, payload }) {
    switch (actionType) {
      case Constants.TOGGLE_SIDEBAR:
        this.toggleSidebar();
        break;
      default:
    }
  }

  toggleSidebar() {
    _store.menuVisible = !_store.menuVisible;
    this.emit(Constants.CHANGE);
  }

  getMenuState() {
    return _store.menuVisible;
  }

  getSidebarItems() {
    return _store.navItems;
  }

  addChangeListener(callback) {
    this.on(Constants.CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(Constants.CHANGE, callback);
  }
}

export default new Store();
