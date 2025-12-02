import { Routes } from '@angular/router';
import { HomePage } from './features/HomePage/home-page/home-page';
import { Login } from './features/inicioSesion/login/login';
import { PokemonDetailPage } from './features/Pokemon/pokemon-detail/pokemon-detail/pokemon-detail';


export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },

  {
    path: "login",
    component: Login
  },

  {
    path: "home",
    component: HomePage
  },

  {
    path: "pokemon/:id",
    component: PokemonDetailPage
  },
  {
    path: "**",
    redirectTo: "login"
  },
];
