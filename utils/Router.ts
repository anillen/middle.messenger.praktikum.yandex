import AuthService from "../services/AuthService/AuthService";
import Route from "./Route";

class Router {
  public routes: Array<Route>;
  public history: History;
  private _currentRoute: any;
  private _rootQuery: string;
  private static __instance: Router;

  constructor(rootQuery: string) {
    this.routes = [];
    this.history = window.history;

    this._currentRoute = null;
    this._rootQuery = rootQuery;

    if (Router.__instance) {
      return Router.__instance;
    }

    Router.__instance = this;
  }

  public use(path: string, block: any, isPrivate: boolean = false) {
    const route = new Route(path, block, {
      rootQuery: this._rootQuery,
      isPrivate: isPrivate,
    });

    this.routes.push(route);
    return this;
  }

  public start() {
    window.onpopstate = ((event: Event) => {
      if (event.currentTarget instanceof Window) {
        this._onRoute(event.currentTarget.location.pathname);
      }
    }).bind(this);

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      this.go("/error/404");
      return;
    }
    if (route.isPrivate && !AuthService.isAuthenticate) {
      this.go("/");
      return;
    }
    if (this._currentRoute) {
      this._currentRoute.leave();
    }
    this._currentRoute = route;
    route.render();
  }

  public go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  public getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname));
  }

  public back() {
    this.history.back();
  }
  public forward() {
    this.history.forward();
  }
}

export default Router;
