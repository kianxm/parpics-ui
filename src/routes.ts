export const ROUTES = {
  SITE: "/",
  LOGIN: "/login",
  SIGN_UP: "/signup",
  DASHBOARD: {
    DASHBOARD: "/dashboard",
    ANALYTICS: "/dashboard/analytics",
    NOTIFICATIONS: "/dashboard/notifications",
  },
  CLIENTS: {
    CLIENTS: "/dashboard/clients",
    CLIENT: "/dashboard/clients/:clientId",
    CREATE: "/dashboard/clients/new",
  },
  USER_ACCESS: "/access/:username",
  USER_ALBUM: "/user/:username/:link",
  ABOUT: "/about",
  PRICING: "/pricing",
  PROFILE: "/profile",
} as const;

export interface Param {
  [key: string]: string | number;
}

export interface SearchParam {
  [key: string]: unknown;
}

export interface Option {
  params?: Param;
  search?: SearchParam | string;
}

type flatten<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends object ? flatten<T[K]> : T[K];
    }[keyof T]
  : T;

type baseRoutesType = flatten<typeof ROUTES>;

export function generatePath(
  basePath: baseRoutesType,
  option?: Option
): string {
  if (option) {
    let _search = "",
      _basePath = "";
    const { params, search } = option;

    if (params) {
      _basePath = basePath
        .split("/")
        .map((p) => {
          if (p.startsWith(":")) {
            const key = p.substring(1);
            if (key in params) {
              return params[key];
            } else throw new Error(`The key: ${key} is not given`);
          } else return p;
        })
        .join("/");
    } else {
      _basePath = basePath;
    }

    if (search) {
      if (typeof search === "object") {
        const merged = new URLSearchParams();
        Object.entries(search).forEach(([key, value]) => {
          if (value == null || value === "") {
            merged.delete(key);
          } else {
            merged.set(key, String(value));
          }
        });
        _search = merged.toString() ? `?${merged.toString()}` : "";
      }
      if (typeof search === "string") {
        _search = search;
      }
    }

    return _basePath + _search;
  }
  return basePath;
}
