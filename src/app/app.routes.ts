import { Routes } from '@angular/router';

const appName = 'WebSite Admin'
export const routes: Routes = [
  {
    path:'login',title:`Login - ${appName}`,
    loadComponent: () => import('./components/auth/login.component')
  },
  {
    path:'shop-register',title:`Register - ${appName}`,
    loadComponent: () => import('./components/auth/shop-register.component')
  },
  {
    path:'',title:`Dashboard - ${appName}`,
    loadComponent: () => import('./components/dashboard/dashboard.component'),
    children:[
      {
        path:'ge-stock',title:`Getão de estoque - ${appName}`,
        loadComponent: () => import('./components/dashboard/ge-stock/ge-stock.component'),
        children:[
          {
            path:'sale',title:`Vente - ${appName}`,
            loadComponent: () => import('./components/dashboard/ge-stock/sale/sale.component')
          },
          {
            path:'stock',title:`Stock - ${appName}`,
            loadComponent: () => import('./components/dashboard/ge-stock/stock/stock.component')
          },
          {
            path:'purchase',title:`Approvisionnements - ${appName}`,
            loadComponent: () => import('./components/dashboard/ge-stock/purchase/purchase.component')
          },
          {
            path:'archive',title:`Archive - ${appName}`,
            loadComponent: () => import('./components/dashboard/ge-stock/archive/archive.component')
          },
          {
            path:'',pathMatch:'full',redirectTo:'sale'
          }
        ]
      },
      {
        path:'finance',title:`Financeiro - ${appName}`,
        loadComponent: () => import('./components/dashboard/finance/finance.component')
      },
      {
        path:'setting',title:`Paramentros - ${appName}`,
        loadComponent: () => import('./components/dashboard/setting/setting.component')
      },
      {
        path:'',pathMatch:'full',redirectTo:'ge-stock'
      }
    ]
  },
  {path:'**',redirectTo:''}
];
