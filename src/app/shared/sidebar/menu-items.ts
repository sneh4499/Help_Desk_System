import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '/starter',
    title: 'Dashboard',
    icon: 'icon-Home',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/tickets/filters/all-tickets',
    title: 'Tickets',
    icon: 'fas fa-ticket-alt',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '',
    title: 'Contacts',
    icon: 'icon-Address-Book',
    class: 'has-arrow',
    extralink: false,
    submenu: [
      {
        path: '/listcontact/list',
        title: 'Contact',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/listcompanies/list',
        title: 'Companies',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      }
    ]
  },
  {
    path: '',
    title: 'Reports',
    icon: 'sl-icon-layers',
    class: 'has-arrow',
    extralink: false,
    submenu: [
      {
        path: '/reports/ticket-volume',
        title: 'Ticket Volume Trend',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/reports/agentperformance',
        title: 'Agent Performance',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/reports/groupperformance',
        title: 'Group Performance',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      }
    ]
  },
  {
    path: '/settings/admin',
    title: 'Settings',
    icon: 'mdi mdi-settings',
    class: '',
    extralink: false,
    submenu: []
  },
  // {
  //   path: '',
  //   title: 'UI',
  //   icon: 'mdi mdi-dots-horizontal',
  //   class: 'nav-small-cap',
  //   extralink: true,
  //   submenu: []
  // },
  // {
  //   path: '',
  //   title: 'UI Elements',
  //   icon: 'icon-Paint-Brush',
  //   class: 'has-arrow',
  //   extralink: false,
  //   submenu: [
  //     {
  //       path: '/component/accordion',
  //       title: 'Accordion',
  //       icon: '',
  //       class: '',
  //       extralink: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/component/alert',
  //       title: 'Alert',
  //       icon: '',
  //       class: '',
  //       extralink: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/component/carousel',
  //       title: 'Carousel',
  //       icon: '',
  //       class: '',
  //       extralink: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/component/dropdown',
  //       title: 'Dropdown',
  //       icon: '',
  //       class: '',
  //       extralink: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/component/modal',
  //       title: 'Modal',
  //       icon: '',
  //       class: '',
  //       extralink: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/component/pagination',
  //       title: 'Pagination',
  //       icon: '',
  //       class: '',
  //       extralink: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/component/poptool',
  //       title: 'Popover & Tooltip',
  //       icon: '',
  //       class: '',
  //       extralink: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/component/progressbar',
  //       title: 'Progressbar',
  //       icon: '',
  //       class: '',
  //       extralink: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/component/rating',
  //       title: 'Ratings',
  //       icon: '',
  //       class: '',
  //       extralink: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/component/tabs',
  //       title: 'Tabs',
  //       icon: '',
  //       class: '',
  //       extralink: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/component/timepicker',
  //       title: 'Timepicker',
  //       icon: '',
  //       class: '',
  //       extralink: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/component/buttons',
  //       title: 'Button',
  //       icon: '',
  //       class: '',
  //       extralink: false,
  //       submenu: []
  //     }
  //   ]
  // },
  // {
  //   path: '',
  //   title: 'Menu Levels',
  //   icon: 'mdi mdi-notification-clear-all',
  //   class: 'has-arrow',
  //   extralink: false,
  //   submenu: [
  //     {
  //       path: '',
  //       title: 'Second Level',
  //       icon: '',
  //       class: '',
  //       extralink: true,
  //       submenu: []
  //     },
  //     {
  //       path: '',
  //       title: 'Second Child',
  //       icon: '',
  //       class: 'has-arrow',
  //       extralink: false,
  //       submenu: [
  //         {
  //           path: '',
  //           title: 'Third 1.1',
  //           icon: '',
  //           class: '',
  //           extralink: false,
  //           submenu: []
  //         },
  //         {
  //           path: '',
  //           title: 'Third 1.2',
  //           icon: '',
  //           class: '',
  //           extralink: false,
  //           submenu: []
  //         }
  //       ]
  //     }
  //   ]
  // }
];
